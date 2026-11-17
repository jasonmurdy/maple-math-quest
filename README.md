# 🍁 Maple Math Quest — Canadian K–6 Offline Math Android Game

**Maple Math Quest** is a 100% offline, child-friendly mobile math adventure game built for Android devices and tablets. It is structured around the **Pan-Canadian Common Curriculum Framework & Ontario 2020 Elementary Mathematics Curriculum (Kindergarten to Grade 6)**.

---

## 🌟 Key Features

### 1. Canadian Grade Level Framework (Kindergarten to Grade 6)
Each grade level features a Canadian wildlife companion, regional setting, and age-appropriate curriculum expectations across all **5 official Canadian Math Strands**:
- **Strand B — Number Sense**: Subitizing & Ten-Frames (K–1), Base-10 Place Value (G2–4), Multiplication/Division Arrays (G3–5), Equivalent Fractions & Decimals (G4–5), and Integers on a Number Line in `°C` (G6).
- **Strand C — Algebra & Patterns**: Repeating visual patterns (K), skip counting (G1), balance-scale missing addends/factors (G2–3), linear growing patterns (G4), two-step algebraic equations (G5), and BEDMAS Order of Operations (G6).
- **Strand D — Data & Probability**: Pictographs & bar graphs (K–2), finding the Mean by fair-share levelling (G3), Median of ordered data (G4), probability fractions (G5), and ratios/percents (G6).
- **Strand E — Spatial Sense & Measurement**: 2D shapes & attributes (K), analog clocks to the hour/half-hour (G1), visual fraction bars (G2), metric (`cm`, `m`, `cm²`, `m²`) perimeter & area grids (G3–4, G6), and angle classification (G5).
- **Strand F — Financial Literacy (Canadian Currency)**: Recognizing and counting the **Nickel (5¢ Beaver)**, **Dime (10¢ Bluenose)**, **Quarter (25¢ Caribou)**, **Loonie ($1 Loon)**, **Toonie ($2 Polar Bear)**, and **Canadian Polymer Bills ($5, $10, $20)**, plus making change, unit rates, and Canadian **13% / 15% HST** calculations.

### 2. Child-Centric UI & Interactive Visual Manipulatives
- **Tap-to-Count Ten-Frames & Double Ten-Frames**
- **Interactive Base-10 Blocks** (Hundreds Flats, Tens Rods, Ones Units)
- **Visual Fraction Strips & Comparison Bars**
- **Interactive Canadian Coins & Bills Tray**
- **Free-Play Math Lab** for open-ended exploration with Ten-Frames, Base-10 blocks, and a Canadian Money Bank
- **Non-Punitive Gentle Hints**: Wrong answers never punish the learner; they gently highlight a visual hint and read it aloud
- **100% Offline Audio & Read-Aloud**: Built-in WebAudio synthesizer for cheerful musical chimes and offline Web Speech API voice read-aloud (`🔊`) for early readers

### 3. Multiple Kid Profiles, Sticker Book & Parent/Teacher Dashboard
- **Multiple Learner Profiles** stored locally on the device (`localStorage`)
- **12 Collectible Canadian Wildlife & Heritage Stickers**
- **Parent & Teacher Curriculum Mastery Matrix** tracking stars and accuracy across all 35 Grade × Strand combinations

---

## 🚀 Playing Immediately & Building the Offline Android APK

### Option A: Play Immediately on Desktop or Mobile Browser (Zero Install)
Open `www/index.html` directly in any modern browser, or install as an offline PWA (Progressive Web App) on Android via Chrome's **"Add to Home Screen / Install App"**.

### Option B: Build Native Offline Android APK with Capacitor
When Node.js and Android Studio are installed on your machine:
```bash
npm install
npx cap sync android
npx cap open android
```
Or build the debug APK directly from the command line:
```bash
npm run android:build
```
Note: The `AndroidManifest.xml` intentionally omits `android.permission.INTERNET` so the app is guaranteed 100% offline and privacy-safe for children.
