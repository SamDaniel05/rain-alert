// User Authentication & Account Isolation Engine (Zero paid backend required)
const AuthEngine = {
  USERS_KEY: 'mazhai_all_users',
  SESSION_KEY: 'mazhai_active_session',

  getAllUsers() {
    try {
      const data = localStorage.getItem(this.USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  getCurrentUser() {
    try {
      const userId = localStorage.getItem(this.SESSION_KEY);
      if (!userId) return null;
      const users = this.getAllUsers();
      return users.find(u => u.id === userId) || null;
    } catch (e) {
      return null;
    }
  },

  signUp(name, email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getAllUsers();

    if (users.some(u => u.email === cleanEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: password, // client-side hash/storage for standalone app
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.SESSION_KEY, newUser.id);

    // Initialize default Monday sales route for Dad as demonstration
    this.saveUserRoutes(newUser.id, [
      {
        id: 'route_mon_default',
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
          'Kelambakkam',
          'Pallikaranai (Custom Detour)',
          'Kovalam (ECR Detour)'
        ]
      }
    ]);

    return newUser;
  },

  login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getAllUsers();
    const user = users.find(u => u.email === cleanEmail && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    localStorage.setItem(this.SESSION_KEY, user.id);
    return user;
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  // Per-User Route Storage Isolation
  getUserRoutes(userId) {
    if (!userId) return [];
    try {
      const key = `mazhai_routes_${userId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveUserRoutes(userId, routes) {
    if (!userId) return;
    try {
      const key = `mazhai_routes_${userId}`;
      localStorage.setItem(key, JSON.stringify(routes));
    } catch (e) {
      console.warn('Failed to save user routes:', e);
    }
  },

  // Ensure a demo account exists on initial launch for convenience
  initSeedDemoUser() {
    const users = this.getAllUsers();
    if (users.length === 0) {
      this.signUp('Sales Officer (Dad)', 'sales.dad@field.tn', 'password123');
    }
  }
};
