// Main Application Controller for MazhaiAlarm
document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    stops: [
      { name: 'Adyar (Sales Start)', lat: 13.0012, lon: 80.2565 },
      { name: 'Pallikaranai (Detour Stop)', lat: 12.9348, lon: 80.2137 },
      { name: 'Kovalam (Detour Stop)', lat: 12.7925, lon: 80.2514 },
      { name: 'Kelambakkam (Final Stop)', lat: 12.7845, lon: 80.2208 }
    ],
    currentRoute: null,
    weatherResults: null,
    alarm: {
      enabled: true,
      time: '07:15',
      voice: true,
      tone: 'chime'
    },
    liveCoords: { lat: 13.0012, lon: 80.2565 }, // Default Adyar
    map: null,
    mapLayers: {
      routeLine: null,
      markers: []
    },
    rainChart: null,
    tutorialStep: 0
  };

  // DOM Elements
  const stopsContainer = document.getElementById('stopsContainer');
  const newStopInput = document.getElementById('newStopInput');
  const btnAddStop = document.getElementById('btnAddStop');
  const searchDropdown = document.getElementById('searchDropdown');
  const presetChips = document.getElementById('presetChips');
  const btnScanRoute = document.getElementById('btnScanRoute');
  const waypointTimeline = document.getElementById('waypointTimeline');
  const routeAlertBanner = document.getElementById('routeAlertBanner');
  const bannerIcon = document.getElementById('bannerIcon');
  const bannerText = document.getElementById('bannerText');
  const routeDistancePill = document.getElementById('routeDistancePill');

  const alarmToggle = document.getElementById('alarmToggle');
  const alarmTimeInput = document.getElementById('alarmTimeInput');
  const voiceToggle = document.getElementById('voiceToggle');
  const alarmToneSelect = document.getElementById('alarmToneSelect');
  const btnTestAlarm = document.getElementById('btnTestAlarm');
  const alarmStatusLog = document.getElementById('alarmStatusLog');

  const btnLiveGps = document.getElementById('btnLiveGps');
  const btnRefreshLive = document.getElementById('btnRefreshLive');
  const liveTemp = document.getElementById('liveTemp');
  const liveCondition = document.getElementById('liveCondition');
  const liveHumidity = document.getElementById('liveHumidity');
  const liveWind = document.getElementById('liveWind');
  const livePrecip = document.getElementById('livePrecip');
  const liveWeatherIcon = document.getElementById('liveWeatherIcon');
  const liveLocationTitle = document.getElementById('liveLocationTitle');

  const btnToggleSim = document.getElementById('btnToggleSim');
  const appContainer = document.getElementById('appContainer');
  const btnHelpTutorial = document.getElementById('btnHelpTutorial');
  const tutorialModal = document.getElementById('tutorialModal');
  const btnNextTut = document.getElementById('btnNextTut');
  const btnSkipTut = document.getElementById('btnSkipTut');

  // Load Saved State
  function loadPersistedState() {
    try {
      const savedStops = localStorage.getItem('mazhai_stops');
      if (savedStops) state.stops = JSON.parse(savedStops);

      const savedAlarm = localStorage.getItem('mazhai_alarm');
      if (savedAlarm) {
        state.alarm = JSON.parse(savedAlarm);
        alarmToggle.checked = state.alarm.enabled;
        alarmTimeInput.value = state.alarm.time;
        voiceToggle.checked = state.alarm.voice;
        alarmToneSelect.value = state.alarm.tone;
      }
    } catch (e) {
      console.warn('Could not load stored state:', e);
    }
  }

  function persistState() {
    try {
      localStorage.setItem('mazhai_stops', JSON.stringify(state.stops));
      localStorage.setItem('mazhai_alarm', JSON.stringify(state.alarm));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  // Initialize Map
  function initMap() {
    if (state.map) return;
    const center = [12.90, 80.22]; // South Chennai / OMR corridor
    state.map = L.map('routeMap', {
      zoomControl: true,
      attributionControl: false
    }).setView(center, 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(state.map);
  }

  // Render Detours / Intermediate Stops
  function renderStopsList() {
    stopsContainer.innerHTML = '';
    
    // We treat index 0 as Start, last as End, middle as detours
    if (state.stops.length <= 2) {
      stopsContainer.innerHTML = `
        <div style="font-size: 0.8rem; color: #64748b; padding: 4px;">
          Direct route selected. Click "Add Stop" below if you are making extra sales visits!
        </div>
      `;
      return;
    }

    // Render middle stops
    for (let i = 1; i < state.stops.length - 1; i++) {
      const stop = state.stops[i];
      const chip = document.createElement('div');
      chip.className = 'stop-chip';
      chip.innerHTML = `
        <div class="stop-info">
          <span style="color: var(--accent-cyan); font-weight: 700;">Stop ${i}:</span>
          <span>${stop.name}</span>
        </div>
        <button class="btn-remove-stop" data-idx="${i}" title="Remove this stop">&times;</button>
      `;
      stopsContainer.appendChild(chip);
    }

    // Attach remove handlers
    stopsContainer.querySelectorAll('.btn-remove-stop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'));
        state.stops.splice(idx, 1);
        persistState();
        renderStopsList();
      });
    });
  }

  // Render Preset Tamil Nadu Chips
  function renderPresetChips() {
    presetChips.innerHTML = '';
    RoutingEngine.TAMIL_NADU_PRESETS.slice(0, 10).forEach(preset => {
      const chip = document.createElement('button');
      chip.className = 'preset-chip';
      chip.textContent = `+ ${preset.name.split('(')[0].trim()}`;
      chip.addEventListener('click', () => {
        addStopToRoute(preset);
      });
      presetChips.appendChild(chip);
    });
  }

  function addStopToRoute(locationObj) {
    // Insert before the final destination
    if (state.stops.length >= 2) {
      state.stops.splice(state.stops.length - 1, 0, locationObj);
    } else {
      state.stops.push(locationObj);
    }
    persistState();
    renderStopsList();
    newStopInput.value = '';
    searchDropdown.style.display = 'none';
  }

  // Autocomplete / Search for Locations
  let searchDebounce = null;
  newStopInput.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    const query = e.target.value;
    if (query.length < 2) {
      searchDropdown.style.display = 'none';
      return;
    }

    searchDebounce = setTimeout(async () => {
      const results = await RoutingEngine.searchLocation(query);
      if (results.length === 0) {
        searchDropdown.style.display = 'none';
        return;
      }

      searchDropdown.innerHTML = '';
      results.forEach(res => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.textContent = res.name;
        item.addEventListener('click', () => {
          addStopToRoute(res);
        });
        searchDropdown.appendChild(item);
      });
      searchDropdown.style.display = 'block';
    }, 350);
  });

  btnAddStop.addEventListener('click', async () => {
    const val = newStopInput.value.trim();
    if (!val) return;
    const results = await RoutingEngine.searchLocation(val);
    if (results.length > 0) {
      addStopToRoute(results[0]);
    } else {
      alert(`Location "${val}" not found. Try one of the preset chips or specify a nearby Tamil Nadu area.`);
    }
  });

  // Calculate Route & Scan Weather
  async function performRouteScan() {
    btnScanRoute.disabled = true;
    btnScanRoute.innerHTML = '<span>⏳</span> Calculating route & scanning Tamil Nadu radar...';

    try {
      // 1. Calculate road routing with OSRM
      const routeData = await RoutingEngine.calculateRoute(state.stops);
      state.currentRoute = routeData;

      // 2. Parse departure time
      const depTimeVal = document.getElementById('departureTime').value || '07:30';
      const [depHours, depMins] = depTimeVal.split(':').map(Number);
      const departureDate = new Date();
      departureDate.setHours(depHours, depMins, 0, 0);

      // 3. Scan weather at each waypoint
      const weatherData = await WeatherEngine.getRouteForecast(routeData.corridorWaypoints, departureDate);
      state.weatherResults = weatherData;

      // 4. Update UI Components
      renderRouteOnMap(routeData, weatherData);
      renderWeatherBanner(weatherData);
      renderTimeline(weatherData);

      routeDistancePill.textContent = `${routeData.distanceKm} km &bull; Est. ${routeData.durationMins} mins travel`;

    } catch (err) {
      console.error('Scan error:', err);
      alert('Could not complete route scan. Check internet connection and try again.');
    } finally {
      btnScanRoute.disabled = false;
      btnScanRoute.innerHTML = '<span>🔍</span> Scan Route for Rain & Calculate';
    }
  }

  // Update Leaflet Map with Route and Markers
  function renderRouteOnMap(routeData, weatherData) {
    initMap();

    // Clear previous
    if (state.mapLayers.routeLine) {
      state.map.removeLayer(state.mapLayers.routeLine);
    }
    state.mapLayers.markers.forEach(m => state.map.removeLayer(m));
    state.mapLayers.markers = [];

    // Max risk along route to color polyline
    const hasHighRisk = weatherData.some(w => w.weather.riskLevel === 'high');
    const hasMedRisk = weatherData.some(w => w.weather.riskLevel === 'medium');
    let routeColor = '#22c55e'; // Green
    if (hasHighRisk) routeColor = '#ef4444'; // Red
    else if (hasMedRisk) routeColor = '#fb923c'; // Orange

    // Draw route GeoJSON
    const lineLayer = L.geoJSON(routeData.geojson, {
      style: {
        color: routeColor,
        weight: 6,
        opacity: 0.85
      }
    }).addTo(state.map);
    state.mapLayers.routeLine = lineLayer;

    // Add markers for waypoints
    weatherData.forEach((wp, index) => {
      const risk = wp.weather.riskLevel;
      const markerColor = risk === 'high' ? '#ef4444' : (risk === 'medium' ? '#fb923c' : '#0284c7');
      
      const iconHtml = `
        <div style="background: ${markerColor}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); font-size: 13px;">
          ${index === 0 ? 'S' : (index === weatherData.length - 1 ? 'E' : index)}
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-div-icon',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const arrivalTimeStr = wp.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const popupHtml = `
        <div style="font-family: sans-serif; color: #1e293b;">
          <strong>${wp.name}</strong><br>
          Arrival: ${arrivalTimeStr}<br>
          Rain: <strong>${wp.weather.rainProb}%</strong> (${wp.weather.rainMm} mm)<br>
          ${wp.weather.icon} ${wp.weather.condition}<br>
          <em style="font-size: 11px;">${wp.weather.advice}</em>
        </div>
      `;

      const marker = L.marker([wp.lat, wp.lon], { icon: customIcon })
        .addTo(state.map)
        .bindPopup(popupHtml);
      state.mapLayers.markers.push(marker);
    });

    state.map.fitBounds(lineLayer.getBounds(), { padding: [30, 30] });
  }

  // Render Alert Banner
  function renderWeatherBanner(weatherData) {
    const highRisks = weatherData.filter(w => w.weather.riskLevel === 'high');
    const medRisks = weatherData.filter(w => w.weather.riskLevel === 'medium');

    routeAlertBanner.style.display = 'flex';
    routeAlertBanner.className = 'alert-banner';

    if (highRisks.length > 0) {
      routeAlertBanner.classList.add('high');
      bannerIcon.textContent = '⛈️';
      const spots = highRisks.map(h => h.name.split('(')[0].trim()).join(', ');
      bannerText.innerHTML = `
        <strong>Monsoon Rain Warning:</strong> Heavy rain (${highRisks[0].weather.rainProb}% prob) detected around <strong>${spots}</strong>. 
        Pack your waterproof sales bag and consider alternative roads to avoid waterlogging!
      `;
    } else if (medRisks.length > 0) {
      routeAlertBanner.classList.add('medium');
      bannerIcon.textContent = '🌧️';
      const spots = medRisks.map(h => h.name.split('(')[0].trim()).join(', ');
      bannerText.innerHTML = `
        <strong>Rain Alert:</strong> Rain showers expected near <strong>${spots}</strong> around your arrival time. Keep rainwear handy.
      `;
    } else {
      routeAlertBanner.classList.add('low');
      bannerIcon.textContent = '☀️';
      bannerText.innerHTML = `
        <strong>Clear Route:</strong> No significant rain forecasted across all sales points. Dry travel conditions!
      `;
    }
  }

  // Render Waypoint Breakdown
  function renderTimeline(weatherData) {
    waypointTimeline.innerHTML = '';
    weatherData.forEach(wp => {
      const risk = wp.weather.riskLevel;
      const arrivalStr = wp.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const item = document.createElement('div');
      item.className = `timeline-item risk-${risk}`;
      item.innerHTML = `
        <div class="timeline-place">
          <div class="place-name">${wp.name}</div>
          <div class="place-meta">
            Est. Arrival: <strong>${arrivalStr}</strong> &bull; Temp: ${wp.weather.temp}°C &bull; ${wp.weather.condition}
          </div>
          <div style="font-size: 0.74rem; color: #94a3b8; margin-top: 3px;">
            ${wp.weather.advice}
          </div>
        </div>
        <div class="timeline-weather">
          <span style="font-size: 1.4rem;">${wp.weather.icon}</span>
          <div class="rain-prob-pill ${risk}">
            ${wp.weather.rainProb}% Rain
          </div>
        </div>
      `;
      waypointTimeline.appendChild(item);
    });
  }

  // Alarm Testing & Audio
  btnTestAlarm.addEventListener('click', async () => {
    AlarmEngine.initAudio();
    await AlarmEngine.requestNotificationPermission();

    // Use current scan if available, or generate a realistic simulation
    const mockScan = state.weatherResults || [
      { name: 'Pallikaranai', weather: { riskLevel: 'high' } },
      { name: 'Kelambakkam', weather: { riskLevel: 'medium' } }
    ];

    const result = AlarmEngine.triggerRainAlarm(state.alarm, mockScan);
    alarmStatusLog.innerHTML = `
      <span style="color: #38bdf8;">🔊 Alarm Tested Successfully!</span><br>
      Tone: <strong>${result.soundType.toUpperCase()}</strong><br>
      ${result.message}
    `;
  });

  // Alarm Ticker (Checks every 30 seconds for scheduled time)
  setInterval(() => {
    if (!state.alarm.enabled) return;
    const now = new Date();
    const currentClock = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    if (currentClock === state.alarm.time && now.getSeconds() < 30) {
      console.log('⏰ Scheduled morning rain alarm triggered at:', currentClock);
      performRouteScan().then(() => {
        if (state.weatherResults) {
          AlarmEngine.triggerRainAlarm(state.alarm, state.weatherResults);
        }
      });
    }
  }, 30000);

  // Save Alarm Changes
  alarmToggle.addEventListener('change', (e) => {
    state.alarm.enabled = e.target.checked;
    persistState();
    updateAlarmStatusText();
  });
  alarmTimeInput.addEventListener('change', (e) => {
    state.alarm.time = e.target.value;
    persistState();
    updateAlarmStatusText();
  });
  voiceToggle.addEventListener('change', (e) => {
    state.alarm.voice = e.target.checked;
    persistState();
  });
  alarmToneSelect.addEventListener('change', (e) => {
    state.alarm.tone = e.target.value;
    persistState();
  });

  function updateAlarmStatusText() {
    if (state.alarm.enabled) {
      alarmStatusLog.innerHTML = `Alarm active for <strong>${state.alarm.time}</strong>. Will trigger route scan and alert.`;
    } else {
      alarmStatusLog.innerHTML = `<span style="color: #ef4444;">Alarm is currently disabled.</span>`;
    }
  }

  // Live GPS Forecast
  async function fetchLiveGpsWeather() {
    liveCondition.textContent = 'Detecting live GPS...';
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          state.liveCoords = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          };
          await updateLiveWeatherUI(state.liveCoords.lat, state.liveCoords.lon);
        },
        async (err) => {
          console.warn('Geolocation denied/unavailable, defaulting to Chennai:', err);
          await updateLiveWeatherUI(13.0012, 80.2565, 'Chennai (Default GPS)');
        }
      );
    } else {
      await updateLiveWeatherUI(13.0012, 80.2565, 'Chennai (Default GPS)');
    }
  }

  async function updateLiveWeatherUI(lat, lon, label = null) {
    try {
      const data = await WeatherEngine.getPointForecast(lat, lon);
      liveTemp.textContent = `${data.current.temp}°C`;
      liveCondition.textContent = data.current.condition;
      liveHumidity.textContent = `${data.current.humidity}%`;
      liveWind.textContent = `${data.current.windSpeed} km/h`;
      livePrecip.textContent = `${data.current.precip} mm`;
      liveWeatherIcon.textContent = data.current.icon;
      liveLocationTitle.textContent = label || `Live Location (${lat.toFixed(3)}, ${lon.toFixed(3)})`;

      renderRainChart(data.hourly);
    } catch (e) {
      console.error('Live weather load error:', e);
      liveCondition.textContent = 'Weather update unavailable';
    }
  }

  function renderRainChart(hourly) {
    const ctx = document.getElementById('rainChart');
    if (!ctx) return;

    if (state.rainChart) {
      state.rainChart.destroy();
    }

    const labels = hourly.time.slice(0, 16).map(t => {
      const d = new Date(t);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    const rainData = hourly.precipitation_probability.slice(0, 16);

    state.rainChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Precipitation Probability (%)',
          data: rainData,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: '#0284c7'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: { color: '#94a3b8' },
            grid: { color: '#334155' }
          },
          x: {
            ticks: { color: '#94a3b8' },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  btnLiveGps.addEventListener('click', () => {
    switchTab('tab-live');
    fetchLiveGpsWeather();
  });
  btnRefreshLive.addEventListener('click', fetchLiveGpsWeather);

  // Tabs Switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));

    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const activeView = document.getElementById(tabId);
    if (activeBtn) activeBtn.classList.add('active');
    if (activeView) activeView.classList.add('active');

    if (tabId === 'tab-route' && state.map) {
      setTimeout(() => state.map.invalidateSize(), 200);
    }
  }

  // Toggle Desktop / Mobile Simulator Mode
  btnToggleSim.addEventListener('click', () => {
    appContainer.classList.toggle('mobile-sim-mode');
    setTimeout(() => {
      if (state.map) state.map.invalidateSize();
    }, 300);
  });

  // Tutorial / Onboarding Walkthrough
  const tutorialSteps = [
    {
      icon: '🌧️',
      title: 'Welcome to MazhaiAlarm',
      desc: 'Created for field sales professionals across Tamil Nadu who travel to 10+ areas daily during the heavy monsoon season.'
    },
    {
      icon: '🛣️',
      title: 'Plan Routes with Custom Detours',
      desc: 'Going from Wimco Nagar or Adyar to Kelambakkam? Add your custom sales stops like Pallikaranai or Kovalam and see the entire route on the map.'
    },
    {
      icon: '📊',
      title: 'Arrival-Time Rain Radar',
      desc: 'MazhaiAlarm calculates the exact estimated time you will arrive at each stop and checks the hourly rain probability for that specific moment!'
    },
    {
      icon: '⏰',
      title: 'Smart Morning Alarms',
      desc: 'Set your wake-up alarm (e.g. 07:15 AM). The app rings and speaks out weather warnings so you know whether to pack rain gear before leaving home!'
    }
  ];

  function showTutorialStep(idx) {
    const step = tutorialSteps[idx];
    document.getElementById('tutIcon').textContent = step.icon;
    document.getElementById('tutTitle').textContent = step.title;
    document.getElementById('tutDesc').textContent = step.desc;

    const dots = document.querySelectorAll('#tutDots .dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });

    if (idx === tutorialSteps.length - 1) {
      btnNextTut.textContent = 'Get Started 🚀';
    } else {
      btnNextTut.textContent = 'Next →';
    }
  }

  btnHelpTutorial.addEventListener('click', () => {
    state.tutorialStep = 0;
    showTutorialStep(0);
    tutorialModal.classList.add('open');
  });

  btnSkipTut.addEventListener('click', () => {
    tutorialModal.classList.remove('open');
    localStorage.setItem('mazhai_tut_done', 'true');
  });

  btnNextTut.addEventListener('click', () => {
    if (state.tutorialStep < tutorialSteps.length - 1) {
      state.tutorialStep++;
      showTutorialStep(state.tutorialStep);
    } else {
      tutorialModal.classList.remove('open');
      localStorage.setItem('mazhai_tut_done', 'true');
      performRouteScan();
    }
  });

  // Check if first time
  if (!localStorage.getItem('mazhai_tut_done')) {
    state.tutorialStep = 0;
    showTutorialStep(0);
    tutorialModal.classList.add('open');
  }

  // Profile Save
  document.getElementById('btnSaveProfile')?.addEventListener('click', () => {
    const name = document.getElementById('profileName').value;
    const home = document.getElementById('profileHome').value;
    alert(`Profile updated for ${name}! Home base saved as: ${home}`);
  });

  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.warn('SW registration failed:', err);
      });
    });
  }

  // Bootstrapping
  loadPersistedState();
  renderStopsList();
  renderPresetChips();
  initMap();
  btnScanRoute.addEventListener('click', performRouteScan);

  // Initial scan on load
  setTimeout(() => {
    performRouteScan();
  }, 500);
});
