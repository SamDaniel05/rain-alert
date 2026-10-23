# MazhaiAlarm (மழை அலாரம்) 🌧️⏰
### Continuous 5-Minute Route Rain Sentinel & Alarms for Field Sales in Tamil Nadu

A modern, responsive, 100% free web app and installable PWA designed specifically for sales professionals and commuters who cover 10+ areas daily across Tamil Nadu (Chennai, Coimbatore, Madurai, etc.) during the Northeast Monsoon season.

---

## 🌟 Key Features

1. **Continuous 5-Minute Route Rain Sentinel**
   - When heading out for field visits, tap **"Start Shift"**.
   - MazhaiAlarm continuously polls weather along your remaining stops **every 5 minutes** (or 3m / 10m).
   - Shows live countdown to the next radar scan (`Next scan in: 04:32`).
   - Uses **Screen Wake Lock API** to keep the phone screen awake on bike/car mounts while traveling.

2. **Dynamic Alarm, Vibration & Voice Advisory**
   - If sudden rain develops or rain probability exceeds your threshold (default 35%), it triggers:
     - 🔊 **Offline Sound Alarm**: Synthesized siren or pleasant chime via Web Audio API.
     - 📳 **Vibration**: Mobile haptic pulse alert.
     - 🗣️ **Voice Speech Announcement**: "Attention! Rain detected on your route around Pallikaranai. Rain probability is 75 percent. Please take shelter or put on rain gear."
     - 📱 **System Push Notification**.

3. **Daily Route & Detour Planner with Visited Checklist**
   - Origin: Wimco Nagar (Home Base), Destination: Kelambakkam.
   - Add/remove unlimited intermediate sales stops (e.g. Adyar, Pallikaranai, Kovalam, Sholinganallur).
   - Check off stops as **"Visited"** as you complete sales meetings. The 5-minute sentinel automatically focuses on the remaining unvisited stops ahead of you.

4. **Arrival-Time Rain Forecasting**
   - Powered by **Open-Meteo API** (ECMWF & global high-resolution models).
   - Predicts precipitation probability (%), rain intensity (mm), and thunderstorm risk at your estimated arrival time at each stop.

5. **Responsive Design for Mobile & Desktop**
   - **Mobile**: Native app interface with top sticky Sentinel status bar and thumb-friendly bottom navigation bar.
   - **Desktop**: Dual-pane layout (Left: Route & Controls; Right: Interactive Leaflet Map with rain radar circles).
   - Includes a **Desktop Mobile Simulator Toggle** button for rapid mobile testing in your desktop browser.

6. **100% Free Architecture (Zero Paid APIs)**
   - **Weather**: Open-Meteo API (No API keys or credit card needed).
   - **Routing**: Open Source Routing Machine (OSRM).
   - **Geocoding**: OpenStreetMap Nominatim.
   - **Map**: Leaflet.js with OSM tiles.
   - **Sound & Speech**: Native Web Audio & Web Speech APIs.

---

## 📱 How to Build an Android App Bundle (.aab) for Google Play Store

MazhaiAlarm is configured as a Progressive Web App (PWA) with `manifest.json` and `sw.js`. You can package it into a production `.aab` for the Google Play Store using either **Bubblewrap (Google's official CLI)** or **Capacitor**.

### Method 1: Google Bubblewrap (Fastest & Easiest)

1. **Install Bubblewrap CLI**:
   ```bash
   npm i -g @bubblewrap/cli
   ```

2. **Initialize directly from your live GitHub Pages URL**:
   ```bash
   bubblewrap init --manifest="https://samdaniel05.github.io/rain-alert/manifest.json"
   ```

3. **Build the Android App Bundle (.aab)**:
   ```bash
   bubblewrap build
   ```
   This generates an `app-release-bundle.aab` ready for upload to the **Google Play Console**!

---

### Method 2: Capacitor

1. In the project folder:
   ```bash
   npm init -y
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "MazhaiAlarm" "com.samdaniel.mazhaialarm" --web-dir "."
   npx cap add android
   npx cap open android
   ```
2. In Android Studio, select **Build > Generate Signed Bundle / APK > Android App Bundle (.aab)**.
