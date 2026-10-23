// Open-Meteo Weather API Engine (100% Free, No API key needed)
const WeatherEngine = {
  baseUrl: 'https://api.open-meteo.com/v1/forecast',

  async getPointForecast(lat, lon) {
    try {
      const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m&hourly=precipitation_probability,precipitation,rain,weather_code,temperature_2m&timezone=Asia%2FKolkata&forecast_days=2`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Weather service error: ${res.statusText}`);
      const data = await res.json();
      return this.formatPointData(data);
    } catch (err) {
      console.error('WeatherEngine point error:', err);
      return this.getFallbackWeather(lat, lon);
    }
  },

  async getRouteForecast(waypoints, departureDate = new Date()) {
    const results = [];
    for (let i = 0; i < waypoints.length; i++) {
      const wp = waypoints[i];
      // Estimate arrival time based on index (assuming ~30-45 mins between sales visits)
      const arrival = new Date(departureDate.getTime() + (wp.travelMinutesFromStart || (i * 35)) * 60000);
      try {
        const pointData = await this.getPointForecast(wp.lat, wp.lon);
        const hourlyAtArrival = this.extractForecastForTime(pointData.hourly, arrival);
        results.push({
          ...wp,
          arrivalTime: arrival,
          weather: {
            temp: hourlyAtArrival.temp || pointData.current.temp,
            rainProb: hourlyAtArrival.rainProb,
            rainMm: hourlyAtArrival.rainMm,
            condition: hourlyAtArrival.condition,
            icon: hourlyAtArrival.icon,
            riskLevel: hourlyAtArrival.riskLevel,
            advice: hourlyAtArrival.advice
          }
        });
      } catch (e) {
        console.warn(`Could not get weather for ${wp.name}:`, e);
      }
    }
    return results;
  },

  extractForecastForTime(hourly, targetTime) {
    if (!hourly || !hourly.time || hourly.time.length === 0) {
      return { temp: 29, rainProb: 15, rainMm: 0, condition: 'Clear', icon: '☀️', riskLevel: 'low', advice: 'Clear skies' };
    }
    // Find closest hourly slot
    const targetISO = targetTime.toISOString().slice(0, 13); // YYYY-MM-DDTHH
    let idx = hourly.time.findIndex(t => t.startsWith(targetISO));
    if (idx === -1) idx = 0;

    const prob = hourly.precipitation_probability[idx] ?? 0;
    const rain = hourly.rain[idx] ?? 0;
    const code = hourly.weather_code[idx] ?? 0;
    const temp = Math.round(hourly.temperature_2m[idx] ?? 30);
    const wInfo = this.interpretWmoCode(code, prob, rain);

    let riskLevel = 'low';
    let advice = 'Good conditions for riding / sales visits.';
    if (prob >= 65 || rain >= 3.0 || wInfo.isThunderstorm) {
      riskLevel = 'high';
      advice = '⚠️ High Rain Alert! Carry a full raincoat, waterproof bag for documents, and expect road waterlogging.';
    } else if (prob >= 30 || rain >= 0.8) {
      riskLevel = 'medium';
      advice = '🌧️ Moderate Rain expected. Keep umbrella/raincoat handy and check traction.';
    }

    return {
      temp,
      rainProb: prob,
      rainMm: rain,
      condition: wInfo.text,
      icon: wInfo.icon,
      riskLevel,
      advice
    };
  },

  formatPointData(data) {
    const cur = data.current;
    const wInfo = this.interpretWmoCode(cur.weather_code, cur.precipitation, cur.rain);
    return {
      current: {
        temp: Math.round(cur.temperature_2m),
        feelsLike: Math.round(cur.apparent_temperature),
        humidity: cur.relative_humidity_2m,
        rain: cur.rain,
        precip: cur.precipitation,
        windSpeed: cur.wind_speed_10m,
        cloudCover: cur.cloud_cover,
        condition: wInfo.text,
        icon: wInfo.icon,
        isRain: cur.rain > 0 || cur.precipitation > 0
      },
      hourly: data.hourly
    };
  },

  interpretWmoCode(code, prob = 0, rain = 0) {
    if (code === 0) return { text: 'Clear Sky', icon: '☀️' };
    if (code === 1 || code === 2) return { text: 'Partly Cloudy', icon: '⛅' };
    if (code === 3) return { text: 'Overcast', icon: '☁️' };
    if ([51, 53, 55].includes(code)) return { text: 'Drizzle', icon: '🌦️' };
    if ([61, 63, 65].includes(code)) return { text: 'Rain', icon: '🌧️' };
    if ([80, 81, 82].includes(code)) return { text: 'Rain Showers', icon: '🌧️' };
    if ([95, 96, 99].includes(code)) return { text: 'Thunderstorm', icon: '⛈️', isThunderstorm: true };
    if (rain > 1.5 || prob > 60) return { text: 'Rainy', icon: '🌧️' };
    return { text: 'Fair Weather', icon: '🌤️' };
  },

  getFallbackWeather(lat, lon) {
    return {
      current: {
        temp: 30,
        feelsLike: 33,
        humidity: 78,
        rain: 0.2,
        windSpeed: 14,
        condition: 'Humid & Overcast',
        icon: '⛅',
        isRain: false
      },
      hourly: {
        time: [new Date().toISOString()],
        precipitation_probability: [35],
        rain: [0.4],
        weather_code: [3],
        temperature_2m: [30]
      }
    };
  },

  // Helper method for quick rain & precipitation checks
  async getPrecipitationForPoint(lat, lon) {
    try {
      const data = await this.getPointForecast(lat, lon);
      const cur = data.current || {};
      const hourly = data.hourly || {};
      const prob = (hourly.precipitation_probability && hourly.precipitation_probability.length > 0)
        ? hourly.precipitation_probability[0]
        : (cur.isRain ? 75 : 10);
      const rainSum = (cur.rain !== undefined ? cur.rain : cur.precip) || 0;

      return {
        precipitationProbability: prob,
        precipitationSum: rainSum,
        temp: cur.temp || 30,
        condition: cur.condition || 'Fair',
        icon: cur.icon || '⛅',
        isRain: cur.isRain || rainSum > 0.05 || prob >= 30
      };
    } catch (e) {
      console.warn('getPrecipitationForPoint fallback:', e);
      return {
        precipitationProbability: 15,
        precipitationSum: 0,
        temp: 30,
        condition: 'Clear Sky',
        icon: '☀️',
        isRain: false
      };
    }
  }
};

// Global aliases for maximum interoperability
if (typeof window !== 'undefined') {
  window.WeatherEngine = WeatherEngine;
  window.WeatherService = WeatherEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WeatherEngine;
}
