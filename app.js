// Main Application Logic for MazhaiAlarm (True Alarm App Experience)
document.addEventListener('DOMContentLoaded', () => {
  // Ensure demo user exists
  AuthEngine.initSeedDemoUser();

  // Current State
  let currentUser = AuthEngine.getCurrentUser();
  let userRoutes = currentUser ? AuthEngine.getUserRoutes(currentUser.id) : [];
  let tempDetectedAreas = [];
  let selectedDay = 'Monday';
  let selectedScheduleType = 'weekly'; // 'weekly' or 'once'

  // DOM Elements
  const currentUserName = document.getElementById('currentUserName');
  const userAvatarLetter = document.getElementById('userAvatarLetter');
  const btnLogout = document.getElementById('btnLogout');
  const sentinelBanner = document.getElementById('sentinelBanner');
  const sentinelDot = document.getElementById('sentinelDot');
  const sentinelTitle = document.getElementById('sentinelTitle');
  const sentinelSub = document.getElementById('sentinelSub');
  const btnQuickTest = document.getElementById('btnQuickTest');

  // 3-Way Theme Management (System Default | Light Mode | Dark Mode)
  const THEME_STORAGE_KEY = 'mazhai_theme_preference';
  const themeButtons = document.querySelectorAll('#themeSelector .theme-btn');

  function getEffectiveTheme(preference) {
    if (preference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return preference; // 'light' or 'dark'
  }

  function applyTheme(preference) {
    const effective = getEffectiveTheme(preference);
    if (effective === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Sync button active classes
    themeButtons.forEach(btn => {
      if (btn.getAttribute('data-theme-val') === preference) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update browser status bar / theme-color meta
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', effective === 'dark' ? '#0b0f19' : '#f8f9fc');
    }
  }

  function initTheme() {
    // Default to 'light' mode as preferred by user, but persist if they chose 'system' or 'dark'
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    applyTheme(saved);

    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const pref = btn.getAttribute('data-theme-val');
        localStorage.setItem(THEME_STORAGE_KEY, pref);
        applyTheme(pref);
      });
    });

    // System theme live change listener
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const currentPref = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
      if (currentPref === 'system') {
        applyTheme('system');
      }
    });
  }

  initTheme();

  const alarmsList = document.getElementById('alarmsList');
  const alarmCountBadge = document.getElementById('alarmCountBadge');
  const btnOpenAddModal = document.getElementById('btnOpenAddModal');

  // Modal Elements
  const addAlarmModal = document.getElementById('addAlarmModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const btnSaveAlarm = document.getElementById('btnSaveAlarm');
  const typeWeeklyBtn = document.getElementById('typeWeeklyBtn');
  const typeOnceBtn = document.getElementById('typeOnceBtn');
  const dayPickerGroup = document.getElementById('dayPickerGroup');
  const onceInfoBanner = document.getElementById('onceInfoBanner');
  const dayPicker = document.getElementById('dayPicker');
  const startTimeInput = document.getElementById('startTimeInput');
  const endTimeInput = document.getElementById('endTimeInput');
  const startLocationInput = document.getElementById('startLocationInput');
  const endLocationInput = document.getElementById('endLocationInput');
  const btnAnalyzeRoute = document.getElementById('btnAnalyzeRoute');
  const areaChipsList = document.getElementById('areaChipsList');
  const areaCountText = document.getElementById('areaCountText');
  const customDetourInput = document.getElementById('customDetourInput');
  const btnAddDetour = document.getElementById('btnAddDetour');

  // Auth Elements
  const authModal = document.getElementById('authModal');
  const authForm = document.getElementById('authForm');
  const tabLogin = document.getElementById('tabLogin');
  const tabSignUp = document.getElementById('tabSignUp');
  const nameGroup = document.getElementById('nameGroup');
  const authName = document.getElementById('authName');
  const authEmail = document.getElementById('authEmail');
  const authPassword = document.getElementById('authPassword');
  const btnAuthSubmit = document.getElementById('btnAuthSubmit');
  let isSignUpMode = false;

  // Active Alarm Ringing Overlay
  const alarmRingingOverlay = document.getElementById('alarmRingingOverlay');
  const ringingDesc = document.getElementById('ringingDesc');
  const btnDismissAlarm = document.getElementById('btnDismissAlarm');

  // Check Authentication & Enforce Strict User Data Isolation
  function checkAuth() {
    currentUser = AuthEngine.getCurrentUser();
    if (!currentUser) {
      userRoutes = [];
      renderAlarmsList();
      AlarmEngine.stopBackgroundSentinel();
      currentUserName.textContent = 'Guest';
      if (userAvatarLetter) userAvatarLetter.textContent = 'G';
      sentinelDot.className = 'pulse-dot';
      sentinelTitle.textContent = 'Account Locked / Logged Out';
      sentinelSub.textContent = 'Please log in to view your personal routes';
      authModal.classList.add('open');
    } else {
      authModal.classList.remove('open');
      currentUserName.textContent = currentUser.name || 'Sales Rep';
      if (userAvatarLetter) {
        userAvatarLetter.textContent = (currentUser.name || 'S').trim().charAt(0).toUpperCase();
      }
      // Load strictly this user's isolated routes
      userRoutes = AuthEngine.getUserRoutes(currentUser.id);
      renderAlarmsList();
      initTodaySentinel();
    }
  }

  // Auth Form Handlers
  tabLogin.addEventListener('click', (e) => {
    e.preventDefault();
    isSignUpMode = false;
    tabLogin.classList.add('active');
    tabSignUp.classList.remove('active');
    nameGroup.style.display = 'none';
    btnAuthSubmit.textContent = 'Login to My Routes';
  });

  tabSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    isSignUpMode = true;
    tabSignUp.classList.add('active');
    tabLogin.classList.remove('active');
    nameGroup.style.display = 'flex';
    btnAuthSubmit.textContent = 'Create Sales Account';
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
      if (isSignUpMode) {
        currentUser = AuthEngine.signUp(authName.value, authEmail.value, authPassword.value);
      } else {
        currentUser = AuthEngine.login(authEmail.value, authPassword.value);
      }
      // Clear inputs
      authName.value = '';
      authEmail.value = '';
      authPassword.value = '';
      checkAuth();
    } catch (err) {
      alert(err.message);
    }
  });

  btnLogout.addEventListener('click', () => {
    if (confirm('Log out of this account?')) {
      AuthEngine.logout();
      currentUser = null;
      userRoutes = [];
      checkAuth();
    }
  });

  // Render Alarms List
  function renderAlarmsList() {
    alarmsList.innerHTML = '';
    const activeCount = userRoutes.filter(r => r.enabled).length;
    alarmCountBadge.textContent = `${activeCount} Active / ${userRoutes.length} Routes`;

    if (userRoutes.length === 0) {
      alarmsList.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: #64748b;">
          <p style="font-size: 2rem; margin-bottom: 8px;">⏰</p>
          <p style="font-size: 0.95rem; font-weight: 600; color: #94a3b8;">No Route Alarms Set</p>
          <p style="font-size: 0.8rem; margin-top: 4px;">Tap the <strong>+</strong> button at the bottom right to set up your weekly route alarms.</p>
        </div>
      `;
      return;
    }

    userRoutes.forEach((route, index) => {
      const card = document.createElement('div');
      card.className = `alarm-card ${route.enabled ? '' : 'disabled'}`;
      
      const isOnce = route.type === 'once';
      const dayBadgeClass = isOnce ? 'alarm-day-badge once' : 'alarm-day-badge';
      const dayBadgeText = isOnce ? '⚡ RING ONCE (ON-DEMAND)' : route.day;
      const timeWindowText = isOnce 
        ? `Hours: <strong>${route.startTime} – ${route.endTime}</strong> &bull; Active when toggled ON`
        : `Active: <strong>${route.startTime} – ${route.endTime}</strong> &bull; Scans every 5 mins`;

      const areasListHtml = (route.areas || []).map(a => `
        <span class="mini-area-chip">${a}</span>
      `).join('');

      card.innerHTML = `
        <div class="alarm-card-top">
          <div>
            <div class="${dayBadgeClass}">${dayBadgeText}</div>
            <div class="alarm-route-title">
              <span>${route.startLocation}</span>
              <span class="arrow">➔</span>
              <span>${route.endLocation}</span>
            </div>
            <div class="alarm-time-window">
              ${timeWindowText}
            </div>
          </div>
          <label class="switch" title="Toggle route alarm on/off">
            <input type="checkbox" class="toggle-route-alarm" data-id="${route.id}" ${route.enabled ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>

        <div class="alarm-areas-box">
          <div class="areas-label">
            <span>Areas Covered (${(route.areas || []).length})</span>
            <span style="color: var(--brand-primary); font-weight: 700;">Monitored 5m</span>
          </div>
          <div class="areas-chips-row">
            ${areasListHtml}
          </div>
        </div>

        <div class="alarm-card-actions">
          <button class="btn-alarm-action btn-alarm-delete" data-id="${route.id}">Delete</button>
        </div>
      `;

      alarmsList.appendChild(card);
    });

    // Toggle switch handlers
    alarmsList.querySelectorAll('.toggle-route-alarm').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const r = userRoutes.find(item => item.id === id);
        if (r) {
          r.enabled = e.target.checked;
          AuthEngine.saveUserRoutes(currentUser.id, userRoutes);
          renderAlarmsList();
          initTodaySentinel();
        }
      });
    });

    // Delete handlers
    alarmsList.querySelectorAll('.btn-alarm-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm('Delete this route alarm?')) {
          userRoutes = userRoutes.filter(r => r.id !== id);
          AuthEngine.saveUserRoutes(currentUser.id, userRoutes);
          renderAlarmsList();
          initTodaySentinel();
        }
      });
    });
  }

  // Today's Sentinel Runner
  function getTodayRoute() {
    // 1. Any Ring Once / On-Demand alarm that is currently toggled ON takes immediate active priority!
    const activeOnce = userRoutes.find(r => r.type === 'once' && r.enabled);
    if (activeOnce) return activeOnce;

    // 2. Otherwise match today's scheduled weekday
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    return userRoutes.find(r => r.type !== 'once' && r.day.toLowerCase() === currentDay.toLowerCase() && r.enabled) || null;
  }

  function initTodaySentinel() {
    const todayRoute = getTodayRoute();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];

    if (todayRoute) {
      sentinelDot.className = 'pulse-dot active';
      const label = todayRoute.type === 'once' 
        ? `⚡ Ring Once Active (${todayRoute.startTime} - ${todayRoute.endTime})` 
        : `Today's Sentinel: ${todayRoute.day} (${todayRoute.startTime} - ${todayRoute.endTime})`;

      sentinelTitle.textContent = label;
      sentinelSub.textContent = `${todayRoute.startLocation} ➔ ${todayRoute.endLocation} (${todayRoute.areas.length} areas on 5m scan)`;

      // Start 5-min engine
      AlarmEngine.startBackgroundSentinel(
        () => getTodayRoute(),
        (log) => {
          if (log.hasRain) {
            sentinelDot.className = 'pulse-dot alert';
            sentinelSub.textContent = log.message;
          } else {
            sentinelDot.className = 'pulse-dot active';
            sentinelSub.textContent = `Checked at ${log.timestamp} • All ${todayRoute.areas.length} areas clear`;
          }
        }
      );
    } else {
      sentinelDot.className = 'pulse-dot';
      sentinelTitle.textContent = `No Active Alarm for ${currentDay}`;
      sentinelSub.textContent = `Tap '+' to schedule a route or turn on a Ring Once alarm`;
      AlarmEngine.stopBackgroundSentinel();
    }
  }

  // Quick Test Alarm Button
  btnQuickTest.addEventListener('click', () => {
    AlarmEngine.initAudio();
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const testRoute = getTodayRoute() || {
      day: 'Friday',
      startLocation: 'Wimco Nagar',
      endLocation: 'Royapuram',
      areas: [
        'Wimco Nagar', 'Tiruvottiyur', 'Theradi', 'Tiruvottiyur Market', 
        'Kaladipet', 'Rajakadai', 'Tollgate', 'Tondiarpet', 'Kasimedu', 
        'Kalmandapam', 'Royapuram'
      ]
    };

    // Demonstrates exact contiguous stretch alert:
    // Rain from Wimco Nagar till Tollgate, and again from Kasimedu till Royapuram
    const mockThreats = [
      { name: 'Wimco Nagar', rainProb: 85, rainMm: 4.0 },
      { name: 'Tiruvottiyur', rainProb: 80, rainMm: 3.5 },
      { name: 'Theradi', rainProb: 85, rainMm: 4.2 },
      { name: 'Kaladipet', rainProb: 75, rainMm: 3.0 },
      { name: 'Tollgate', rainProb: 70, rainMm: 2.5 },
      { name: 'Kasimedu', rainProb: 70, rainMm: 2.8 },
      { name: 'Kalmandapam', rainProb: 75, rainMm: 3.2 },
      { name: 'Royapuram', rainProb: 80, rainMm: 3.6 }
    ];

    AlarmEngine.triggerAlarm(testRoute, mockThreats);
  });

  // Active Alarm Ringing Overlay Listeners
  window.addEventListener('mazhai-alarm-triggered', (e) => {
    alarmRingingOverlay.classList.add('active');
    const { route, rainThreats, sentence } = e.detail;
    const finalSentence = sentence || AlarmEngine.formatContiguousRainStretches(route.areas || [], rainThreats);
    ringingDesc.innerHTML = `
      <strong>${finalSentence}</strong> along your <strong>${route.day}</strong> route!<br>
      Please take shelter, wear your raincoat, and protect your sales materials.
    `;
  });

  window.addEventListener('mazhai-alarm-dismissed', () => {
    alarmRingingOverlay.classList.remove('active');
  });

  btnDismissAlarm.addEventListener('click', () => {
    AlarmEngine.stopAlarm();
  });

  // ================= ADD ALARM MODAL FLOW =================

  // Schedule Type Buttons (Weekly Routine vs Ring Once)
  typeWeeklyBtn.addEventListener('click', () => {
    selectedScheduleType = 'weekly';
    typeWeeklyBtn.classList.add('active');
    typeOnceBtn.classList.remove('active');
    dayPickerGroup.style.display = 'flex';
    onceInfoBanner.style.display = 'none';
  });

  typeOnceBtn.addEventListener('click', () => {
    selectedScheduleType = 'once';
    typeOnceBtn.classList.add('active');
    typeWeeklyBtn.classList.remove('active');
    dayPickerGroup.style.display = 'none';
    onceInfoBanner.style.display = 'block';
  });

  btnOpenAddModal.addEventListener('click', () => {
    tempDetectedAreas = [];
    startLocationInput.value = '';
    endLocationInput.value = '';
    customDetourInput.value = '';
    areaChipsList.innerHTML = `<span class="placeholder-text">Click "Find Fastest Route" above to see all areas automatically.</span>`;
    areaCountText.textContent = '0 areas';
    // Default to weekly
    typeWeeklyBtn.click();
    addAlarmModal.classList.add('open');
  });

  function closeModal() {
    addAlarmModal.classList.remove('open');
  }

  btnCloseModal.addEventListener('click', closeModal);
  btnCancelModal.addEventListener('click', closeModal);

  // Day picker buttons
  dayPicker.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dayPicker.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDay = btn.getAttribute('data-day');
    });
  });

  // Analyze Route & Detect Areas
  btnAnalyzeRoute.addEventListener('click', async () => {
    const start = startLocationInput.value.trim();
    const end = endLocationInput.value.trim();

    if (!start || !end) {
      alert('Please enter both start location and destination.');
      return;
    }

    btnAnalyzeRoute.disabled = true;
    btnAnalyzeRoute.innerHTML = '<span>⏳</span> Calculating Fastest Route & Areas...';

    try {
      const result = await RoutingEngine.analyzeRouteAreas(start, end);
      tempDetectedAreas = result.areas.map(a => a.name);
      renderDetectedAreaChips();
    } catch (err) {
      alert(err.message || 'Could not analyze route. Try entering standard Tamil Nadu areas (e.g. Adyar, Kelambakkam, Wimco Nagar).');
    } finally {
      btnAnalyzeRoute.disabled = false;
      btnAnalyzeRoute.innerHTML = '<span>⚡</span> Find Fastest Route & Auto-Detect Areas';
    }
  });

  function renderDetectedAreaChips() {
    areaChipsList.innerHTML = '';
    areaCountText.textContent = `${tempDetectedAreas.length} areas`;

    if (tempDetectedAreas.length === 0) {
      areaChipsList.innerHTML = `<span class="placeholder-text">No areas detected yet.</span>`;
      return;
    }

    tempDetectedAreas.forEach((area, index) => {
      const chip = document.createElement('div');
      chip.className = 'area-chip-removable';
      chip.innerHTML = `
        <span>${area}</span>
        <button type="button" data-idx="${index}" title="Remove this area">&times;</button>
      `;
      areaChipsList.appendChild(chip);
    });

    areaChipsList.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-idx'));
        tempDetectedAreas.splice(idx, 1);
        renderDetectedAreaChips();
      });
    });
  }

  // Add Custom Detour
  btnAddDetour.addEventListener('click', () => {
    const val = customDetourInput.value.trim();
    if (!val) return;
    if (!tempDetectedAreas.includes(val)) {
      tempDetectedAreas.push(val);
      renderDetectedAreaChips();
      customDetourInput.value = '';
    }
  });

  // Save Route Alarm
  btnSaveAlarm.addEventListener('click', () => {
    const start = startLocationInput.value.trim();
    const end = endLocationInput.value.trim();

    if (!start || !end) {
      alert('Please enter both start and end locations.');
      return;
    }

    if (tempDetectedAreas.length === 0) {
      tempDetectedAreas = [start, end];
    }

    const isOnce = selectedScheduleType === 'once';

    const newRoute = {
      id: 'route_' + Date.now(),
      type: selectedScheduleType, // 'weekly' or 'once'
      day: isOnce ? 'Today / On-Demand' : selectedDay,
      enabled: true,
      startTime: startTimeInput.value || '05:00',
      endTime: endTimeInput.value || '21:00',
      startLocation: start,
      endLocation: end,
      areas: [...tempDetectedAreas]
    };

    // If weekly, replace same day; if once, prepend
    if (!isOnce) {
      userRoutes = userRoutes.filter(r => !(r.type !== 'once' && r.day.toLowerCase() === selectedDay.toLowerCase()));
    }
    userRoutes.unshift(newRoute);

    AuthEngine.saveUserRoutes(currentUser.id, userRoutes);
    renderAlarmsList();
    initTodaySentinel();
    closeModal();
  });

  // PWA Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  // Startup
  checkAuth();
});
