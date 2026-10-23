// Main Application Logic for MazhaiAlarm (BookMyShow / District / PVR Consumer Experience)
document.addEventListener('DOMContentLoaded', () => {
  // Ensure demo user exists
  AuthEngine.initSeedDemoUser();

  // Current State
  let currentUser = AuthEngine.getCurrentUser();
  let userRoutes = currentUser ? AuthEngine.getUserRoutes(currentUser.id) : [];
  let tempDetectedAreas = [];
  let selectedDay = 'Monday';
  let selectedScheduleType = 'weekly'; // 'weekly' or 'once'
  let activeDayFilter = 'all';

  // DOM Elements - Header
  const currentUserName = document.getElementById('currentUserName');
  const userAvatarLetter = document.getElementById('userAvatarLetter');
  const btnUserBadge = document.getElementById('btnUserBadge');
  const btnOpenSettings = document.getElementById('btnOpenSettings');
  const btnLocationSelect = document.getElementById('btnLocationSelect');

  // Hero & Today's Journey Card (BookMyShow "Pick up where you left off" style)
  const heroPulseDot = document.getElementById('heroPulseDot');
  const btnQuickTest = document.getElementById('btnQuickTest');
  const todayPickupCard = document.getElementById('todayPickupCard');

  // Search Bar Elements (District style)
  const quickAreaSearchInput = document.getElementById('quickAreaSearchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  const searchResultsPopover = document.getElementById('searchResultsPopover');
  const searchResultAreaName = document.getElementById('searchResultAreaName');
  const searchResultStatusTag = document.getElementById('searchResultStatusTag');
  const searchResultDesc = document.getElementById('searchResultDesc');

  // Category & Filter Controls (District & PVR style)
  const categoryPills = document.getElementById('categoryPills');
  const dayFilterScroll = document.getElementById('dayFilterScroll');
  const weeklySection = document.getElementById('weeklySection');
  const radarSection = document.getElementById('radarSection');
  const alarmsList = document.getElementById('alarmsList');
  const alarmCountBadge = document.getElementById('alarmCountBadge');
  const radarGrid = document.getElementById('radarGrid');
  const btnRefreshRadar = document.getElementById('btnRefreshRadar');

  // Bottom Navigation Bar
  const bottomNavTabs = document.querySelectorAll('.bottom-nav-bar .nav-tab');
  const btnNavAddRoute = document.getElementById('btnNavAddRoute');

  // Modal Elements - Add Route
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
  const startLocationDropdown = document.getElementById('startLocationDropdown');
  const endLocationInput = document.getElementById('endLocationInput');
  const endLocationDropdown = document.getElementById('endLocationDropdown');
  const btnAnalyzeRoute = document.getElementById('btnAnalyzeRoute');
  const areaChipsList = document.getElementById('areaChipsList');
  const areaCountText = document.getElementById('areaCountText');
  const customDetourInput = document.getElementById('customDetourInput');
  const detourLocationDropdown = document.getElementById('detourLocationDropdown');
  const btnAddDetour = document.getElementById('btnAddDetour');

  // Settings Modal Elements
  const settingsModal = document.getElementById('settingsModal');
  const btnCloseSettings = document.getElementById('btnCloseSettings');
  const btnDoneSettings = document.getElementById('btnDoneSettings');
  const settingsAvatarLetter = document.getElementById('settingsAvatarLetter');
  const settingsUserName = document.getElementById('settingsUserName');
  const settingsUserEmail = document.getElementById('settingsUserEmail');
  const btnLogoutFromSettings = document.getElementById('btnLogoutFromSettings');

  // Auth Modal Elements
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

  // ==========================================================================
  // Theme Engine (District / Ben 10 Upgrade / Symbiote Radial Ripple)
  // ==========================================================================
  const THEME_STORAGE_KEY = 'mazhai_theme_preference';
  const themeOptions = document.querySelectorAll('#themeSelector .theme-card-option');

  function getEffectiveTheme(preference) {
    if (preference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return preference; // 'light' or 'dark'
  }

  function applyThemeDOM(preference) {
    const effective = getEffectiveTheme(preference);
    if (effective === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Sync card option active classes
    themeOptions.forEach(btn => {
      if (btn.getAttribute('data-theme-val') === preference) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update browser status bar / theme-color meta
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', effective === 'dark' ? '#090d16' : '#f8f9fc');
    }
  }

  async function switchThemeWithRadialTransition(preference, originEvent, clickedBtn) {
    const currentEffective = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const targetEffective = getEffectiveTheme(preference);

    if (currentEffective === targetEffective) {
      applyThemeDOM(preference);
      return;
    }

    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyThemeDOM(preference);
      return;
    }

    let x = originEvent ? originEvent.clientX : null;
    let y = originEvent ? originEvent.clientY : null;

    if (typeof x !== 'number' || typeof y !== 'number' || (x === 0 && y === 0)) {
      const btn = clickedBtn || document.querySelector(`#themeSelector .theme-card-option[data-theme-val="${preference}"]`);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else {
        x = window.innerWidth / 2;
        y = 0;
      }
    }

    const maxRadius = Math.ceil(Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )) + 12;

    const transition = document.startViewTransition(() => {
      applyThemeDOM(preference);
    });

    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    } catch (err) {
      // Ignored
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    applyThemeDOM(saved);

    themeOptions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pref = btn.getAttribute('data-theme-val');
        localStorage.setItem(THEME_STORAGE_KEY, pref);
        switchThemeWithRadialTransition(pref, e, btn);
      });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const currentPref = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
      if (currentPref === 'system') {
        const activeBtn = document.querySelector('#themeSelector .theme-card-option[data-theme-val="system"]');
        switchThemeWithRadialTransition('system', null, activeBtn);
      }
    });
  }

  initTheme();

  // ==========================================================================
  // Check Authentication & User Isolation
  // ==========================================================================
  function checkAuth() {
    currentUser = AuthEngine.getCurrentUser();
    if (!currentUser) {
      userRoutes = [];
      renderAlarmsList();
      renderTodayPickupCard();
      AlarmEngine.stopBackgroundSentinel();
      currentUserName.textContent = 'Guest';
      if (userAvatarLetter) userAvatarLetter.textContent = 'G';
      authModal.classList.add('open');
    } else {
      authModal.classList.remove('open');
      currentUserName.textContent = currentUser.name || 'Sales Rep';
      if (userAvatarLetter) {
        userAvatarLetter.textContent = (currentUser.name || 'S').trim().charAt(0).toUpperCase();
      }
      userRoutes = AuthEngine.getUserRoutes(currentUser.id);
      renderAlarmsList();
      renderTodayPickupCard();
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
      authName.value = '';
      authEmail.value = '';
      authPassword.value = '';
      checkAuth();
    } catch (err) {
      alert(err.message);
    }
  });

  // Settings Sheet Controller
  function openSettings() {
    if (currentUser) {
      if (settingsUserName) settingsUserName.textContent = currentUser.name || 'Sales Rep';
      if (settingsUserEmail) settingsUserEmail.textContent = currentUser.email || 'sales@company.com';
      if (settingsAvatarLetter) {
        settingsAvatarLetter.textContent = (currentUser.name || 'S').trim().charAt(0).toUpperCase();
      }
    }
    settingsModal.classList.add('open');
  }

  function closeSettings() {
    settingsModal.classList.remove('open');
  }

  if (btnOpenSettings) btnOpenSettings.addEventListener('click', openSettings);
  if (btnUserBadge) btnUserBadge.addEventListener('click', openSettings);
  if (btnCloseSettings) btnCloseSettings.addEventListener('click', closeSettings);
  if (btnDoneSettings) btnDoneSettings.addEventListener('click', closeSettings);

  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeSettings();
    });
  }

  if (btnLogoutFromSettings) {
    btnLogoutFromSettings.addEventListener('click', () => {
      if (confirm('Log out or switch account?')) {
        closeSettings();
        AuthEngine.logout();
        currentUser = null;
        userRoutes = [];
        checkAuth();
      }
    });
  }

  // ==========================================================================
  // Today's Route Resolver
  // ==========================================================================
  function getTodayRoute() {
    const activeOnce = userRoutes.find(r => r.type === 'once' && r.enabled);
    if (activeOnce) return activeOnce;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    return userRoutes.find(r => r.type !== 'once' && r.day.toLowerCase() === currentDay.toLowerCase() && r.enabled) || null;
  }

  // ==========================================================================
  // Render Today's Journey Card (BookMyShow "Pick up where you left off" Style)
  // ==========================================================================
  function renderTodayPickupCard(liveMessage, hasRain) {
    if (!todayPickupCard) return;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    const todayRoute = getTodayRoute();

    if (todayRoute) {
      const isOnce = todayRoute.type === 'once';
      const dayTag = isOnce ? '⚡ RING ONCE ACTIVE' : `TODAY'S JOURNEY &bull; ${todayRoute.day.toUpperCase()}`;
      const statusText = liveMessage 
        ? liveMessage 
        : `Scanning all ${todayRoute.areas.length} areas every 5 mins`;

      const stopsChips = (todayRoute.areas || []).map(a => `<span class="mini-area-chip">${a}</span>`).join('');

      todayPickupCard.innerHTML = `
        <div class="pickup-card-header">
          <div class="pickup-title-group">
            <span class="pickup-tag">${dayTag}</span>
            <h3 class="pickup-route-name">${todayRoute.startLocation} <span style="color: var(--brand-primary); font-size: 1rem;">➔</span> ${todayRoute.endLocation}</h3>
          </div>
          <label class="switch" title="Toggle Today's Sentinel Alarm">
            <input type="checkbox" class="toggle-pickup-alarm" data-id="${todayRoute.id}" ${todayRoute.enabled ? 'checked' : ''} aria-label="Toggle today's sentinel">
            <span class="slider"></span>
          </label>
        </div>

        <div class="pickup-card-body">
          <div class="pickup-meta-row">
            <span class="pickup-time-pill">⏰ ${todayRoute.startTime} – ${todayRoute.endTime}</span>
            <span class="pickup-status-chip ${hasRain ? 'rain' : ''}">
              ${hasRain ? '🚨 Rain Detected on Route' : '🌤️ ' + statusText}
            </span>
          </div>

          <div class="pickup-stops-label">Areas Monitored (${(todayRoute.areas || []).length} stops)</div>
          <div class="pickup-chips-row">
            ${stopsChips}
          </div>

          <button type="button" class="btn-pickup-cta" id="btnPickupCta">
            🔊 Test Rain Alarm For This Route
          </button>
        </div>
      `;

      // Event handlers for today's card
      const chk = todayPickupCard.querySelector('.toggle-pickup-alarm');
      if (chk) {
        chk.addEventListener('change', (e) => {
          todayRoute.enabled = e.target.checked;
          AuthEngine.saveUserRoutes(currentUser.id, userRoutes);
          renderAlarmsList();
          renderTodayPickupCard();
          initTodaySentinel();
        });
      }

      const btnCta = todayPickupCard.querySelector('#btnPickupCta');
      if (btnCta) {
        btnCta.addEventListener('click', () => {
          btnQuickTest.click();
        });
      }
    } else {
      // Empty State for Today's Journey
      todayPickupCard.innerHTML = `
        <div class="pickup-card-header">
          <div class="pickup-title-group">
            <span class="pickup-tag">TODAY'S JOURNEY &bull; ${currentDay.toUpperCase()}</span>
            <h3 class="pickup-route-name">No Route Active For Today</h3>
          </div>
        </div>
        <div class="pickup-card-body">
          <p class="pickup-empty-desc">
            You don't have a scheduled route active for ${currentDay}. Set up your fastest path or turn on a Ring Once alarm to monitor rain stops.
          </p>
          <button type="button" class="btn-pickup-cta" id="btnSetTodayRoute">
            + Set Up Today's Route
          </button>
        </div>
      `;

      const btnSet = todayPickupCard.querySelector('#btnSetTodayRoute');
      if (btnSet) {
        btnSet.addEventListener('click', openAddModal);
      }
    }
  }

  // ==========================================================================
  // Render Alarms List (PVR Ticket Style)
  // ==========================================================================
  function renderAlarmsList() {
    alarmsList.innerHTML = '';

    // Filter routes by active day filter
    let filtered = userRoutes;
    if (activeDayFilter === 'once') {
      filtered = userRoutes.filter(r => r.type === 'once');
    } else if (activeDayFilter !== 'all') {
      filtered = userRoutes.filter(r => r.type !== 'once' && r.day.toLowerCase() === activeDayFilter.toLowerCase());
    }

    const activeCount = userRoutes.filter(r => r.enabled).length;
    alarmCountBadge.textContent = `${activeCount} Active / ${userRoutes.length} Total`;

    if (filtered.length === 0) {
      const msg = activeDayFilter === 'all'
        ? 'Add your daily field sales routes or Ring Once trips to get automatic 5-min rain scans.'
        : `No route alarms set for ${activeDayFilter}. Tap below to set one up.`;

      alarmsList.innerHTML = `
        <div class="empty-alarms-state">
          <div class="empty-alarm-icon">⏰</div>
          <div class="empty-alarm-title">No Route Alarms Set</div>
          <div class="empty-alarm-desc">${msg}</div>
          <button type="button" class="btn-empty-add-route" id="btnEmptyAdd">
            <span>+</span> Set Up Route Alarm
          </button>
        </div>
      `;
      const btnEmptyAdd = alarmsList.querySelector('#btnEmptyAdd');
      if (btnEmptyAdd) {
        btnEmptyAdd.addEventListener('click', openAddModal);
      }
      return;
    }

    filtered.forEach((route) => {
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
            <input type="checkbox" class="toggle-route-alarm" data-id="${route.id}" ${route.enabled ? 'checked' : ''} aria-label="Toggle Route Alarm">
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
          renderTodayPickupCard();
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
          renderTodayPickupCard();
          initTodaySentinel();
        }
      });
    });
  }

  // Day Filter Click Handlers
  dayFilterScroll.querySelectorAll('.day-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dayFilterScroll.querySelectorAll('.day-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDayFilter = btn.getAttribute('data-filter');
      renderAlarmsList();
    });
  });

  // ==========================================================================
  // Today's Sentinel Runner (5-Minute Background Scan)
  // ==========================================================================
  function initTodaySentinel() {
    const todayRoute = getTodayRoute();

    if (todayRoute) {
      if (heroPulseDot) heroPulseDot.className = 'pulse-dot active';

      AlarmEngine.startBackgroundSentinel(
        () => getTodayRoute(),
        (log) => {
          if (log.hasRain) {
            if (heroPulseDot) heroPulseDot.className = 'pulse-dot alert';
            renderTodayPickupCard(log.message, true);
          } else {
            if (heroPulseDot) heroPulseDot.className = 'pulse-dot active';
            renderTodayPickupCard(`Checked at ${log.timestamp} • All ${todayRoute.areas.length} areas clear`, false);
          }
        }
      );
    } else {
      if (heroPulseDot) heroPulseDot.className = 'pulse-dot';
      AlarmEngine.stopBackgroundSentinel();
      renderTodayPickupCard();
    }
  }

  // ==========================================================================
  // Quick Siren Audio Test Button
  // ==========================================================================
  btnQuickTest.addEventListener('click', () => {
    AlarmEngine.initAudio();
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const testRoute = getTodayRoute() || {
      startLocation: 'Wimco Nagar',
      endLocation: 'Royapuram',
      areas: ['Wimco Nagar', 'Kaladipet', 'Tollgate', 'Kasimedu', 'Royapuram']
    };

    const simulatedRainStops = testRoute.areas.length >= 3 
      ? [testRoute.areas[0], testRoute.areas[1], testRoute.areas[testRoute.areas.length - 1]]
      : testRoute.areas;

    const message = AlarmEngine.formatContiguousRainStretches(testRoute, simulatedRainStops);

    AlarmEngine.triggerAlarm(message, () => {
      ringingDesc.textContent = message;
      alarmRingingOverlay.classList.add('active');
    });
  });

  btnDismissAlarm.addEventListener('click', () => {
    AlarmEngine.dismissAlarm();
    alarmRingingOverlay.classList.remove('active');
  });

  // ==========================================================================
  // Add / Edit Route Alarm Modal Sheet
  // ==========================================================================
  function openAddModal() {
    tempDetectedAreas = [];
    startLocationInput.value = '';
    endLocationInput.value = '';
    customDetourInput.value = '';
    areaChipsList.innerHTML = `<span class="placeholder-text">Click "Find Fastest Route" above to see all areas automatically.</span>`;
    areaCountText.textContent = '0 areas';
    typeWeeklyBtn.click();
    addAlarmModal.classList.add('open');
  }

  function closeModal() {
    addAlarmModal.classList.remove('open');
  }

  btnCloseModal.addEventListener('click', closeModal);
  btnCancelModal.addEventListener('click', closeModal);

  if (btnNavAddRoute) {
    btnNavAddRoute.addEventListener('click', openAddModal);
  }

  // Schedule type toggle
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

  // Day picker buttons
  dayPicker.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dayPicker.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDay = btn.getAttribute('data-day');
    });
  });

  // ==========================================================================
  // Micro-Locality Autocomplete & Live Recommendations
  // ==========================================================================
  function setupAutocomplete(inputEl, dropdownEl, onSelectCallback) {
    if (!inputEl || !dropdownEl) return;
    let debounceTimer = null;
    let focusedIndex = -1;

    function renderSuggestions(suggestions, query) {
      if (!suggestions || suggestions.length === 0) {
        dropdownEl.innerHTML = `<div class="ac-no-results">No pre-mapped area. Press Enter or tab out to use exact typed name.</div>`;
        dropdownEl.style.display = 'flex';
        return;
      }

      dropdownEl.innerHTML = '';
      focusedIndex = -1;

      suggestions.forEach((item, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'autocomplete-item';
        btn.setAttribute('data-idx', idx);

        // Highlight matched characters in display name
        const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${safeQuery})`, 'gi');
        const highlightedName = item.display.replace(regex, '<mark>$1</mark>');

        btn.innerHTML = `
          <div class="ac-icon">📍</div>
          <div class="ac-text-col">
            <span class="ac-name">${highlightedName}</span>
            <span class="ac-region">${item.region || 'Tamil Nadu'}</span>
          </div>
        `;

        btn.addEventListener('mousedown', (e) => {
          e.preventDefault(); // Prevents input blur before click fires
          selectItem(item);
        });

        dropdownEl.appendChild(btn);
      });

      dropdownEl.style.display = 'flex';
    }

    function selectItem(item) {
      inputEl.value = item.name;
      inputEl.dataset.lat = item.lat;
      inputEl.dataset.lon = item.lon;
      dropdownEl.style.display = 'none';
      if (typeof onSelectCallback === 'function') {
        onSelectCallback(item);
      }
    }

    inputEl.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const query = inputEl.value.trim();
      if (!query) {
        dropdownEl.style.display = 'none';
        return;
      }

      debounceTimer = setTimeout(() => {
        const suggestions = RoutingEngine.searchSuggestions(query, 6);
        renderSuggestions(suggestions, query);
      }, 70);
    });

    inputEl.addEventListener('focus', () => {
      const query = inputEl.value.trim();
      if (query) {
        const suggestions = RoutingEngine.searchSuggestions(query, 6);
        renderSuggestions(suggestions, query);
      }
    });

    inputEl.addEventListener('keydown', (e) => {
      const items = dropdownEl.querySelectorAll('.autocomplete-item');
      if (dropdownEl.style.display !== 'flex' || items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusedIndex = (focusedIndex + 1) % items.length;
        updateFocus(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusedIndex = (focusedIndex - 1 + items.length) % items.length;
        updateFocus(items);
      } else if (e.key === 'Enter') {
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          e.preventDefault();
          items[focusedIndex].dispatchEvent(new MouseEvent('mousedown'));
        }
      } else if (e.key === 'Escape') {
        dropdownEl.style.display = 'none';
      }
    });

    function updateFocus(items) {
      items.forEach((it, idx) => {
        if (idx === focusedIndex) {
          it.classList.add('ac-focused');
          it.scrollIntoView({ block: 'nearest' });
        } else {
          it.classList.remove('ac-focused');
        }
      });
    }

    // Dismiss on click outside
    document.addEventListener('click', (e) => {
      if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.style.display = 'none';
      }
    });
  }

  // Initialize Autocompletes for modal inputs
  setupAutocomplete(startLocationInput, startLocationDropdown);
  setupAutocomplete(endLocationInput, endLocationDropdown);
  setupAutocomplete(customDetourInput, detourLocationDropdown, (item) => {
    if (!tempDetectedAreas.includes(item.name)) {
      tempDetectedAreas.push(item.name);
      renderDetectedAreaChips();
      customDetourInput.value = '';
    }
  });

  // Analyze Route & Detect Areas
  btnAnalyzeRoute.addEventListener('click', async () => {
    const start = startLocationInput.value.trim();
    const end = endLocationInput.value.trim();

    if (!start || !end) {
      alert('Please enter both your starting location and destination.');
      return;
    }

    btnAnalyzeRoute.innerHTML = `<span>⏳</span> Calculating route corridor...`;
    btnAnalyzeRoute.disabled = true;

    try {
      const result = await RoutingEngine.analyzeRouteAreas(start, end);
      tempDetectedAreas = result.areas.map(a => typeof a === 'string' ? a : a.name);
      renderDetectedAreaChips();
    } catch (err) {
      console.warn('Corridor detection failed:', err);
      tempDetectedAreas = [start, end];
      renderDetectedAreaChips();
    } finally {
      btnAnalyzeRoute.innerHTML = `<span>⚡</span> Find Fastest Route & Auto-Detect Areas`;
      btnAnalyzeRoute.disabled = false;
    }
  });

  function renderDetectedAreaChips() {
    areaChipsList.innerHTML = '';
    areaCountText.textContent = `${tempDetectedAreas.length} areas`;

    if (tempDetectedAreas.length === 0) {
      areaChipsList.innerHTML = `<span class="placeholder-text">Click "Find Fastest Route" above to see all areas automatically.</span>`;
      return;
    }

    tempDetectedAreas.forEach((area, index) => {
      const areaName = typeof area === 'string' ? area : area.name;
      const chip = document.createElement('div');
      chip.className = 'area-chip-removable';
      chip.innerHTML = `
        <span>${areaName}</span>
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
      if (detourLocationDropdown) detourLocationDropdown.style.display = 'none';
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
      type: selectedScheduleType,
      day: isOnce ? 'Today / On-Demand' : selectedDay,
      enabled: true,
      startTime: startTimeInput.value || '05:00',
      endTime: endTimeInput.value || '21:00',
      startLocation: start,
      endLocation: end,
      areas: [...tempDetectedAreas]
    };

    if (!isOnce) {
      userRoutes = userRoutes.filter(r => !(r.type !== 'once' && r.day.toLowerCase() === selectedDay.toLowerCase()));
    }
    userRoutes.unshift(newRoute);

    AuthEngine.saveUserRoutes(currentUser.id, userRoutes);
    renderAlarmsList();
    renderTodayPickupCard();
    initTodaySentinel();
    closeModal();
  });

  // ==========================================================================
  // Quick Area Search Bar with Live Popover (District Style)
  // ==========================================================================
  let searchTimeout = null;
  quickAreaSearchInput.addEventListener('input', () => {
    const query = quickAreaSearchInput.value.trim();
    if (!query) {
      searchResultsPopover.style.display = 'none';
      btnClearSearch.style.display = 'none';
      return;
    }

    btnClearSearch.style.display = 'block';
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      const match = RoutingEngine.findKnownLocality(query) || await RoutingEngine.resolvePlace(query);
      if (match) {
        searchResultsPopover.style.display = 'block';
        searchResultAreaName.textContent = match.name;
        searchResultStatusTag.className = 'search-status-tag';
        searchResultStatusTag.textContent = 'Scanning...';
        searchResultDesc.textContent = `Querying Open-Meteo precipitation models for ${match.name}...`;

        try {
          const forecast = await WeatherEngine.getPrecipitationForPoint(match.lat, match.lon);
          const hasRain = forecast.precipitationSum > 0.05 || forecast.precipitationProbability > 20 || forecast.isRain;

          if (hasRain) {
            searchResultStatusTag.className = 'search-status-tag rain';
            searchResultStatusTag.textContent = `🌧️ Rain: ${forecast.precipitationProbability}%`;
            searchResultDesc.textContent = `Precipitation detected (~${forecast.precipitationSum}mm). Expect rain showers in ${match.name}.`;
          } else {
            searchResultStatusTag.className = 'search-status-tag';
            searchResultStatusTag.textContent = `☀️ Clear (${forecast.precipitationProbability}%)`;
            searchResultDesc.textContent = `No rain predicted for ${match.name} currently (${forecast.temp}°C). Good for travel.`;
          }
        } catch (err) {
          searchResultDesc.textContent = `Weather check timed out. Coordinates: ${match.lat.toFixed(3)}, ${match.lon.toFixed(3)}.`;
        }
      } else {
        searchResultsPopover.style.display = 'block';
        searchResultAreaName.textContent = query;
        searchResultStatusTag.className = 'search-status-tag';
        searchResultStatusTag.textContent = 'Custom Area';
        searchResultDesc.textContent = `Tap "+ Add Route" to map ${query} into your daily sales path.`;
      }
    }, 200);
  });

  btnClearSearch.addEventListener('click', () => {
    quickAreaSearchInput.value = '';
    searchResultsPopover.style.display = 'none';
    btnClearSearch.style.display = 'none';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar-wrap')) {
      searchResultsPopover.style.display = 'none';
    }
  });

  // ==========================================================================
  // Category Pills & Bottom Navigation Controller
  // ==========================================================================
  categoryPills.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const tab = pill.getAttribute('data-tab');

      if (tab === 'focus') {
        weeklySection.style.display = 'flex';
        radarSection.style.display = 'none';
        todayPickupCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (tab === 'weekly') {
        weeklySection.style.display = 'flex';
        radarSection.style.display = 'none';
        dayFilterScroll.querySelector('[data-filter="all"]').click();
        weeklySection.scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'once') {
        weeklySection.style.display = 'flex';
        radarSection.style.display = 'none';
        dayFilterScroll.querySelector('[data-filter="once"]').click();
        weeklySection.scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'radar') {
        weeklySection.style.display = 'none';
        radarSection.style.display = 'flex';
        loadTamilNaduRadarGrid();
        radarSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  bottomNavTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      bottomNavTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');

      if (target === 'home') {
        weeklySection.style.display = 'flex';
        radarSection.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'routes') {
        weeklySection.style.display = 'flex';
        radarSection.style.display = 'none';
        weeklySection.scrollIntoView({ behavior: 'smooth' });
      } else if (target === 'radar') {
        weeklySection.style.display = 'none';
        radarSection.style.display = 'flex';
        loadTamilNaduRadarGrid();
      } else if (target === 'settings') {
        openSettings();
      }
    });
  });

  // ==========================================================================
  // Tamil Nadu District Rain Radar
  // ==========================================================================
  const TN_HUBS = [
    { name: 'Chennai (North)', lat: 13.150, lon: 80.290 },
    { name: 'Chennai (South)', lat: 12.920, lon: 80.140 },
    { name: 'Chengalpattu', lat: 12.682, lon: 79.983 },
    { name: 'Kanchipuram', lat: 12.834, lon: 79.703 },
    { name: 'Madurai', lat: 9.925, lon: 78.119 },
    { name: 'Coimbatore', lat: 11.016, lon: 76.955 },
    { name: 'Tiruchirappalli', lat: 10.790, lon: 78.704 },
    { name: 'Salem', lat: 11.664, lon: 78.146 }
  ];

  async function loadTamilNaduRadarGrid() {
    radarGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 24px; color: var(--text-muted);">Fetching live satellite radar data...</div>`;

    try {
      const cardsHtml = await Promise.all(TN_HUBS.map(async (hub) => {
        try {
          const res = await WeatherEngine.getPrecipitationForPoint(hub.lat, hub.lon);
          const hasRain = res.precipitationSum > 0.05 || res.precipitationProbability > 25 || res.isRain;
          const badgeClass = hasRain ? 'radar-condition-badge rain' : 'radar-condition-badge clear';
          const badgeText = hasRain ? '🌧️ Rain Alert' : '☀️ Clear';

          return `
            <div class="radar-card">
              <div class="radar-card-header">
                <span class="radar-district-name">${hub.name}</span>
                <span class="${badgeClass}">${badgeText}</span>
              </div>
              <div class="radar-temp-stat">${res.precipitationProbability}%</div>
              <div class="radar-sub-stat">Rain Prob &bull; ${res.precipitationSum}mm &bull; ${res.temp}°C</div>
            </div>
          `;
        } catch {
          return `
            <div class="radar-card">
              <div class="radar-card-header">
                <span class="radar-district-name">${hub.name}</span>
                <span class="radar-condition-badge clear">Radar Online</span>
              </div>
              <div class="radar-sub-stat">Live data synchronizing</div>
            </div>
          `;
        }
      }));

      radarGrid.innerHTML = cardsHtml.join('');
    } catch (err) {
      radarGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--danger);">Unable to connect to Open-Meteo satellite feed.</div>`;
    }
  }

  btnRefreshRadar.addEventListener('click', loadTamilNaduRadarGrid);

  // ==========================================================================
  // PWA Service Worker
  // ==========================================================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  // Startup
  checkAuth();
});