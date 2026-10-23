// Free OpenStreetMap (OSRM + Nominatim) Routing Engine
const RoutingEngine = {
  // Common Tamil Nadu & Chennai presets for instant 1-tap testing
  TAMIL_NADU_PRESETS: [
    { name: 'Wimco Nagar (Home Base)', lat: 13.1706, lon: 80.3021, district: 'North Chennai' },
    { name: 'Adyar', lat: 13.0012, lon: 80.2565, district: 'South Chennai' },
    { name: 'Kelambakkam', lat: 12.7845, lon: 80.2208, district: 'Chengalpattu / OMR' },
    { name: 'Pallikaranai (Marshland Corridor)', lat: 12.9348, lon: 80.2137, district: 'South Chennai' },
    { name: 'Kovalam (ECR Coast)', lat: 12.7925, lon: 80.2514, district: 'ECR' },
    { name: 'Sholinganallur (OMR Junction)', lat: 12.9010, lon: 80.2279, district: 'OMR' },
    { name: 'Thiruvanmiyur', lat: 12.9830, lon: 80.2594, district: 'South Chennai' },
    { name: 'Perungudi (Toll Plaza)', lat: 12.9654, lon: 80.2461, district: 'OMR' },
    { name: 'Navalur', lat: 12.8458, lon: 80.2265, district: 'OMR' },
    { name: 'Siruseri (SIPCOT IT Park)', lat: 12.8256, lon: 80.2198, district: 'OMR' },
    { name: 'Medavakkam', lat: 12.9197, lon: 80.1878, district: 'South Chennai' },
    { name: 'Guindy', lat: 13.0067, lon: 80.2025, district: 'Chennai Central' },
    { name: 'T. Nagar', lat: 13.0418, lon: 80.2341, district: 'Chennai Central' },
    { name: 'Tambaram', lat: 12.9249, lon: 80.1000, district: 'South Suburbs' },
    { name: 'Coimbatore Gandhipuram', lat: 11.0168, lon: 76.9558, district: 'Coimbatore' },
    { name: 'Madurai Meenakshi', lat: 9.9195, lon: 78.1193, district: 'Madurai' },
    { name: 'Trichy Central', lat: 10.7905, lon: 78.7047, district: 'Tiruchirappalli' }
  ],

  // Free OpenStreetMap Geocoding via Nominatim
  async searchLocation(query) {
    if (!query || query.trim().length < 2) return [];
    const cleanQuery = encodeURIComponent(query.trim() + ' Tamil Nadu');
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${cleanQuery}&countrycodes=in&limit=6`;
    try {
      const res = await fetch(url, {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'MazhaiAlarm-TN/1.0'
        }
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.map(item => ({
        name: item.display_name.split(',').slice(0, 3).join(', '),
        fullName: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      }));
    } catch (e) {
      console.warn('Nominatim search error:', e);
      // Filter from local presets if offline or rate limited
      return this.TAMIL_NADU_PRESETS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  // Free OSRM Routing Engine for driving directions & coordinates
  async calculateRoute(stops) {
    if (!stops || stops.length < 2) throw new Error('At least 2 points are needed for route');
    const coordString = stops.map(s => `${s.lon},${s.lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson&steps=true`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('OSRM routing request failed');
      const data = await res.json();

      if (!data.routes || data.routes.length === 0) {
        throw new Error('No route found between selected areas');
      }

      const primaryRoute = data.routes[0];
      const distanceKm = (primaryRoute.distance / 1000).toFixed(1);
      const durationMins = Math.round(primaryRoute.duration / 60);

      // Extract sampled corridor points along the route for dense rain tracking
      const corridorWaypoints = this.extractCorridorWaypoints(stops, primaryRoute);

      return {
        distanceKm,
        durationMins,
        geojson: primaryRoute.geometry,
        corridorWaypoints,
        stops
      };
    } catch (err) {
      console.warn('OSRM failed, falling back to direct geometric interpolation:', err);
      return this.generateInterpolatedRoute(stops);
    }
  },

  extractCorridorWaypoints(stops, route) {
    // Generate waypoints with travel timestamps
    const waypoints = [];
    let accumulatedTime = 0;
    const totalDuration = route.duration / 60; // minutes

    stops.forEach((stop, index) => {
      if (index === 0) {
        waypoints.push({
          ...stop,
          type: 'origin',
          travelMinutesFromStart: 0
        });
      } else {
        // Proportionate time
        const fraction = index / (stops.length - 1);
        accumulatedTime = Math.round(fraction * totalDuration);
        waypoints.push({
          ...stop,
          type: index === stops.length - 1 ? 'destination' : 'detour',
          travelMinutesFromStart: accumulatedTime
        });
      }
    });

    return waypoints;
  },

  generateInterpolatedRoute(stops) {
    // Simple fallback if OSRM is unreachable
    const coords = stops.map(s => [s.lon, s.lat]);
    let totalDist = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      totalDist += this.haversineDistance(stops[i].lat, stops[i].lon, stops[i+1].lat, stops[i+1].lon);
    }
    const durationMins = Math.round(totalDist * 2.2); // ~27 km/h city sales travel average

    return {
      distanceKm: totalDist.toFixed(1),
      durationMins,
      geojson: {
        type: 'LineString',
        coordinates: coords
      },
      corridorWaypoints: stops.map((s, i) => ({
        ...s,
        travelMinutesFromStart: Math.round((i / (stops.length - 1)) * durationMins)
      })),
      stops
    };
  },

  haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
};
