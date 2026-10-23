// Continuous Route Sentinel & Audio Alarm Engine (Zero external dependencies)
const AlarmEngine = {
  audioCtx: null,
  speechSynth: window.speechSynthesis,
  pollTimer: null,
  countdownTimer: null,
  wakeLock: null,
  isRinging: false,
  alarmIntervalId: null,

  // Alarm Settings
  config: {
    isMonitoring: false,
    intervalMinutes: 5,
    rainThresholdProb: 35, // Trigger alarm if rain probability >= 35%
    rainThresholdMm: 0.5,  // Or precipitation >= 0.5 mm
    voiceEnabled: true,
    tone: 'siren', // 'siren' | 'chime'
    keepScreenAwake: true
  },

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  // Start continuous 5-minute monitoring
  startMonitoring(getRouteCallback, onScanComplete) {
    this.config.isMonitoring = true;
    this.initAudio();
    this.requestWakeLock();
    this.requestNotificationPermission();

    // Run first scan immediately
    this.executeSentinelScan(getRouteCallback, onScanComplete);

    // Setup periodic polling
    const intervalMs = this.config.intervalMinutes * 60 * 1000;
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = setInterval(() => {
      this.executeSentinelScan(getRouteCallback, onScanComplete);
    }, intervalMs);

    return true;
  },

  stopMonitoring() {
    this.config.isMonitoring = false;
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
    this.releaseWakeLock();
    this.stopRinging();
  },

  async executeSentinelScan(getRouteCallback, onScanComplete) {
    if (!this.config.isMonitoring) return;
    try {
      const activeStops = getRouteCallback();
      if (!activeStops || activeStops.length === 0) return;

      // Query weather for all active remaining stops
      const weatherData = await WeatherEngine.getRouteForecast(activeStops, new Date());
      
      // Analyze for rain threat
      const rainThreats = weatherData.filter(wp => 
        wp.weather.rainProb >= this.config.rainThresholdProb || 
        wp.weather.rainMm >= this.config.rainThresholdMm ||
        wp.weather.riskLevel === 'high'
      );

      if (onScanComplete) {
        onScanComplete({
          timestamp: new Date(),
          weatherData,
          rainThreats,
          hasRain: rainThreats.length > 0
        });
      }

      if (rainThreats.length > 0) {
        this.triggerAlarmAlert(rainThreats);
      }
    } catch (err) {
      console.warn('Sentinel scan error:', err);
    }
  },

  triggerAlarmAlert(rainThreats) {
    this.startRinging();

    // Vibrate mobile device (pattern: vibrate 600ms, pause 300ms, repeat)
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([600, 300, 600, 300, 800]);
      } catch (e) {}
    }

    const areaNames = rainThreats.map(t => t.name.split('(')[0].trim()).join(', ');
    const maxProb = Math.max(...rainThreats.map(t => t.weather.rainProb));

    // System push notification
    this.sendPushNotification(
      `🚨 RAIN ALERT: ${areaNames}`,
      `${maxProb}% chance of rain detected ahead on your route! Pull over or wear raincoat.`
    );

    // Voice alert
    if (this.config.voiceEnabled) {
      this.speakAlert(
        `Attention! Rain detected on your route around ${areaNames}. Rain probability is ${maxProb} percent. Please take shelter or put on your rain jacket.`
      );
    }
  },

  startRinging() {
    this.isRinging = true;
    this.initAudio();
    this.playToneOnce(this.config.tone);

    // Repeat tone every 3.5 seconds until dismissed
    if (this.alarmIntervalId) clearInterval(this.alarmIntervalId);
    this.alarmIntervalId = setInterval(() => {
      if (this.isRinging) {
        this.playToneOnce(this.config.tone);
      } else {
        clearInterval(this.alarmIntervalId);
      }
    }, 3500);

    // Dispatch UI event for alarm modal/flashing banner
    window.dispatchEvent(new CustomEvent('mazhai-alarm-triggered', {
      detail: { tone: this.config.tone }
    }));
  },

  stopRinging() {
    this.isRinging = false;
    if (this.alarmIntervalId) {
      clearInterval(this.alarmIntervalId);
      this.alarmIntervalId = null;
    }
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
    window.dispatchEvent(new CustomEvent('mazhai-alarm-dismissed'));
  },

  playToneOnce(tone = 'siren') {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    if (tone === 'siren') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      osc.frequency.setValueAtTime(500, now);
      osc.frequency.linearRampToValueAtTime(1000, now + 0.35);
      osc.frequency.linearRampToValueAtTime(500, now + 0.7);
      osc.frequency.linearRampToValueAtTime(1000, now + 1.05);
      osc.frequency.linearRampToValueAtTime(500, now + 1.4);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.6);
    } else {
      const freqs = [587.33, 739.99, 880.00, 1174.66]; // D maj chord
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = now + (idx * 0.15);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.95);
      });
    }
  },

  speakAlert(text) {
    if (!this.speechSynth) return;
    try {
      this.speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  },

  async requestWakeLock() {
    if ('wakeLock' in navigator && this.config.keepScreenAwake) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
      } catch (err) {
        console.warn('Wake Lock request failed:', err);
      }
    }
  },

  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release().then(() => {
        this.wakeLock = null;
      }).catch(() => {});
    }
  },

  async requestNotificationPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    const res = await Notification.requestPermission();
    return res === 'granted';
  },

  sendPushNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'manifest-icon.png',
          tag: 'rain-alert-poll',
          renotify: true
        });
      } catch (e) {}
    }
  }
};
