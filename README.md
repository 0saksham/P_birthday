# 🎂 Pihu's Birthday Surprise Website ✨

An interactive, responsive, animated birthday surprise web application crafted by **Saksham** for **Pihu** (Birthday: **3rd November**).

---

## 🌟 Features Included

1. **Scene 0: Locked Gift (Entry Gate)**
   - Starry night with glowing aurora background.
   - Central wrapped gift box with tap-progress animation (shakes on tap 1 & 2, bursts open with celebratory confetti on tap 3).
   - Starts audio playback cleanly without triggering browser autoplay blockers.

2. **Scene 1: Countdown & Hello**
   - Live countdown timer to **3rd November 00:00** (auto-detects current/next year, or displays a grand celebration burst if today is 3rd November).
   - Smooth typewriter greeting: *"Hey Pihu, I made something for you..."*.
   - Floating interactive balloons that pop on click/tap with sound and reveal hidden affirmation words (*shine, dream, laugh, superstar...*).

3. **Scene 2: The Portrait Reveal**
   - Polaroid developing effect showing the authentic photo of Saksham and Pihu at Graphic Era Hill University (Navsrijan Ideathon).
   - Orbiting stars, flowers, and hearts.
   - Interactive 3D tilt responding to mouse coordinates or device orientation.
   - Easter egg: tapping the photo 5 times triggers a winking heart burst!

4. **Scene 3: The Wishes Sky**
   - Interactive night sky containing **12 glowing stars**.
   - Tapping each star plays a celestial chime, launches a shooting star animation, and opens a glass modal revealing a personalized blessing.
   - Live counter (`X/12`); when all 12 are found, a constellation lines overlay forms the letter **'P'** and a heart.

5. **Scene 4: Heartfelt Letter from Saksham**
   - Personal letter on warm parchment with progressive paragraph reveal and highlighted memory tokens (`{{memory_1}}`, `{{memory_2}}`, `{{inside_joke}}`).
   - SVG cursive signature drawing itself dynamically (*"— Saksham"*).

6. **Scene 5: The Blessings Garden**
   - Lush garden with night/day shift and hovering fireflies.
   - Tapping the soil plants and blooms animated flowers carrying blessings on their petals.
   - Reward confetti & butterfly release when all blessings are grown.

7. **Scene 6: Memory Lane & Mini-Game**
   - 3D flip cards highlighting traits (*Her Energy, Her Focus, Her Kindness, Chai Partner, Quick Wit, True Potential*).
   - Interactive 20-second **"Catch the Cake Slices"** mini-game with live score, catcher plate, touch/mouse dragging, and a cheering ending screen.

8. **Scene 7: Birthday Cake & Grand Finale**
   - Animated multi-tier birthday cake with flickering candles.
   - Extinguish candles either by **blowing into the microphone** (Web Audio API) or by tapping the candles directly.
   - Smoke wisps followed by fireworks sky extravaganza, dual-corner confetti cannons, and the finale message.
   - Action buttons:
     - 🔄 **Replay Journey**
     - 💬 **Send a Reply to Saksham** (prefilled WhatsApp link)
     - 📱 **Save as Wallpaper** (composes a high-res 9:16 phone wallpaper via HTML5 Canvas and downloads as PNG).

9. **Atmospheric & Easter Eggs**
   - Ambient twinkling & shooting stars canvas.
   - Sparkle cursor trail on desktop and ripple effects on mobile.
   - Floating cute guide mascot (**Tara the Star**) with interactive speech bubbles.
   - Time-aware greeting badge (*Late night surprise*, *Good morning*, etc.).
   - Type `"pihu"` on keyboard anywhere to trigger a surprise confetti rain!
   - Long-press the portrait heading for a secret message (*"Chai is on Saksham!"*).
   - Synthetic Web Audio API engine providing music and SFX with zero external dependencies, plus automatic loading of `assets/audio/bg.mp3` if placed.

---

## 🚀 How to Run Locally

### Option 1: Double Click
Simply double-click `index.html` in Windows Explorer. It opens right away in Chrome, Edge, Firefox, or Safari with full functionality!

### Option 2: Local HTTP Server (Recommended for testing mic)
Using PowerShell:
```powershell
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

---

## 🛠️ How to Customize Text & Config

Open [`js/main.js`](file:///C:/Users/saksh/OneDrive/Desktop/P_birth/js/main.js) in your text editor. Everything is conveniently grouped at the very top under `CONFIG`:

```javascript
const CONFIG = {
  recipientName: "Pihu",
  senderName: "Saksham",
  birthdayDay: 3,
  birthdayMonth: 11, // November
  
  // Change Saksham's WhatsApp phone number for the finale reply button (include country code without +):
  whatsappNumber: "919999999999",

  // Memories & inside jokes inserted into the letter:
  memories: {
    memory_1: "the Navsrijan Ideathon days at Graphic Era...",
    memory_2: "how you always ask the most insightful questions...",
    inside_joke: "the endless post-event chai debates on who worked harder"
  },
  ...
};
```

---

## 🎵 Background Music

The background track (*"O Meri Zohrajabeen"*) from your `BGM/` folder has been copied to `assets/audio/bg.mp3` and configured.

- It begins playing as soon as Pihu interacts with the site (unwrapping the gift box or tapping the screen).
- The volume is smoothly set to an ambient 35% so reading and exploring remain comfortable.
- She can easily mute/unmute at any point using the 🎵 / 🔇 button in the top-right corner.
- If the audio is ever removed or inaccessible, the built-in procedural Web Audio synthesizer automatically takes over seamlessly.

---

## 🌐 How to Deploy for Pihu

### Deploy on GitHub Pages (Free & Fast):
1. Create a new GitHub repository (e.g. `pihu-birthday`).
2. Push or upload all files from `P_birth/` into the repo.
3. In GitHub, go to **Settings > Pages > Branch: main / root > Save**.
4. Within 1 minute, you will get a live URL (e.g. `https://saksham.github.io/pihu-birthday/`) to share with Pihu!

### Deploy on Netlify (Drag and Drop):
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `P_birth` folder directly into the browser window.
3. Your site is live instantly with an HTTPS link!

---

Crafted with care for **Pihu** ✨
