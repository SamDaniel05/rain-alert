// 5-Minute Daily Sentinel & Audio Alarm Engine (Zero Paid APIs)
const AlarmEngine = {
  audioCtx: null,
  speechSynth: window.speechSynthesis,
  sentinelIntervalId: null,
  wakeLock: null,
  isRinging: false,
  alarmLoopId: null,

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  // Start the background scanner that runs every 5 minutes
  startBackgroundSentinel(getActiveDayRouteCallback, onScanLogCallback) {
    if (this.sentinelIntervalId) clearInterval(this.sentinelIntervalId);

    // Initial check immediately
    this.checkTodayRouteRain(getActiveDayRouteCallback, onScanLogCallback);

    // Run every 5 minutes (300,000 ms)
    this.sentinelIntervalId = setInterval(() => {
      this.checkTodayRouteRain(getActiveDayRouteCallback, onScanLogCallback);
    }, 5 * 60 * 1000);

    this.requestWakeLock();
  },

  stopBackgroundSentinel() {
    if (this.sentinelIntervalId) {
      clearInterval(this.sentinelIntervalId);
      this.sentinelIntervalId = null;
    }
    this.releaseWakeLock();
    this.stopAlarm();
  },

  async checkTodayRouteRain(getActiveDayRouteCallback, onScanLogCallback) {
    try {
      const route = getActiveDayRouteCallback();
      if (!route || !route.enabled) {
        if (onScanLogCallback) onScanLogCallback({ active: false, message: 'No active route scheduled for today.' });
        return;
      }

      // Check time window (e.g., 05:00 to 21:00)
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const [startH, startM] = (route.startTime || '05:00').split(':').map(Number);
      const [endH, endM] = (route.endTime || '21:00').split(':').map(Number);
      const windowStart = startH * 60 + startM;
      const windowEnd = endH * 60 + endM;

      if (currentMinutes < windowStart || currentMinutes > windowEnd) {
        if (onScanLogCallback) onScanLogCallback({ 
          active: false, 
          message: `Outside active monitoring window (${route.startTime} - ${route.endTime}). Next scan at ${route.startTime}.` 
        });
        return;
      }

      // Area rain inspection
      const areas = route.areas || [];
      if (areas.length === 0) return;

      const rainThreats = [];

      // Query weather for each area in today's route
      for (const area of areas) {
        const place = await RoutingEngine.resolvePlace(area);
        if (place) {
          const w = await WeatherEngine.getPointForecast(place.lat, place.lon);
          const currentRain = w.current.rain || w.current.precip;
          const currentProb = w.hourly.precipitation_probability ? w.hourly.precipitation_probability[0] : 0;

          if (currentRain > 0.4 || currentProb >= 35 || w.current.isRain) {
            rainThreats.push({
              name: area,
              rainProb: currentProb,
              rainMm: currentRain,
              condition: w.current.condition,
              icon: w.current.icon
            });
          }
        }
      }

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (rainThreats.length > 0) {
        this.triggerAlarm(route, rainThreats);
        if (onScanLogCallback) {
          onScanLogCallback({
            active: true,
            hasRain: true,
            timestamp,
            rainThreats,
            message: `🚨 Rain detected at: ${rainThreats.map(t => t.name).join(', ')}!`
          });
        }
      } else {
        if (onScanLogCallback) {
          onScanLogCallback({
            active: true,
            hasRain: false,
            timestamp,
            rainThreats: [],
            message: `All ${areas.length} areas on today's route (${route.startLocation} ➔ ${route.endLocation}) are clear.`
          });
        }
      }

    } catch (e) {
      console.warn('Sentinel scan failed:', e);
    }
  },

  triggerAlarm(route, rainThreats) {
    this.isRinging = true;
    this.initAudio();

    // Loop sound every 3.5s until user dismisses
    this.playTone();
    if (this.alarmLoopId) clearInterval(this.alarmLoopId);
    this.alarmLoopId = setInterval(() => {
      if (this.isRinging) {
        this.playTone();
      } else {
        clearInterval(this.alarmLoopId);
      }
    }, 3500);

    // Haptic vibration for mobile phones
    if ('vibrate' in navigator) {
      try { navigator.vibrate([700, 300, 700, 300, 1000]); } catch (e) {}
    }

    const threatNames = rainThreats.map(t => t.name).join(', ');
    const maxProb = Math.max(...rainThreats.map(t => t.rainProb));

    // Voice announcement via Web Speech
    this.speakAlert(
      `Rain Alert! Rain detected in ${threatNames} on your ${route.day} route. Please take shelter or wear your raincoat.`
    );

    // Push notification
    this.sendNotification(
      `🚨 RAIN ALERT: ${threatNames}`,
      `Rain forecasted along your ${route.day} route (${maxProb}% chance). Pull over safely or take rain precautions.`
    );

    // Dispatch UI event for alarm modal popup
    window.dispatchEvent(new CustomEvent('mazhai-alarm-triggered', {
      detail: { route, rainThreats }
    }));
  },

  stopAlarm() {
    this.isRinging = false;
    if (this.alarmLoopId) {
      clearInterval(this.alarmLoopId);
      this.alarmLoopId = null;
    }
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
    window.dispatchEvent(new CustomEvent('mazhai-alarm-dismissed'));
  },

  playTone() {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Siren alarm sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(550, now);
    osc.frequency.linearRampToValueAtTime(980, now + 0.35);
    osc.frequency.linearRampToValueAtTime(550, now + 0.7);
    osc.frequency.linearRampToValueAtTime(980, now + 1.05);
    osc.frequency.linearRampToValueAtTime(550, now + 1.4);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.5);
  },

  speakAlert(text) {
    if (!this.speechSynth) return;
    try {
      this.speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      this.speechSynth.speak(utterance);
    } catch (e) {}
  },

  sendNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'manifest-icon.png',
          tag: 'mazhai-alarm-tag',
          renotify: true
        });
      } catch (e) {}
    }
  },

  async requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
      } catch (e) {}
    }
  },

  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release().catch(() => {});
      this.wakeLock = null;
    }
  }
};
