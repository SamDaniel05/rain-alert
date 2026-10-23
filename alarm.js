// 5-Minute Daily Sentinel & Contiguous Stretch Audio Alarm Engine
const AlarmEngine = {
  audioCtx: null,
  speechSynth: typeof window !== 'undefined' ? window.speechSynthesis : null,
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

  // Smart Contiguous Stretch Grouping Algorithm
  // e.g. "from Wimco Nagar till Tollgate, and again from Kasimedu till Royapuram"
  formatContiguousRainStretches(orderedRouteAreas, rainThreats) {
    if (!rainThreats || rainThreats.length === 0) return '';
    const rainyNames = new Set(rainThreats.map(t => t.name.toLowerCase()));

    const stretches = [];
    let currentStretch = [];

    // Traverse the route in chronological travel order
    orderedRouteAreas.forEach(area => {
      const areaName = typeof area === 'string' ? area : (area.name || String(area));
      const isRainy = rainyNames.has(areaName.toLowerCase());
      if (isRainy) {
        currentStretch.push(areaName);
      } else {
        if (currentStretch.length > 0) {
          stretches.push([...currentStretch]);
          currentStretch = [];
        }
      }
    });

    if (currentStretch.length > 0) {
      stretches.push(currentStretch);
    }

    // Convert stretches into natural human phrases
    const stretchPhrases = stretches.map(stretch => {
      if (stretch.length === 1) {
        return `at ${stretch[0]}`;
      } else if (stretch.length === 2) {
        return `from ${stretch[0]} to ${stretch[1]}`;
      } else {
        return `from ${stretch[0]} till ${stretch[stretch.length - 1]}`;
      }
    });

    if (stretchPhrases.length === 1) {
      return `Rain detected ${stretchPhrases[0]}`;
    } else if (stretchPhrases.length === 2) {
      return `Rain detected ${stretchPhrases[0]}, and again ${stretchPhrases[1]}`;
    } else {
      return `Rain detected ${stretchPhrases.slice(0, -1).join(', ')}, and ${stretchPhrases[stretchPhrases.length - 1]}`;
    }
  },

  // Start the background scanner running every 5 minutes
  startBackgroundSentinel(getActiveDayRouteCallback, onScanLogCallback) {
    if (this.sentinelIntervalId) clearInterval(this.sentinelIntervalId);

    // Run first scan immediately
    this.checkTodayRouteRain(getActiveDayRouteCallback, onScanLogCallback);

    // Continuous 5-minute interval
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

      // Check monitoring time window (e.g. 05:00 - 21:00)
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const [startH, startM] = (route.startTime || '05:00').split(':').map(Number);
      const [endH, endM] = (route.endTime || '21:00').split(':').map(Number);
      const windowStart = startH * 60 + startM;
      const windowEnd = endH * 60 + endM;

      if (currentMinutes < windowStart || currentMinutes > windowEnd) {
        if (onScanLogCallback) onScanLogCallback({ 
          active: false, 
          message: `Outside monitoring hours (${route.startTime} - ${route.endTime}). Next 5m scan at ${route.startTime}.` 
        });
        return;
      }

      const areas = route.areas || [];
      if (areas.length === 0) return;

      const rainThreats = [];

      // Query weather for every micro-locality on the route
      for (const area of areas) {
        const areaName = typeof area === 'string' ? area : (area.name || String(area));
        const place = await RoutingEngine.resolvePlace(areaName);
        if (place) {
          const w = await WeatherEngine.getPointForecast(place.lat, place.lon);
          const currentRain = w.current.rain || w.current.precip;
          const currentProb = w.hourly.precipitation_probability ? w.hourly.precipitation_probability[0] : 0;

          // Sensitive threshold for micro-local showers
          if (currentRain > 0.3 || currentProb >= 35 || w.current.isRain) {
            rainThreats.push({
              name: areaName,
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
        const formattedSentence = this.formatContiguousRainStretches(areas, rainThreats);
        this.triggerAlarm(route, rainThreats, formattedSentence);
        if (onScanLogCallback) {
          onScanLogCallback({
            active: true,
            hasRain: true,
            timestamp,
            rainThreats,
            formattedSentence,
            message: `🚨 ${formattedSentence}!`
          });
        }
      } else {
        if (onScanLogCallback) {
          onScanLogCallback({
            active: true,
            hasRain: false,
            timestamp,
            rainThreats: [],
            message: `All ${areas.length} locations on today's route (${route.startLocation} ➔ ${route.endLocation}) are clear.`
          });
        }
      }

    } catch (e) {
      console.warn('Sentinel scan error:', e);
    }
  },

  triggerAlarm(route, rainThreats, customSentence = null) {
    this.isRinging = true;
    this.initAudio();

    // Loop siren audio every 3.5s
    this.playTone();
    if (this.alarmLoopId) clearInterval(this.alarmLoopId);
    this.alarmLoopId = setInterval(() => {
      if (this.isRinging) {
        this.playTone();
      } else {
        clearInterval(this.alarmLoopId);
      }
    }, 3500);

    // Phone vibration
    if ('vibrate' in navigator) {
      try { navigator.vibrate([700, 300, 700, 300, 1000]); } catch (e) {}
    }

    const sentence = customSentence || this.formatContiguousRainStretches(route.areas || [], rainThreats);

    // Natural Voice speech announcement
    this.speakAlert(
      `${sentence} on your ${route.day} route. Please take shelter or wear your raincoat.`
    );

    // Push notification
    this.sendNotification(
      `🚨 RAIN ALERT: ${route.day} Route`,
      `${sentence}. Protect your sales materials and ride carefully.`
    );

    // Dispatch UI event for alarm modal
    window.dispatchEvent(new CustomEvent('mazhai-alarm-triggered', {
      detail: { route, rainThreats, sentence }
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
          tag: 'mazhai-stretch-alert',
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

// Global exports
if (typeof window !== 'undefined') {
  window.AlarmEngine = AlarmEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AlarmEngine;
}
