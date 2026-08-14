# ✦ Cosmic Kundali — Architect of Cosmic Destiny

> A high-precision, client-side **Vedic Birth Chart (Kundali) Generator** built with pure HTML, CSS, Vanilla JavaScript, NASA Astronomy Engine, and optional Supabase Database integration.

![Cosmic Kundali Preview](https://img.shields.io/badge/Vedic_Astrology-Lahiri_Ayanamsa-gold?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Offline Capable](https://img.shields.io/badge/Offline-100%25_Supported-success?style=for-the-badge)

---

## ✨ Features

- **✦ Complete Celestial Theme**: Dark violet & gold design system with starfield particle animations and spinning mandala chart.
- **✦ NASA-Grade Astronomical Precision**: Uses [`astronomy-engine`](https://www.npmjs.com/package/astronomy-engine) for VSOP87 planetary calculations + IAU Lahiri Ayanamsa.
- **✦ 12-Hour & Date Selectors**: Intuitive Day/Month/Year and 12-Hour AM/PM dropdown selectors for effortless birth detail input.
- **✦ Interactive SVG Kundali Chart**: North-Indian style birth chart with real-time house placements, exaltation/debilitation color keys, and retrograde markers.
- **✦ 5 In-Depth Narrative Pillars**:
  1. **Overview**: Lagna, Moon Sign, Nakshatra Pada, Deities, and Yoga Detection.
  2. **Career & Karma**: 10th House analysis, career suitability, and Dasha period timings.
  3. **Love & Union**: 7th House, Venus placement, and romantic compatibility indicators.
  4. **Health & Vitality**: 6th/8th House constitution, body architecture, and stress indicators.
  5. **Wealth / Artha**: 2nd & 11th House analysis, financial compounding, and remedies.
- **✦ Planetary Yogas & Ashtakavarga**: Automated detection of Gajakesari, Budhaditya, Ruchaka, Bhadra, Hamsa, Malavya, Shasha, and Kaal Sarp Yogas + Sarvashtakavarga house scores.
- **✦ 100% Offline & Private**: Zero required external APIs, zero data tracking.
- **✦ Supabase Database Integration**: Optional 1-click chart saving to Supabase REST API (`kundali_charts` table).

---

## 🧮 Essential Astronomical & Astrological Calculations

Cosmic Kundali uses pure mathematical algorithms to derive authentic Vedic Sidereal (Nirayana) charts:

1. **Julian Day Number ($JD$) & UT Conversion**:
   - Converts Gregorian date and 12-Hour/24-Hour birth time into Astronomical Julian Day Number ($JD$).
   - Computes Universal Time ($UT$) by applying local longitude-derived time offset ($TZ = -lng / 15$).

2. **Chitrapaksha / Lahiri Ayanamsa**:
   - Calculates precise Sidereal Ayanamsa for the birth epoch:
     $$\text{Ayanamsa} = 23.85^\circ + 0.01396^\circ \times \frac{JD - 2451545.0}{365.25}$$
   - Converts Tropical positions to Sidereal ($Nirayana$):
     $$\text{Sidereal Longitude} = (\text{Tropical Longitude} - \text{Ayanamsa}) \pmod{360^\circ}$$

3. **Planetary Ephemeris Calculations**:
   - High-precision orbital positions for **Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu (North Node), and Ketu (South Node)**.
   - Calculates true lunar nodes ($\text{Ketu} = (\text{Rahu} + 180^\circ) \pmod{360^\circ}$).

4. **Ascendant (Lagna) Sign & Degree**:
   - Computes Local Sidereal Time ($LST$) from $JD$ and birth longitude:
     $$LST = (100.46^\circ + 0.985647366^\circ \times D + \text{longitude} + 15 \times UT) \pmod{360^\circ}$$
   - Solves for Tropical Ascendant ($\tan \text{Asc} = \frac{\cos LST}{-\sin LST \cos \epsilon - \tan \phi \sin \epsilon}$) where $\phi$ is birth latitude and $\epsilon$ is Earth's true obliquity ($23.4393^\circ$).
   - Subtracts Lahiri Ayanamsa to derive the exact **Sidereal Lagna Sign & Degree**.

5. **27 Nakshatras & 4 Padas System**:
   - Maps Moon's Sidereal Longitude into 27 Nakshatras ($13^\circ 20'$ per Nakshatra):
     $$\text{Nakshatra Index} = \left\lfloor \frac{\text{Moon Lon}}{13.33333^\circ} \right\rfloor$$
   - Determines exact Pada (quarter, $3^\circ 20'$ each) and ruler deity.

6. **120-Year Vimshottari Dasha Balance**:
   - Computes exact remaining balance of birth Mahadasha based on Moon's position inside its Nakshatra.
   - Generates complete timeline sequence for all 9 Mahadashas (Ketu: 7y, Venus: 20y, Sun: 6y, Moon: 10y, Mars: 7y, Rahu: 18y, Jupiter: 16y, Saturn: 19y, Mercury: 17y) and nested Antardashas.

7. **Vedic Planetary Yogas Detection**:
   - **Gajakesari Yoga**: Jupiter in Kendra ($1, 4, 7, 10$) from Moon.
   - **Budhaditya Yoga**: Sun and Mercury conjunct in the same Rashi.
   - **Pancha Mahapurusha Yogas**: Exalted/Own sign Kendra placements for Mars (Ruchaka), Mercury (Bhadra), Jupiter (Hamsa), Venus (Malavya), Saturn (Shasha).
   - **Kaal Sarp Yoga**: All 7 major planets enclosed between Rahu and Ketu nodes.

8. **Sarvashtakavarga (AV Point System)**:
   - Computes 8-fold Ashtakavarga score (0–56 range) across all 12 Rashi houses for strength analysis.

9. **Global & 400+ Indian Cities Geocoding**:
   - Built-in database for 400+ Indian cities + live OpenStreetMap Nominatim Geocoding API for 100% location coverage.

---

## 🛠️ Project Structure

```
cosmic-kundali/
├── index.html            # Main web application entry point (Full inline CSS + JS)
├── kundali.html          # Single-file standalone offline version
├── package.json          # Node dependencies (Vite & astronomy-engine)
├── vite.config.js        # Vite bundler configuration
├── .gitignore            # Git exclusion rules
├── .env.example          # Environment variables template
└── src/
    ├── styles.css        # Complete CSS design system & tokens
    ├── main.js           # Main application orchestration & UI event handling
    ├── astro-engine.js   # Astronomical planetary & house calculations
    ├── chart.js          # SVG North-Indian chart rendering engine
    ├── content.js        # Dynamic narrative text generator for 5 tabs
    ├── prokerala-api.js  # Optional Prokerala API Swiss Ephemeris connector
    └── supabase.js       # Supabase Database chart save/load API
```

---

## 🚀 Quick Start

### Option 1: Standalone Offline (No installation needed)
1. Double-click **`index.html`** or **`kundali.html`** in any web browser.
2. Enter your birth details and click **Cast My Kundali**.

### Option 2: Local Development with Vite
```bash
# Clone the repository
git clone https://github.com/adm04/cosmic-kundali.git
cd cosmic-kundali

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## ☁️ Supabase Setup (Optional Chart Storage)

To enable 1-click chart saving:
1. Create a free project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env` and fill in your details:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Run the following table creation query in Supabase SQL Editor:
   ```sql
   create table kundali_charts (
     id uuid default gen_random_uuid() primary key,
     name text,
     gender text,
     dob text,
     tob text,
     place text,
     lagna_sign text,
     moon_sign text,
     sun_sign text,
     moon_nak text,
     lagna_nak text,
     chart_data jsonb,
     created_at timestamptz default now()
   );
   ```

---

## 📜 License

Distributed under the MIT License. Built with passion for Vedic Astrology and Modern Web Design.
