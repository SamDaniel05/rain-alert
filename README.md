# MazhaiAlarm (மழை அலாரம்) 🌧️⏰
### Smart Rain & Route Alarm for Field Sales in Tamil Nadu

A modern, responsive, 100% free web app and installable PWA designed specifically for sales reps and commuters who travel across multiple corridors in Tamil Nadu (Chennai, Coimbatore, Madurai, etc.) during the Northeast Monsoon season.

---

## 🌟 Key Features

1. **Daily Sales Route & Detour Planner**
   - Pre-configured corridors for Tamil Nadu (Wimco Nagar, Adyar, Kelambakkam, Sholinganallur, Pallikaranai, Kovalam, etc.).
   - Calculate road routes via Open Source Routing Machine (OSRM).
   - Easily add, reorder, or remove intermediate stops/detours.

2. **Arrival-Time Rain Forecasting**
   - Rather than just current weather, MazhaiAlarm predicts rain **at the exact estimated time of arrival** at each stop.
   - Integrates with Open-Meteo API (ECMWF & global models) for precipitation probability, rain volume (mm), and thunderstorm risk.

3. **Smart Morning Rain Alarms**
   - Wake-up or pre-departure alarm (e.g. 06:50, 07:15, 07:45 AM).
   - Rings with synthesized audio chords or heavy rain sirens.
   - Uses Web Speech synthesis to verbally announce the rain risk and gear recommendations before leaving home.

4. **Live GPS Quick Check**
   - Instant 1-tap check of current weather, temperature, humidity, and a 24-hour precipitation probability chart.

5. **Desktop & Mobile Simulator Mode**
   - Toggle between responsive wide view and a simulated smartphone frame for rapid desktop development and testing.

6. **100% Free Architecture**
   - **Weather**: Open-Meteo API (No API keys or costs).
   - **Routing**: OSRM (Open Source Routing Machine).
   - **Geocoding**: OpenStreetMap Nominatim.
   - **Maps**: Leaflet.js with OSM tiles.
   - **Sound & Speech**: Native Web Audio & Speech APIs.

---

## 📱 How to Build an Android App Bundle (.aab) for Google Play Store

Because MazhaiAlarm is built with a standard PWA manifest (`manifest.json`) and service worker (`sw.js`), you can package it into an `.aab` for the Play Store using either **Bubblewrap (TWA)** or **Capacitor**.

### Method 1: Using Bubblewrap (Google's Official PWA to AAB CLI)

1. **Install Bubblewrap CLI**:
   ```bash
   npm i -g @bubblewrap/cli
   ```

2. **Initialize from your live GitHub Pages URL**:
   ```bash
   bubblewrap init --manifest="https://samdaniel05.github.io/rain-alert/manifest.json"
   ```

3. **Build the Android App Bundle (.aab)**:
   ```bash
   bubblewrap build
   ```
   This will generate a signed `app-release-bundle.aab` ready for upload to the Google Play Console!

---

### Method 2: Using Capacitor

1. In the project directory:
   ```bash
   npm init -y
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "MazhaiAlarm" "com.samdaniel.mazhaialarm" --web-dir "."
   npx cap add android
   npx cap open android
   ```
2. In Android Studio, go to **Build > Generate Signed Bundle / APK > Android App Bundle (.aab)**.
