// Tamil Nadu Corridor & Route Intelligence Engine (100% Free)
const RoutingEngine = {
  // Comprehensive Tamil Nadu & Chennai Locality Knowledge Base
  CORRIDOR_LOCALITIES: [
    { name: 'Wimco Nagar', lat: 13.1706, lon: 80.3021, corridor: 'North Chennai' },
    { name: 'Tiruvottiyur', lat: 13.1610, lon: 80.3015, corridor: 'North Chennai' },
    { name: 'Royapuram', lat: 13.1098, lon: 80.2974, corridor: 'North Chennai' },
    { name: 'Chennai Central', lat: 13.0827, lon: 80.2707, corridor: 'Central' },
    { name: 'T. Nagar', lat: 13.0418, lon: 80.2341, corridor: 'Central' },
    { name: 'Guindy', lat: 13.0067, lon: 80.2025, corridor: 'Central' },
    
    // OMR / South IT Corridor
    { name: 'Adyar', lat: 13.0012, lon: 80.2565, corridor: 'OMR' },
    { name: 'Thiruvanmiyur', lat: 12.9830, lon: 80.2594, corridor: 'OMR' },
    { name: 'Perungudi (OMR Toll)', lat: 12.9654, lon: 80.2461, corridor: 'OMR' },
    { name: 'Kandanchavadi', lat: 12.9610, lon: 80.2440, corridor: 'OMR' },
    { name: 'Thoraipakkam', lat: 12.9423, lon: 80.2366, corridor: 'OMR' },
    { name: 'Karapakkam', lat: 12.9180, lon: 80.2310, corridor: 'OMR' },
    { name: 'Sholinganallur', lat: 12.9010, lon: 80.2279, corridor: 'OMR' },
    { name: 'Navalur', lat: 12.8458, lon: 80.2265, corridor: 'OMR' },
    { name: 'Egattur', lat: 12.8360, lon: 80.2240, corridor: 'OMR' },
    { name: 'Siruseri (SIPCOT IT Park)', lat: 12.8256, lon: 80.2198, corridor: 'OMR' },
    { name: 'Pudupakkam', lat: 12.8050, lon: 80.2210, corridor: 'OMR' },
    { name: 'Kelambakkam', lat: 12.7845, lon: 80.2208, corridor: 'OMR' },
    { name: 'Thiruporur', lat: 12.7230, lon: 80.1915, corridor: 'OMR' },

    // Pallikaranai / Velachery / Medavakkam Corridor
    { name: 'Velachery', lat: 12.9815, lon: 80.2180, corridor: 'Velachery-Medavakkam' },
    { name: 'Pallikaranai', lat: 12.9348, lon: 80.2137, corridor: 'Velachery-Medavakkam' },
    { name: 'Kovilambakkam', lat: 12.9300, lon: 80.1900, corridor: 'Velachery-Medavakkam' },
    { name: 'Medavakkam', lat: 12.9197, lon: 80.1878, corridor: 'Velachery-Medavakkam' },
    { name: 'Perumbakkam', lat: 12.9000, lon: 80.1950, corridor: 'Velachery-Medavakkam' },
    { name: 'Sithalapakkam', lat: 12.8800, lon: 80.1880, corridor: 'Velachery-Medavakkam' },
    { name: 'Mambakkam', lat: 12.8300, lon: 80.1550, corridor: 'Velachery-Medavakkam' },

    // ECR Coastal Corridor
    { name: 'Palavakkam', lat: 12.9610, lon: 80.2580, corridor: 'ECR' },
    { name: 'Neelankarai', lat: 12.9490, lon: 80.2570, corridor: 'ECR' },
    { name: 'Injambakkam', lat: 12.9230, lon: 80.2540, corridor: 'ECR' },
    { name: 'Akkarai', lat: 12.8980, lon: 80.2510, corridor: 'ECR' },
    { name: 'Muttukadu', lat: 12.8250, lon: 80.2450, corridor: 'ECR' },
    { name: 'Kovalam', lat: 12.7925, lon: 80.2514, corridor: 'ECR' },
    { name: 'Mahabalipuram', lat: 12.6269, lon: 80.1927, corridor: 'ECR' },

    // GST Road Corridor
    { name: 'Pallavaram', lat: 12.9675, lon: 80.1491, corridor: 'GST' },
    { name: 'Chromepet', lat: 12.9516, lon: 80.1462, corridor: 'GST' },
    { name: 'Tambaram', lat: 12.9249, lon: 80.1000, corridor: 'GST' },
    { name: 'Perungalathur', lat: 12.9050, lon: 80.0880, corridor: 'GST' },
    { name: 'Vandalur', lat: 12.8910, lon: 80.0810, corridor: 'GST' },
    { name: 'Guduvancheri', lat: 12.8430, lon: 80.0630, corridor: 'GST' },
    { name: 'Maraimalai Nagar', lat: 12.7980, lon: 80.0270, corridor: 'GST' },
    { name: 'Chengalpattu', lat: 12.6841, lon: 79.9836, corridor: 'GST' },

    // West Chennai & Industrial Corridors
    { name: 'Porur', lat: 13.0382, lon: 80.1565, corridor: 'West' },
    { name: 'Poonamallee', lat: 13.0487, lon: 80.1054, corridor: 'West' },
    { name: 'Ambattur', lat: 13.1143, lon: 80.1548, corridor: 'West' },
    { name: 'Avadi', lat: 13.1147, lon: 80.1018, corridor: 'West' },
    { name: 'Sriperumbudur', lat: 12.9699, lon: 79.9482, corridor: 'West' }
  ],

  // Resolves a name to geographic coordinates
  async resolvePlace(name) {
    if (!name) return null;
    const clean = name.trim().toLowerCase();

    // 1. Direct local lookup in known corridor localities
    const match = this.CORRIDOR_LOCALITIES.find(l => 
      clean.includes(l.name.toLowerCase()) || l.name.toLowerCase().includes(clean)
    );
    if (match) return { name: match.name, lat: match.lat, lon: match.lon };

    // 2. Fallback to OpenStreetMap Nominatim
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name + ' Tamil Nadu')}&limit=1`;
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

  // Analyzes route between Start and End, computes fastest route, and returns covered areas
  async analyzeRouteAreas(startName, endName) {
    const startObj = await this.resolvePlace(startName);
    const endObj = await this.resolvePlace(endName);

    if (!startObj || !endObj) {
      throw new Error(`Could not locate "${!startObj ? startName : endName}" in Tamil Nadu.`);
    }

    // Try OSRM to get real road coordinates
    let sampledCoords = [];
    try {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startObj.lon},${startObj.lat};${endObj.lon},${endObj.lat}?overview=full&geometries=geojson`;
      const res = await fetch(osrmUrl);
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        sampledCoords = data.routes[0].geometry.coordinates; // [[lon, lat], ...]
      }
    } catch (err) {
      console.warn('OSRM request failed, using interpolation:', err);
    }

    // Identify intermediate corridor areas within 2.5 km of the road path
    const detectedAreas = [];
    detectedAreas.push({ name: startObj.name, lat: startObj.lat, lon: startObj.lon, isEndpoint: true });

    if (sampledCoords.length > 0) {
      // Check each known locality against the polyline
      this.CORRIDOR_LOCALITIES.forEach(loc => {
        if (loc.name === startObj.name || loc.name === endObj.name) return;

        // Check minimum distance to polyline
        const isNearRoute = sampledCoords.some(([lon, lat]) => {
          return this.haversineDistance(loc.lat, loc.lon, lat, lon) <= 2.8; // within ~2.8 km of road
        });

        if (isNearRoute && !detectedAreas.some(d => d.name === loc.name)) {
          detectedAreas.push({ name: loc.name, lat: loc.lat, lon: loc.lon });
        }
      });
    } else {
      // Fallback: check bounding box + corridor match
      const minLat = Math.min(startObj.lat, endObj.lat);
      const maxLat = Math.max(startObj.lat, endObj.lat);
      const minLon = Math.min(startObj.lon, endObj.lon) - 0.05;
      const maxLon = Math.max(startObj.lon, endObj.lon) + 0.05;

      this.CORRIDOR_LOCALITIES.forEach(loc => {
        if (loc.name === startObj.name || loc.name === endObj.name) return;
        if (loc.lat >= minLat && loc.lat <= maxLat && loc.lon >= minLon && loc.lon <= maxLon) {
          detectedAreas.push({ name: loc.name, lat: loc.lat, lon: loc.lon });
        }
      });
    }

    detectedAreas.push({ name: endObj.name, lat: endObj.lat, lon: endObj.lon, isEndpoint: true });

    return {
      start: startObj,
      end: endObj,
      areas: detectedAreas
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
