// Main Application Controller for MazhaiAlarm
document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    origin: { name: 'Wimco Nagar (Home Base)', lat: 13.1706, lon: 80.3021 },
    destination: { name: 'Kelambakkam (Final Stop)', lat: 12.7845, lon: 80.2208 },
    stops: [
      { id: 'stop-1', name: 'Adyar', lat: 13.0012, lon: 80.2565, visited: false },
      { id: 'stop-2', name: 'Pallikaranai (Marshland Corridor)', lat: 12.9348, lon: 80.2137, visited: false },
      { id: 'stop-3', name: 'Sholinganallur (OMR Junction)', lat: 12.9010, lon: 80.2279, visited: false },
      { id: 'stop-4', name: 'Kovalam (ECR Coast)', lat: 12.7925, lon: 80.2514, visited: false }
    ],
    isMonitoring: false,
    nextCheckSeconds: 300, // 5 mins in seconds
    countdownInterval: null,
    currentRoute: null,
    weatherResults: null,
    liveCoords: { lat: 13.0012, lon: 80.2565 },
    map: null,
    mapLayers: {
      routeLine: null,
      markers: [],
      radarCircles: []
    },
    rainChart: null,
    tutorialStep: 0
  };

  // DOM Elements
  const sentinelBar = document.getElementById('sentinelBar');
  const statusPulse = document.getElementById('statusPulse');
  const sentinelStatusTitle = document.getElementById('sentinelStatusTitle');
  const sentinelCountdown = document.getElementById('sentinelCountdown');
  const btnToggleMonitoring = document.getElementById('btnToggleMonitoring');
  const sentinelBtnIcon = document.getElementById('sentinelBtnIcon');
  const sentinelBtnText = document.getElementById('sentinelBtnText');
  const btnShiftAction = document.getElementById('btnShiftAction');

  const stopsContainer = document.getElementById('stopsContainer');
  const stopCount = document.getElementById('stopCount');
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

  const pollIntervalSelect = document.getElementById('pollIntervalSelect');
  const rainSensitivitySelect = document.getElementById('rainSensitivitySelect');
  const alarmToneSelect = document.getElementById('alarmToneSelect');
  const voiceToggle = document.getElementById('voiceToggle');
  const wakeLockToggle = document.getElementById('wakeLockToggle');
  const btnTestAlarm = document.getElementById('btnTestAlarm');
  const sentinelLogBox = document.getElementById('sentinelLogBox');

  const alarmOverlay = document.getElementById('alarmOverlay');
  const alarmModalDesc = document.getElementById('alarmModalDesc');
  const btnDismissAlarm = document.getElementById('btnDismissAlarm');

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
  const appLayout = document.getElementById('appLayout');
  const btnHelpTutorial = document.getElementById('btnHelpTutorial');
  const tutorialModal = document.getElementById('tutorialModal');
  const btnNextTut = document.getElementById('btnNextTut');
  const btnSkipTut = document.getElementById('btnSkipTut');

  // Load Saved Configuration
  function loadPersistedState() {
    try {
      const savedStops = localStorage.getItem('mazhai_stops_v2');
      if (savedStops) state.stops = JSON.parse(savedStops);

      const savedSettings = localStorage.getItem('mazhai_sentinel_settings');
      if (savedSettings) {
        const s = JSON.parse(savedSettings);
        AlarmEngine.config.intervalMinutes = s.intervalMinutes || 5;
        AlarmEngine.config.rainThresholdProb = s.rainThresholdProb || 35;
        AlarmEngine.config.tone = s.tone || 'siren';
        AlarmEngine.config.voiceEnabled = s.voiceEnabled !== false;
        AlarmEngine.config.keepScreenAwake = s.keepScreenAwake !== false;

        pollIntervalSelect.value = String(AlarmEngine.config.intervalMinutes);
        rainSensitivitySelect.value = String(AlarmEngine.config.rainThresholdProb);
        alarmToneSelect.value = AlarmEngine.config.tone;
        voiceToggle.checked = AlarmEngine.config.voiceEnabled;
        wakeLockToggle.checked = AlarmEngine.config.keepScreenAwake;
      }
    } catch (e) {
      console.warn('Storage read failed:', e);
    }
  }

  function persistSettings() {
    try {
      localStorage.setItem('mazhai_stops_v2', JSON.stringify(state.stops));
      const s = {
        intervalMinutes: AlarmEngine.config.intervalMinutes,
        rainThresholdProb: AlarmEngine.config.rainThresholdProb,
        tone: AlarmEngine.config.tone,
        voiceEnabled: AlarmEngine.config.voiceEnabled,
        keepScreenAwake: AlarmEngine.config.keepScreenAwake
      };
      localStorage.setItem('mazhai_sentinel_settings', JSON.stringify(s));
    } catch (e) {}
  }

  // Leaflet Map Initialization
  function initMap() {
    if (state.map) return;
    const center = [12.92, 80.22]; // Chennai South / OMR Corridor
    state.map = L.map('routeMap', {
      zoomControl: true,
      attributionControl: false
    }).setView(center, 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(state.map);
  }

  // Get ordered active stops for route calculation
  function getFullRouteStops() {
    const list = [state.origin];
    state.stops.forEach(s => list.push(s));
    list.push(state.destination);
    return list;
  }

  // Get only remaining unvisited stops for the 5-min rain monitor
  function getRemainingUnvisitedStops() {
    const remaining = [];
    state.stops.forEach(s => {
      if (!s.visited) remaining.push(s);
    });
    // Always keep destination on watch if not all stops are done
    remaining.push(state.destination);
    return remaining;
  }

  // Render Intermediate Stops with "Visited" Checkboxes
  function renderStopsList() {
    stopsContainer.innerHTML = '';
    const unvisitedCount = state.stops.filter(s => !s.visited).length;
    stopCount.textContent = unvisitedCount;

    if (state.stops.length === 0) {
      stopsContainer.innerHTML = `
        <div style="font-size: 0.8rem; color: #64748b; padding: 4px;">
          Direct route. Add your sales stops or detours below!
        </div>
      `;
      return;
    }

    state.stops.forEach((stop, index) => {
      const item = document.createElement('div');
      item.className = `stop-item ${stop.visited ? 'visited' : ''}`;
      item.innerHTML = `
        <div class="stop-left">
          <input type="checkbox" class="check-visited" data-id="${stop.id}" ${stop.visited ? 'checked' : ''} title="Mark as visited">
          <span><strong>Stop ${index + 1}:</strong> ${stop.name}</span>
        </div>
        <button class="btn-remove-stop" data-id="${stop.id}" title="Remove stop">&times;</button>
      `;
      stopsContainer.appendChild(item);
    });

    // Handle check visited
    stopsContainer.querySelectorAll('.check-visited').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const st = state.stops.find(s => s.id === id);
        if (st) {
          st.visited = e.target.checked;
          persistSettings();
          renderStopsList();
          // Update map and recalculate remaining
          performRouteScan(false);
        }
      });
    });

    // Handle delete stop
    stopsContainer.querySelectorAll('.btn-remove-stop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        state.stops = state.stops.filter(s => s.id !== id);
        persistSettings();
        renderStopsList();
        performRouteScan(false);
      });
    });
  }

  // Render Quick Presets
  function renderPresetChips() {
    presetChips.innerHTML = '';
    RoutingEngine.TAMIL_NADU_PRESETS.slice(0, 10).forEach(preset => {
      const chip = document.createElement('button');
      chip.className = 'preset-chip';
      chip.textContent = `+ ${preset.name.split('(')[0].trim()}`;
      chip.addEventListener('click', () => {
        addNewStop(preset);
      });
      presetChips.appendChild(chip);
    });
  }

  function addNewStop(locationObj) {
    const newStop = {
      id: 'stop-' + Date.now(),
      name: locationObj.name,
      lat: locationObj.lat,
      lon: locationObj.lon,
      visited: false
    };
    state.stops.push(newStop);
    persistSettings();
    renderStopsList();
    newStopInput.value = '';
    searchDropdown.style.display = 'none';
    performRouteScan(false);
  }

  // Autocomplete search
  let searchDebounce = null;
  newStopInput.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    const query = e.target.value.trim();
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
          addNewStop(res);
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
      addNewStop(results[0]);
    } else {
      alert(`Location "${val}" not found. Try one of the quick chips or another Tamil Nadu area.`);
    }
  });

  // Calculate Route & Scan Weather
  async function performRouteScan(interactive = true) {
    if (interactive) {
      btnScanRoute.disabled = true;
      btnScanRoute.innerHTML = '<span>⏳</span> Calculating route & scanning radar...';
    }

    try {
      const allStops = getFullRouteStops();
      const routeData = await RoutingEngine.calculateRoute(allStops);
      state.currentRoute = routeData;

      const departureDate = new Date();
      const weatherData = await WeatherEngine.getRouteForecast(routeData.corridorWaypoints, departureDate);
      state.weatherResults = weatherData;

      renderRouteOnMap(routeData, weatherData);
      renderWeatherBanner(weatherData);
      renderTimeline(weatherData);

      routeDistancePill.textContent = `${routeData.distanceKm} km • Est. ${routeData.durationMins} mins travel`;

    } catch (err) {
      console.warn('Scan error:', err);
    } finally {
      if (interactive) {
        btnScanRoute.disabled = false;
        btnScanRoute.innerHTML = '<span>🔍</span> Scan Full Route Weather';
      }
    }
  }

  // Render Map with Route & Radar Circles
  function renderRouteOnMap(routeData, weatherData) {
    initMap();

    if (state.mapLayers.routeLine) state.map.removeLayer(state.mapLayers.routeLine);
    state.mapLayers.markers.forEach(m => state.map.removeLayer(m));
    state.mapLayers.markers = [];
    state.mapLayers.radarCircles.forEach(c => state.map.removeLayer(c));
    state.mapLayers.radarCircles = [];

    const hasHighRisk = weatherData.some(w => w.weather.riskLevel === 'high');
    const hasMedRisk = weatherData.some(w => w.weather.riskLevel === 'medium');
    let routeColor = '#22c55e';
    if (hasHighRisk) routeColor = '#ef4444';
    else if (hasMedRisk) routeColor = '#fb923c';

    // Route GeoJSON line
    const lineLayer = L.geoJSON(routeData.geojson, {
      style: { color: routeColor, weight: 6, opacity: 0.85 }
    }).addTo(state.map);
    state.mapLayers.routeLine = lineLayer;

    // Markers & simulated rain clouds
    weatherData.forEach((wp, index) => {
      const risk = wp.weather.riskLevel;
      const markerColor = risk === 'high' ? '#ef4444' : (risk === 'medium' ? '#fb923c' : '#0284c7');

      // Rain radar circle overlay if rain probability > 30%
      if (wp.weather.rainProb >= 30) {
        const circle = L.circle([wp.lat, wp.lon], {
          color: risk === 'high' ? '#ef4444' : '#fb923c',
          fillColor: risk === 'high' ? '#ef4444' : '#fb923c',
          fillOpacity: 0.25,
          radius: 2000 // 2km radar radius
        }).addTo(state.map);
        state.mapLayers.radarCircles.push(circle);
      }

      const iconHtml = `
        <div style="background: ${markerColor}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.5); font-size: 13px;">
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
        <div style="color: #1e293b; font-family: sans-serif;">
          <strong>${wp.name}</strong><br>
          Arrival Time: ${arrivalTimeStr}<br>
          Rain Chance: <strong>${wp.weather.rainProb}%</strong> (${wp.weather.rainMm} mm)<br>
          ${wp.weather.icon} ${wp.weather.condition}<br>
          <em style="font-size: 11px;">${wp.weather.advice}</em>
        </div>
      `;

      const marker = L.marker([wp.lat, wp.lon], { icon: customIcon })
        .addTo(state.map)
        .bindPopup(popupHtml);
      state.mapLayers.markers.push(marker);
    });

    state.map.fitBounds(lineLayer.getBounds(), { padding: [25, 25] });
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
        <strong>Heavy Rain Ahead!</strong> High rain probability detected around <strong>${spots}</strong>. Pack your sales bag in waterproof sleeves!
      `;
    } else if (medRisks.length > 0) {
      routeAlertBanner.classList.add('medium');
      bannerIcon.textContent = '🌧️';
      const spots = medRisks.map(h => h.name.split('(')[0].trim()).join(', ');
      bannerText.innerHTML = `
        <strong>Showers Expected:</strong> Moderate rain forecasted around <strong>${spots}</strong>. Keep raincoat ready.
      `;
    } else {
      routeAlertBanner.classList.add('low');
      bannerIcon.textContent = '☀️';
      bannerText.innerHTML = `
        <strong>Route Clear:</strong> Dry skies forecasted across all sales stops. Safe riding!
      `;
    }
  }

  // Render Timeline
  function renderTimeline(weatherData) {
    waypointTimeline.innerHTML = '';
    weatherData.forEach(wp => {
      const risk = wp.weather.riskLevel;
      const arrivalStr = wp.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const row = document.createElement('div');
      row.className = `timeline-row risk-${risk}`;
      row.innerHTML = `
        <div>
          <div class="timeline-place-name">${wp.name}</div>
          <div class="timeline-place-meta">
            Arrival ~${arrivalStr} &bull; ${wp.weather.temp}°C &bull; ${wp.weather.condition}
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.25rem;">${wp.weather.icon}</span>
          <span class="rain-badge ${risk}">
            ${wp.weather.rainProb}% Rain
          </span>
        </div>
      `;
      waypointTimeline.appendChild(row);
    });
  }

  // ================= 5-MINUTE CONTINUOUS SENTINEL & ALARM =================

  function toggleShiftMonitoring() {
    if (state.isMonitoring) {
      stopShiftMonitoring();
    } else {
      startShiftMonitoring();
    }
  }

  function startShiftMonitoring() {
    state.isMonitoring = true;
    state.nextCheckSeconds = AlarmEngine.config.intervalMinutes * 60;

    // UI Updates
    statusPulse.className = 'status-pulse active';
    sentinelStatusTitle.textContent = `Shift Active (Every ${AlarmEngine.config.intervalMinutes}m)`;
    btnToggleMonitoring.className = 'btn-sentinel-toggle monitoring';
    sentinelBtnIcon.textContent = '⏹️';
    sentinelBtnText.textContent = 'Stop Shift';
    btnShiftAction.innerHTML = '<span>⏹️</span> Stop 5-Min Route Sentinel';
    btnShiftAction.style.background = '#ef4444';

    // Start AlarmEngine sentinel
    AlarmEngine.startMonitoring(
      () => getRemainingUnvisitedStops(),
      (scanResult) => {
        onSentinelScanResult(scanResult);
      }
    );

    // Start countdown timer
    startCountdown();

    sentinelLogBox.innerHTML = `
      <span style="color: #22c55e;">🟢 Sentinel Activated:</span> Scanning unvisited stops every ${AlarmEngine.config.intervalMinutes} minutes.<br>
      Last check: <strong>${new Date().toLocaleTimeString()}</strong>
    `;
  }

  function stopShiftMonitoring() {
    state.isMonitoring = false;
    clearInterval(state.countdownInterval);

    statusPulse.className = 'status-pulse';
    sentinelStatusTitle.textContent = 'Shift Monitor: Ready';
    sentinelCountdown.textContent = 'Tap "Start Shift" to auto-check rain every 5m';
    btnToggleMonitoring.className = 'btn-sentinel-toggle';
    sentinelBtnIcon.textContent = '▶️';
    sentinelBtnText.textContent = 'Start Shift';
    btnShiftAction.innerHTML = '<span>🛡️</span> Start 5-Min Route Sentinel';
    btnShiftAction.style.background = 'linear-gradient(135deg, #0284c7, #0369a1)';

    AlarmEngine.stopMonitoring();
    sentinelLogBox.innerHTML += `<br><span style="color: #94a3b8;">⚪ Shift stopped at ${new Date().toLocaleTimeString()}.</span>`;
  }

  function startCountdown() {
    if (state.countdownInterval) clearInterval(state.countdownInterval);
    state.countdownInterval = setInterval(() => {
      if (!state.isMonitoring) return;
      state.nextCheckSeconds--;

      if (state.nextCheckSeconds <= 0) {
        state.nextCheckSeconds = AlarmEngine.config.intervalMinutes * 60;
      }

      const mins = Math.floor(state.nextCheckSeconds / 60);
      const secs = state.nextCheckSeconds % 60;
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      sentinelCountdown.textContent = `Next route radar scan in: ${formatted}`;
    }, 1000);
  }

  function onSentinelScanResult(scanResult) {
    const timeStr = scanResult.timestamp.toLocaleTimeString();
    if (scanResult.hasRain) {
      statusPulse.className = 'status-pulse alert';
      const areas = scanResult.rainThreats.map(t => t.name.split('(')[0].trim()).join(', ');
      sentinelLogBox.innerHTML = `
        <span style="color: #ef4444; font-weight: bold;">🚨 [${timeStr}] RAIN ALARM TRIGGERED:</span><br>
        Rain forecasted at: <strong>${areas}</strong>!
      `;
    } else {
      statusPulse.className = 'status-pulse active';
      sentinelLogBox.innerHTML = `
        <span style="color: #22c55e;">[${timeStr}] Scan complete:</span> All remaining stops are currently clear.
      `;
    }
  }

  // Active Alarm Modal Listener
  window.addEventListener('mazhai-alarm-triggered', (e) => {
    alarmOverlay.classList.add('active');
    const threats = (state.weatherResults || []).filter(w => w.weather.riskLevel === 'high' || w.weather.rainProb >= AlarmEngine.config.rainThresholdProb);
    if (threats.length > 0) {
      const names = threats.map(t => t.name.split('(')[0].trim()).join(', ');
      alarmModalDesc.textContent = `Immediate rain threat detected at: ${names} (${threats[0].weather.rainProb}% probability). Take precautions!`;
    }
  });

  window.addEventListener('mazhai-alarm-dismissed', () => {
    alarmOverlay.classList.remove('active');
    if (state.isMonitoring) {
      statusPulse.className = 'status-pulse active';
    }
  });

  btnDismissAlarm.addEventListener('click', () => {
    AlarmEngine.stopRinging();
  });

  // Connect Sentinel Buttons
  btnToggleMonitoring.addEventListener('click', toggleShiftMonitoring);
  btnShiftAction.addEventListener('click', toggleShiftMonitoring);

  // Settings Event Handlers
  pollIntervalSelect.addEventListener('change', (e) => {
    AlarmEngine.config.intervalMinutes = parseInt(e.target.value);
    persistSettings();
    if (state.isMonitoring) {
      // Restart monitoring with new interval
      stopShiftMonitoring();
      startShiftMonitoring();
    }
  });

  rainSensitivitySelect.addEventListener('change', (e) => {
    AlarmEngine.config.rainThresholdProb = parseInt(e.target.value);
    persistSettings();
  });

  alarmToneSelect.addEventListener('change', (e) => {
    AlarmEngine.config.tone = e.target.value;
    persistSettings();
  });

  voiceToggle.addEventListener('change', (e) => {
    AlarmEngine.config.voiceEnabled = e.target.checked;
    persistSettings();
  });

  wakeLockToggle.addEventListener('change', (e) => {
    AlarmEngine.config.keepScreenAwake = e.target.checked;
    persistSettings();
  });

  btnTestAlarm.addEventListener('click', async () => {
    AlarmEngine.initAudio();
    await AlarmEngine.requestNotificationPermission();

    const mockThreats = [
      { name: 'Pallikaranai', weather: { rainProb: 80, rainMm: 4.2, riskLevel: 'high' } }
    ];
    AlarmEngine.triggerAlarmAlert(mockThreats);
  });

  // Live Location & 24h Forecast
  async function fetchLiveGpsWeather() {
    liveCondition.textContent = 'Detecting GPS...';
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          state.liveCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          await updateLiveWeatherUI(state.liveCoords.lat, state.liveCoords.lon);
        },
        async () => {
          await updateLiveWeatherUI(13.0012, 80.2565, 'Chennai (Default)');
        }
      );
    } else {
      await updateLiveWeatherUI(13.0012, 80.2565, 'Chennai (Default)');
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
      liveCondition.textContent = 'Weather unavailable';
    }
  }

  function renderRainChart(hourly) {
    const ctx = document.getElementById('rainChart');
    if (!ctx) return;
    if (state.rainChart) state.rainChart.destroy();

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
          y: { min: 0, max: 100, ticks: { color: '#94a3b8' }, grid: { color: '#26354f' } },
          x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  btnLiveGps.addEventListener('click', () => {
    switchTab('tab-live');
    fetchLiveGpsWeather();
  });
  btnRefreshLive.addEventListener('click', fetchLiveGpsWeather);

  // Synchronized Tabs (Desktop App Tabs + Mobile Bottom Nav)
  document.querySelectorAll('.tab-btn, .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.nav-item').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.toggle('active', c.id === tabId);
    });

    if (tabId === 'tab-route' && state.map) {
      setTimeout(() => state.map.invalidateSize(), 200);
    }
  }

  // Desktop Simulator Toggle
  btnToggleSim.addEventListener('click', () => {
    appLayout.classList.toggle('mobile-sim-mode');
    setTimeout(() => {
      if (state.map) state.map.invalidateSize();
    }, 300);
  });

  // Tutorial / User Guide
  const tutorialSteps = [
    {
      icon: '🌧️',
      title: 'Welcome to MazhaiAlarm',
      desc: 'Engineered for field sales executives covering 10+ areas daily across Tamil Nadu during unpredictable monsoon downpours.'
    },
    {
      icon: '🛣️',
      title: 'Set Daily Route & Detours',
      desc: 'Heading from Wimco Nagar or Adyar to Kelambakkam? Add stops like Pallikaranai, Kovalam, or Sholinganallur with 1-tap!'
    },
    {
      icon: '🛡️',
      title: '5-Minute Active Route Sentinel',
      desc: 'Tap "Start Shift" when leaving. MazhaiAlarm monitors your remaining stops every 5 minutes in the background!'
    },
    {
      icon: '🚨',
      title: 'Dynamic Rain Alarms',
      desc: 'If rain develops ahead, it rings an audible alarm, vibrates your phone, and speaks out warnings so you can seek shelter in time!'
    }
  ];

  function showTutorialStep(idx) {
    const step = tutorialSteps[idx];
    document.getElementById('tutIcon').textContent = step.icon;
    document.getElementById('tutTitle').textContent = step.title;
    document.getElementById('tutDesc').textContent = step.desc;

    document.querySelectorAll('#tutDots .dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });

    btnNextTut.textContent = idx === tutorialSteps.length - 1 ? 'Start Monitoring 🚀' : 'Next →';
  }

  btnHelpTutorial.addEventListener('click', () => {
    state.tutorialStep = 0;
    showTutorialStep(0);
    tutorialModal.classList.add('open');
  });

  btnSkipTut.addEventListener('click', () => {
    tutorialModal.classList.remove('open');
    localStorage.setItem('mazhai_tut_done_v2', 'true');
  });

  btnNextTut.addEventListener('click', () => {
    if (state.tutorialStep < tutorialSteps.length - 1) {
      state.tutorialStep++;
      showTutorialStep(state.tutorialStep);
    } else {
      tutorialModal.classList.remove('open');
      localStorage.setItem('mazhai_tut_done_v2', 'true');
      performRouteScan(true);
    }
  });

  if (!localStorage.getItem('mazhai_tut_done_v2')) {
    state.tutorialStep = 0;
    showTutorialStep(0);
    tutorialModal.classList.add('open');
  }

  // Save Territory
  document.getElementById('btnSaveProfile')?.addEventListener('click', () => {
    const name = document.getElementById('profileName').value;
    alert(`Territory saved for ${name}!`);
  });

  // Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  // Bootstrapping
  loadPersistedState();
  renderStopsList();
  renderPresetChips();
  initMap();
  btnScanRoute.addEventListener('click', () => performRouteScan(true));

  // Initial Scan
  setTimeout(() => {
    performRouteScan(false);
  }, 400);
});
