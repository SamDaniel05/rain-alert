// User Authentication & Strict Data Isolation Middleware
const AuthEngine = {
  USERS_KEY: 'mazhai_all_users_v2',
  SESSION_KEY: 'mazhai_active_session_v2',

  // Middleware: Get all registered user accounts
  getAllUsers() {
    try {
      const data = localStorage.getItem(this.USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // Middleware: Get currently authenticated user session
  getCurrentUser() {
    try {
      const userId = localStorage.getItem(this.SESSION_KEY);
      if (!userId) return null;
      const users = this.getAllUsers();
      const user = users.find(u => u.id === userId);
      return user ? { id: user.id, name: user.name, email: user.email } : null;
    } catch (e) {
      return null;
    }
  },

  // Register New User (Strictly clean slate: 0 routes, NO crossover)
  signUp(name, email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !password || !cleanName) {
      throw new Error('All fields are required.');
    }

    const users = this.getAllUsers();

    if (users.some(u => u.email === cleanEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name: cleanName,
      email: cleanEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.SESSION_KEY, newUser.id);

    // Explicitly initialize with EMPTY routes array - NO default routes
    this.saveUserRoutes(newUser.id, []);

    return { id: newUser.id, name: newUser.name, email: newUser.email };
  },

  // Authenticate Existing User
  login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getAllUsers();
    const user = users.find(u => u.email === cleanEmail && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    localStorage.setItem(this.SESSION_KEY, user.id);
    return { id: user.id, name: user.name, email: user.email };
  },

  // Terminate Active Session
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  // ================= DATA ISOLATION MIDDLEWARE =================
  // Ensures User A can NEVER see or modify User B's routes

  getUserRoutes(userId) {
    if (!userId || typeof userId !== 'string') return [];
    try {
      const storageKey = `mazhai_usr_${userId}_routes`;
      const data = localStorage.getItem(storageKey);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Failed to retrieve user routes:', e);
      return [];
    }
  },

  saveUserRoutes(userId, routes) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Unauthorized: Missing or invalid User ID.');
    }
    try {
      const storageKey = `mazhai_usr_${userId}_routes`;
      const sanitizedRoutes = Array.isArray(routes) ? routes : [];
      localStorage.setItem(storageKey, JSON.stringify(sanitizedRoutes));
    } catch (e) {
      console.error('Failed to save isolated user routes:', e);
    }
  },

  // Optional: Only seed demo user if the database is 100% empty
  initSeedDemoUser() {
    const users = this.getAllUsers();
    if (users.length === 0) {
      const demoId = 'usr_demo_field_dad';
      const demoUser = {
        id: demoId,
        name: "Sales Officer (Dad)",
        email: "demo.dad@field.tn",
        password: "password123",
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(this.USERS_KEY, JSON.stringify([demoUser]));
      // Only demo gets a sample route
      this.saveUserRoutes(demoId, [
        {
          id: 'route_sample_demo',
          day: 'Monday',
          enabled: true,
          startTime: '05:00',
          endTime: '21:00',
          startLocation: 'Adyar',
          endLocation: 'Kelambakkam',
          areas: [
            'Adyar',
            'Thiruvanmiyur',
            'Perungudi (OMR Toll)',
            'Thoraipakkam',
            'Sholinganallur',
            'Navalur',
            'Siruseri (SIPCOT)',
            'Kelambakkam'
          ]
        }
      ]);
    }
  }
};
