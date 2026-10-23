// Audio & Notification Alarm Engine using native Web Audio & Speech APIs (Zero dependencies)
const AlarmEngine = {
  audioCtx: null,
  activeAlarms: [],
  speechSynth: window.speechSynthesis,

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

  playAlarmSound(type = 'chime') {
    this.initAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    if (type === 'siren') {
      // Urgent rain siren (two-tone alert)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      // Modulate frequency
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(950, now + 0.3);
      osc.frequency.linearRampToValueAtTime(600, now + 0.6);
      osc.frequency.linearRampToValueAtTime(950, now + 0.9);
      osc.frequency.linearRampToValueAtTime(600, now + 1.2);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.5);
    } else {
      // Pleasant morning wake-up chime chord (C - E - G - C)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = now + (idx * 0.18);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.85);
      });
    }
  },

  speakAlert(text) {
    if (!this.speechSynth) return;
    try {
      this.speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;
      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
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
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%230284c7"/><text x="50" y="65" font-size="40" text-anchor="middle" fill="white">🌧️</text></svg>'
        });
      } catch (e) {
        console.warn('Notification trigger error:', e);
      }
    }
  },

  triggerRainAlarm(alarmConfig, routeScanResult) {
    const highRiskAreas = routeScanResult.filter(r => r.weather.riskLevel === 'high');
    const moderateRiskAreas = routeScanResult.filter(r => r.weather.riskLevel === 'medium');

    const soundType = highRiskAreas.length > 0 ? 'siren' : 'chime';
    this.playAlarmSound(soundType);

    let message = '';
    let speechText = '';

    if (highRiskAreas.length > 0) {
      const areaNames = highRiskAreas.map(a => a.name).join(', ');
      message = `🚨 Heavy Rain Alert! High risk detected at ${areaNames}. Carry raincoat & plan alternate route.`;
      speechText = `Rain alert for your route today. Heavy rain is expected around ${areaNames}. Please wear your rain jacket and secure your sales bag.`;
    } else if (moderateRiskAreas.length > 0) {
      const areaNames = moderateRiskAreas.map(a => a.name).join(', ');
      message = `🌧️ Rain Alert: Moderate showers expected around ${areaNames}. Keep umbrella or rain gear ready.`;
      speechText = `Weather alert for today. Rain showers are expected along ${areaNames}. Keep your rain gear ready.`;
    } else {
      message = `☀️ Route Clear! Clear weather forecasted along all your sales stops. Have a safe trip!`;
      speechText = `Good morning! Your route is clear of rain today. Safe travels.`;
    }

    this.sendPushNotification('MazhaiAlarm: Route Rain Status', message);
    this.speakAlert(speechText);

    return { soundType, message, highRiskAreas, moderateRiskAreas };
  }
};
