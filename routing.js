// High-Precision Tamil Nadu Micro-Locality & Corridor Intelligence Engine (100% Free)
const RoutingEngine = {
  // Comprehensive Micro-Locality Database with exact coordinates
  CORRIDOR_LOCALITIES: [
    // North Chennai / Ennore - Central Corridor
    { name: 'Ennore', lat: 13.2140, lon: 80.3220, corridor: 'North Chennai' },
    { name: 'Wimco Nagar', lat: 13.1706, lon: 80.3021, corridor: 'North Chennai' },
    { name: 'Tiruvottiyur', lat: 13.1610, lon: 80.3015, corridor: 'North Chennai' },
    { name: 'Theradi', lat: 13.1530, lon: 80.3010, corridor: 'North Chennai' },
    { name: 'Tiruvottiyur Market', lat: 13.1480, lon: 80.3005, corridor: 'North Chennai' },
    { name: 'Kaladipet', lat: 13.1420, lon: 80.2995, corridor: 'North Chennai' },
    { name: 'Rajakadai', lat: 13.1360, lon: 80.2985, corridor: 'North Chennai' },
    { name: 'Tollgate', lat: 13.1310, lon: 80.2975, corridor: 'North Chennai' },
    { name: 'Tondiarpet', lat: 13.1230, lon: 80.2930, corridor: 'North Chennai' },
    { name: 'Kasimedu', lat: 13.1180, lon: 80.2980, corridor: 'North Chennai' },
    { name: 'Kalmandapam', lat: 13.1110, lon: 80.2950, corridor: 'North Chennai' },
    { name: 'Royapuram', lat: 13.1098, lon: 80.2974, corridor: 'North Chennai' },
    { name: 'Stanley Hospital', lat: 13.1040, lon: 80.2880, corridor: 'North Chennai' },
    { name: 'Old Washermanpet', lat: 13.1010, lon: 80.2830, corridor: 'North Chennai' },
    { name: 'Chennai Beach', lat: 13.0920, lon: 80.2920, corridor: 'North Chennai' },
    { name: 'Parrys / Broadway', lat: 13.0890, lon: 80.2860, corridor: 'Central' },
    { name: 'Chennai Central', lat: 13.0827, lon: 80.2707, corridor: 'Central' },
    { name: 'Egmore', lat: 13.0780, lon: 80.2600, corridor: 'Central' },
    { name: 'Thousand Lights', lat: 13.0590, lon: 80.2520, corridor: 'Central' },
    { name: 'T. Nagar', lat: 13.0418, lon: 80.2341, corridor: 'Central' },
    { name: 'Saidapet', lat: 13.0210, lon: 80.2230, corridor: 'Central' },
    { name: 'Guindy', lat: 13.0067, lon: 80.2025, corridor: 'Central' },

    // OMR / South IT Expressway Corridor
    { name: 'Adyar', lat: 13.0012, lon: 80.2565, corridor: 'OMR' },
    { name: 'Madhya Kailash', lat: 12.9980, lon: 80.2490, corridor: 'OMR' },
    { name: 'Kasturba Nagar', lat: 12.9930, lon: 80.2520, corridor: 'OMR' },
    { name: 'Thiruvanmiyur', lat: 12.9830, lon: 80.2594, corridor: 'OMR' },
    { name: 'SRP Tools', lat: 12.9810, lon: 80.2470, corridor: 'OMR' },
    { name: 'Tidel Park', lat: 12.9890, lon: 80.2480, corridor: 'OMR' },
    { name: 'Perungudi (OMR Toll)', lat: 12.9654, lon: 80.2461, corridor: 'OMR' },
    { name: 'Kandanchavadi', lat: 12.9610, lon: 80.2440, corridor: 'OMR' },
    { name: 'Thoraipakkam', lat: 12.9423, lon: 80.2366, corridor: 'OMR' },
    { name: 'Mettukuppam', lat: 12.9330, lon: 80.2340, corridor: 'OMR' },
    { name: 'Karapakkam', lat: 12.9180, lon: 80.2310, corridor: 'OMR' },
    { name: 'Sholinganallur', lat: 12.9010, lon: 80.2279, corridor: 'OMR' },
    { name: 'Kumaran Nagar', lat: 12.8720, lon: 80.2270, corridor: 'OMR' },
    { name: 'Semmancheri', lat: 12.8640, lon: 80.2265, corridor: 'OMR' },
    { name: 'Navalur', lat: 12.8458, lon: 80.2265, corridor: 'OMR' },
    { name: 'Egattur', lat: 12.8360, lon: 80.2240, corridor: 'OMR' },
    { name: 'Siruseri (SIPCOT)', lat: 12.8256, lon: 80.2198, corridor: 'OMR' },
    { name: 'Kazhipattur', lat: 12.8180, lon: 80.2210, corridor: 'OMR' },
    { name: 'Pudupakkam', lat: 12.8050, lon: 80.2210, corridor: 'OMR' },
    { name: 'Kelambakkam', lat: 12.7845, lon: 80.2208, corridor: 'OMR' },
    { name: 'Thiruporur', lat: 12.7230, lon: 80.1915, corridor: 'OMR' },

    // Velachery / Medavakkam / Pallikaranai Corridor
    { name: 'Velachery', lat: 12.9815, lon: 80.2180, corridor: 'Velachery-Medavakkam' },
    { name: 'Vijayanagar (Velachery)', lat: 12.9780, lon: 80.2190, corridor: 'Velachery-Medavakkam' },
    { name: 'Kaiveli', lat: 12.9570, lon: 80.2150, corridor: 'Velachery-Medavakkam' },
    { name: 'Pallikaranai', lat: 12.9348, lon: 80.2137, corridor: 'Velachery-Medavakkam' },
    { name: 'Narayanapuram', lat: 12.9310, lon: 80.2080, corridor: 'Velachery-Medavakkam' },
    { name: 'Kovilambakkam', lat: 12.9300, lon: 80.1900, corridor: 'Velachery-Medavakkam' },
    { name: 'Medavakkam Koot Road', lat: 12.9230, lon: 80.1910, corridor: 'Velachery-Medavakkam' },
    { name: 'Medavakkam', lat: 12.9197, lon: 80.1878, corridor: 'Velachery-Medavakkam' },
    { name: 'Perumbakkam', lat: 12.9000, lon: 80.1950, corridor: 'Velachery-Medavakkam' },
    { name: 'Sithalapakkam', lat: 12.8800, lon: 80.1880, corridor: 'Velachery-Medavakkam' },
    { name: 'Mambakkam', lat: 12.8300, lon: 80.1550, corridor: 'Velachery-Medavakkam' },

    // ECR Coastal Corridor
    { name: 'Kottivakkam', lat: 12.9690, lon: 80.2590, corridor: 'ECR' },
    { name: 'Palavakkam', lat: 12.9610, lon: 80.2580, corridor: 'ECR' },
    { name: 'Neelankarai', lat: 12.9490, lon: 80.2570, corridor: 'ECR' },
    { name: 'Injambakkam', lat: 12.9230, lon: 80.2540, corridor: 'ECR' },
    { name: 'Akkarai', lat: 12.8980, lon: 80.2510, corridor: 'ECR' },
    { name: 'Panaiyur', lat: 12.8800, lon: 80.2500, corridor: 'ECR' },
    { name: 'Uthandi', lat: 12.8600, lon: 80.2480, corridor: 'ECR' },
    { name: 'Kanathur', lat: 12.8450, lon: 80.2470, corridor: 'ECR' },
    { name: 'Muttukadu', lat: 12.8250, lon: 80.2450, corridor: 'ECR' },
    { name: 'Kovalam', lat: 12.7925, lon: 80.2514, corridor: 'ECR' },
    { name: 'Thiruvidanthai', lat: 12.7600, lon: 80.2400, corridor: 'ECR' },
    { name: 'Mahabalipuram', lat: 12.6269, lon: 80.1927, corridor: 'ECR' },

    // GST Road Corridor
    { name: 'Kathipara', lat: 13.0070, lon: 80.2030, corridor: 'GST' },
    { name: 'St. Thomas Mount', lat: 12.9980, lon: 80.1950, corridor: 'GST' },
    { name: 'Meenambakkam', lat: 12.9850, lon: 80.1750, corridor: 'GST' },
    { name: 'Tirusulam', lat: 12.9770, lon: 80.1650, corridor: 'GST' },
    { name: 'Pallavaram', lat: 12.9675, lon: 80.1491, corridor: 'GST' },
    { name: 'Chromepet', lat: 12.9516, lon: 80.1462, corridor: 'GST' },
    { name: 'Sanatorium', lat: 12.9380, lon: 80.1250, corridor: 'GST' },
    { name: 'Tambaram', lat: 12.9249, lon: 80.1000, corridor: 'GST' },
    { name: 'Perungalathur', lat: 12.9050, lon: 80.0880, corridor: 'GST' },
    { name: 'Vandalur', lat: 12.8910, lon: 80.0810, corridor: 'GST' },
    { name: 'Guduvancheri', lat: 12.8430, lon: 80.0630, corridor: 'GST' },
    { name: 'Maraimalai Nagar', lat: 12.7980, lon: 80.0270, corridor: 'GST' },
    { name: 'Chengalpattu', lat: 12.6841, lon: 79.9836, corridor: 'GST' },

    // West Chennai & Industrial Corridors
    { name: 'Koyambedu', lat: 13.0694, lon: 80.1948, corridor: 'West' },
    { name: 'Maduravoyal', lat: 13.0630, lon: 80.1620, corridor: 'West' },
    { name: 'Porur', lat: 13.0382, lon: 80.1565, corridor: 'West' },
    { name: 'Iyyappanthangal', lat: 13.0390, lon: 80.1380, corridor: 'West' },
    { name: 'Kumananchavadi', lat: 13.0450, lon: 80.1180, corridor: 'West' },
    { name: 'Poonamallee', lat: 13.0487, lon: 80.1054, corridor: 'West' },
    { name: 'Mogappair', lat: 13.0840, lon: 80.1750, corridor: 'West' },
    { name: 'Ambattur Estate', lat: 13.0980, lon: 80.1620, corridor: 'West' },
    { name: 'Ambattur', lat: 13.1143, lon: 80.1548, corridor: 'West' },
    { name: 'Avadi', lat: 13.1147, lon: 80.1018, corridor: 'West' },
    { name: 'Sriperumbudur', lat: 12.9699, lon: 79.9482, corridor: 'West' }
  ],

  // Resolves a place name to coordinates
  async resolvePlace(name) {
    if (!name) return null;
    const clean = name.trim().toLowerCase();

    // 1. Direct match in micro-localities
    const match = this.CORRIDOR_LOCALITIES.find(l => 
      l.name.toLowerCase() === clean ||
      clean.includes(l.name.toLowerCase()) || 
      l.name.toLowerCase().includes(clean)
    );
    if (match) return { name: match.name, lat: match.lat, lon: match.lon };

    // 2. OpenStreetMap Nominatim Geocoding fallback
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

  // Analyzes route and returns all ordered micro-localities along the fastest path
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
      console.warn('OSRM request error, using geometric corridor interpolation:', err);
    }

    // Collect all localities near the corridor and rank them monotonically by route progress
    const candidateAreas = [];

    // Check every known micro-locality
    this.CORRIDOR_LOCALITIES.forEach(loc => {
      let isNear = false;
      let progressFraction = 0;

      if (sampledCoords.length > 1) {
        // Find closest point on route polyline and its index
        let minDistance = Infinity;
        let closestIndex = 0;

        sampledCoords.forEach(([lon, lat], idx) => {
          const d = this.haversineDistance(loc.lat, loc.lon, lat, lon);
          if (d < minDistance) {
            minDistance = d;
            closestIndex = idx;
          }
        });

        // If locality is within 2.2 km of the road path
        if (minDistance <= 2.2) {
          isNear = true;
          progressFraction = closestIndex / sampledCoords.length;
        }
      } else {
        // Direct geometric bounding corridor fallback
        const totalDist = this.haversineDistance(startObj.lat, startObj.lon, endObj.lat, endObj.lon);
        const distFromStart = this.haversineDistance(startObj.lat, startObj.lon, loc.lat, loc.lon);
        const distToEnd = this.haversineDistance(loc.lat, loc.lon, endObj.lat, endObj.lon);

        // Locality lies near the straight path if distFromStart + distToEnd ~ totalDist
        if (distFromStart + distToEnd <= totalDist * 1.25) {
          isNear = true;
          progressFraction = distFromStart / (distFromStart + distToEnd);
        }
      }

      if (isNear) {
        candidateAreas.push({
          name: loc.name,
          lat: loc.lat,
          lon: loc.lon,
          progress: progressFraction
        });
      }
    });

    // Ensure start is first and end is last
    if (!candidateAreas.some(c => c.name.toLowerCase() === startObj.name.toLowerCase())) {
      candidateAreas.unshift({ name: startObj.name, lat: startObj.lat, lon: startObj.lon, progress: 0 });
    }
    if (!candidateAreas.some(c => c.name.toLowerCase() === endObj.name.toLowerCase())) {
      candidateAreas.push({ name: endObj.name, lat: endObj.lat, lon: endObj.lon, progress: 1 });
    }

    // Sort candidates monotonically from Start (progress 0) to End (progress 1)
    candidateAreas.sort((a, b) => a.progress - b.progress);

    // Remove duplicates
    const finalAreas = [];
    candidateAreas.forEach(item => {
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
