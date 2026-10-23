// High-Precision Tamil Nadu Micro-Locality & Corridor Intelligence Engine (100% Free)
const RoutingEngine = {
  // Comprehensive Micro-Locality Database with exact coordinates
  CORRIDOR_LOCALITIES: [
    // North Chennai: Coastal Corridor
    { name: 'Ennore', lat: 13.2258, lon: 80.3243 },
    { name: 'Kattivakkam', lat: 13.2100, lon: 80.3180 },
    { name: 'Ernavoor', lat: 13.1890, lon: 80.3120 },
    { name: 'Wimco Nagar', lat: 13.1706, lon: 80.3021 },
    { name: 'Tiruvottiyur', lat: 13.1610, lon: 80.3015 },
    { name: 'Theradi', lat: 13.1530, lon: 80.3010 },
    { name: 'Tiruvottiyur Market', lat: 13.1480, lon: 80.3005 },
    { name: 'Kaladipet', lat: 13.1420, lon: 80.2995 },
    { name: 'Rajakadai', lat: 13.1360, lon: 80.2985 },
    { name: 'Tollgate', lat: 13.1310, lon: 80.2975 },
    { name: 'Tondiarpet', lat: 13.1230, lon: 80.2930 },
    { name: 'Kasimedu', lat: 13.1180, lon: 80.2980 },
    { name: 'Kalmandapam', lat: 13.1110, lon: 80.2950 },
    { name: 'Royapuram', lat: 13.1098, lon: 80.2974 },
    { name: 'Stanley Hospital', lat: 13.1040, lon: 80.2880 },
    { name: 'Old Washermanpet', lat: 13.1010, lon: 80.2830 },
    { name: 'Korukkupet', lat: 13.1160, lon: 80.2750 },
    { name: 'Chennai Beach', lat: 13.0920, lon: 80.2920 },
    { name: 'Parrys / Broadway', lat: 13.0890, lon: 80.2860 },
    { name: 'Chennai Central', lat: 13.0827, lon: 80.2707 },

    // North Chennai: Manali / Minjur / Industrial Inland Corridor
    { name: 'Minjur', lat: 13.2780, lon: 80.2610 },
    { name: 'Manali New Town', lat: 13.2116, lon: 80.2771 },
    { name: 'Andarkuppam', lat: 13.2100, lon: 80.2680 },
    { name: 'Edayanchavadi', lat: 13.2050, lon: 80.2850 },
    { name: 'Sadayankuppam', lat: 13.1880, lon: 80.2810 },
    { name: 'CPCL / Manali Refinery', lat: 13.1780, lon: 80.2740 },
    { name: 'Manali', lat: 13.1667, lon: 80.2667 },
    { name: 'Mathur MMDA', lat: 13.1690, lon: 80.2450 },
    { name: 'Madhavaram Milk Colony', lat: 13.1550, lon: 80.2350 },
    { name: 'Madhavaram', lat: 13.1480, lon: 80.2310 },
    { name: 'Red Hills', lat: 13.1990, lon: 80.1970 },
    { name: 'Puzhal', lat: 13.1580, lon: 80.1980 },
    { name: 'Kolathur', lat: 13.1240, lon: 80.2140 },
    { name: 'Perambur', lat: 13.1110, lon: 80.2430 },
    { name: 'Vyasarpadi', lat: 13.1070, lon: 80.2580 },

    // Central Corridors
    { name: 'Egmore', lat: 13.0780, lon: 80.2600 },
    { name: 'Thousand Lights', lat: 13.0590, lon: 80.2520 },
    { name: 'T. Nagar', lat: 13.0418, lon: 80.2341 },
    { name: 'Saidapet', lat: 13.0210, lon: 80.2230 },
    { name: 'Guindy', lat: 13.0067, lon: 80.2025 },

    // OMR / South IT Expressway Corridor
    { name: 'Adyar', lat: 13.0012, lon: 80.2565 },
    { name: 'Madhya Kailash', lat: 12.9980, lon: 80.2490 },
    { name: 'Kasturba Nagar', lat: 12.9930, lon: 80.2520 },
    { name: 'Thiruvanmiyur', lat: 12.9830, lon: 80.2594 },
    { name: 'SRP Tools', lat: 12.9810, lon: 80.2470 },
    { name: 'Tidel Park', lat: 12.9890, lon: 80.2480 },
    { name: 'Perungudi (OMR Toll)', lat: 12.9654, lon: 80.2461 },
    { name: 'Kandanchavadi', lat: 12.9610, lon: 80.2440 },
    { name: 'Thoraipakkam', lat: 12.9423, lon: 80.2366 },
    { name: 'Mettukuppam', lat: 12.9330, lon: 80.2340 },
    { name: 'Karapakkam', lat: 12.9180, lon: 80.2310 },
    { name: 'Sholinganallur', lat: 12.9010, lon: 80.2279 },
    { name: 'Kumaran Nagar', lat: 12.8720, lon: 80.2270 },
    { name: 'Semmancheri', lat: 12.8640, lon: 80.2265 },
    { name: 'Navalur', lat: 12.8458, lon: 80.2265 },
    { name: 'Egattur', lat: 12.8360, lon: 80.2240 },
    { name: 'Siruseri (SIPCOT)', lat: 12.8256, lon: 80.2198 },
    { name: 'Kazhipattur', lat: 12.8180, lon: 80.2210 },
    { name: 'Pudupakkam', lat: 12.8050, lon: 80.2210 },
    { name: 'Kelambakkam', lat: 12.7845, lon: 80.2208 },
    { name: 'Thiruporur', lat: 12.7230, lon: 80.1915 },

    // Velachery / Medavakkam / Pallikaranai Corridor
    { name: 'Velachery', lat: 12.9815, lon: 80.2180 },
    { name: 'Vijayanagar (Velachery)', lat: 12.9780, lon: 80.2190 },
    { name: 'Kaiveli', lat: 12.9570, lon: 80.2150 },
    { name: 'Pallikaranai', lat: 12.9348, lon: 80.2137 },
    { name: 'Narayanapuram', lat: 12.9310, lon: 80.2080 },
    { name: 'Kovilambakkam', lat: 12.9300, lon: 80.1900 },
    { name: 'Medavakkam Koot Road', lat: 12.9230, lon: 80.1910 },
    { name: 'Medavakkam', lat: 12.9197, lon: 80.1878 },
    { name: 'Perumbakkam', lat: 12.9000, lon: 80.1950 },
    { name: 'Sithalapakkam', lat: 12.8800, lon: 80.1880 },
    { name: 'Mambakkam', lat: 12.8300, lon: 80.1550 },

    // ECR Coastal Corridor
    { name: 'Kottivakkam', lat: 12.9690, lon: 80.2590 },
    { name: 'Palavakkam', lat: 12.9610, lon: 80.2580 },
    { name: 'Neelankarai', lat: 12.9490, lon: 80.2570 },
    { name: 'Injambakkam', lat: 12.9230, lon: 80.2540 },
    { name: 'Akkarai', lat: 12.8980, lon: 80.2510 },
    { name: 'Panaiyur', lat: 12.8800, lon: 80.2500 },
    { name: 'Uthandi', lat: 12.8600, lon: 80.2480 },
    { name: 'Kanathur', lat: 12.8450, lon: 80.2470 },
    { name: 'Muttukadu', lat: 12.8250, lon: 80.2450 },
    { name: 'Kovalam', lat: 12.7925, lon: 80.2514 },
    { name: 'Thiruvidanthai', lat: 12.7600, lon: 80.2400 },
    { name: 'Mahabalipuram', lat: 12.6269, lon: 80.1927 },

    // GST Road Corridor
    { name: 'Kathipara', lat: 13.0070, lon: 80.2030 },
    { name: 'St. Thomas Mount', lat: 12.9980, lon: 80.1950 },
    { name: 'Meenambakkam', lat: 12.9850, lon: 80.1750 },
    { name: 'Tirusulam', lat: 12.9770, lon: 80.1650 },
    { name: 'Pallavaram', lat: 12.9675, lon: 80.1491 },
    { name: 'Chromepet', lat: 12.9516, lon: 80.1462 },
    { name: 'Sanatorium', lat: 12.9380, lon: 80.1250 },
    { name: 'Tambaram', lat: 12.9249, lon: 80.1000 },
    { name: 'Perungalathur', lat: 12.9050, lon: 80.0880 },
    { name: 'Vandalur', lat: 12.8910, lon: 80.0810 },
    { name: 'Guduvancheri', lat: 12.8430, lon: 80.0630 },
    { name: 'Maraimalai Nagar', lat: 12.7980, lon: 80.0270 },
    { name: 'Chengalpattu', lat: 12.6841, lon: 79.9836 },

    // West Corridor
    { name: 'Koyambedu', lat: 13.0694, lon: 80.1948 },
    { name: 'Maduravoyal', lat: 13.0630, lon: 80.1620 },
    { name: 'Porur', lat: 13.0382, lon: 80.1565 },
    { name: 'Iyyappanthangal', lat: 13.0390, lon: 80.1380 },
    { name: 'Kumananchavadi', lat: 13.0450, lon: 80.1180 },
    { name: 'Poonamallee', lat: 13.0487, lon: 80.1054 },
    { name: 'Mogappair', lat: 13.0840, lon: 80.1750 },
    { name: 'Ambattur Estate', lat: 13.0980, lon: 80.1620 },
    { name: 'Ambattur', lat: 13.1143, lon: 80.1548 },
    { name: 'Avadi', lat: 13.1147, lon: 80.1018 },
    { name: 'Sriperumbudur', lat: 12.9699, lon: 79.9482 }
  ],

  // Resolves a place name with high priority exact matching
  async resolvePlace(name) {
    if (!name) return null;
    const clean = name.trim().toLowerCase();

    // 1. Exact match in micro-localities
    const exact = this.CORRIDOR_LOCALITIES.find(l => l.name.toLowerCase() === clean);
    if (exact) return { name: exact.name, lat: exact.lat, lon: exact.lon };

    // 2. Contains match in micro-localities
    const partial = this.CORRIDOR_LOCALITIES.find(l => 
      clean.includes(l.name.toLowerCase()) || l.name.toLowerCase().includes(clean)
    );
    if (partial) return { name: partial.name, lat: partial.lat, lon: partial.lon };

    // 3. Fallback to OpenStreetMap Nominatim
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name + ' Chennai Tamil Nadu')}&limit=1`;
      const res = await fetch(url, { headers: { 'User-Agent': 'MazhaiAlarm-TN/1.0' } });
      const data = await res.json();
      if (data && data.length > 0) {
        return {
          name: name.trim(),
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
      }
    } catch (e) {
      console.warn('Geocoding fallback failed:', e);
    }

    return null;
  },

  // Analyzes route with strict 0.95km corridor radius and monotonic progress sorting
  async analyzeRouteAreas(startName, endName) {
    const startObj = await this.resolvePlace(startName);
    const endObj = await this.resolvePlace(endName);

    if (!startObj || !endObj) {
      throw new Error(`Could not find coordinates for "${!startObj ? startName : endName}".`);
    }

    let sampledCoords = [];
    try {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startObj.lon},${startObj.lat};${endObj.lon},${endObj.lat}?overview=full&geometries=geojson`;
      const res = await fetch(osrmUrl);
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        sampledCoords = data.routes[0].geometry.coordinates; // [[lon, lat], ...]
      }
    } catch (err) {
      console.warn('OSRM route request error:', err);
    }

    const matchedAreas = [];

    if (sampledCoords.length > 1) {
      // Check each locality with strict road corridor tolerance (0.95 km)
      this.CORRIDOR_LOCALITIES.forEach(loc => {
        let minDistance = Infinity;
        let closestIndex = 0;

        sampledCoords.forEach(([lon, lat], idx) => {
          const d = this.haversineDistance(loc.lat, loc.lon, lat, lon);
          if (d < minDistance) {
            minDistance = d;
            closestIndex = idx;
          }
        });

        // Strict 0.95 km tolerance ensures locations in opposite directions (e.g. Wimco/Tiruvottiyur) are never captured
        if (minDistance <= 0.95) {
          matchedAreas.push({
            name: loc.name,
            lat: loc.lat,
            lon: loc.lon,
            progress: closestIndex / sampledCoords.length
          });
        }
      });
    }

    // Ensure start is at index 0 and end is at the final index
    if (!matchedAreas.some(c => c.name.toLowerCase() === startObj.name.toLowerCase())) {
      matchedAreas.unshift({ name: startObj.name, lat: startObj.lat, lon: startObj.lon, progress: -0.01 });
    }
    if (!matchedAreas.some(c => c.name.toLowerCase() === endObj.name.toLowerCase())) {
      matchedAreas.push({ name: endObj.name, lat: endObj.lat, lon: endObj.lon, progress: 1.01 });
    }

    // Sort strictly in chronological direction of travel (Start -> End)
    matchedAreas.sort((a, b) => a.progress - b.progress);

    // Deduplicate
    const finalAreas = [];
    matchedAreas.forEach(item => {
      if (!finalAreas.some(f => f.name.toLowerCase() === item.name.toLowerCase())) {
        finalAreas.push(item);
      }
    });

    return {
      start: startObj,
      end: endObj,
      areas: finalAreas
    };
  },

  haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }
};
