# Prompt: Pihu's Birthday Surprise Website

Paste everything below into Claude Code (or Cursor / any coding agent) and run it from inside `C:\Users\saksh\OneDrive\Desktop\P_birth`. The photo(s) are in the `photo` subfolder.

---

## ROLE AND GOAL

You are a senior creative front-end developer and motion designer. Build a surprise birthday website for my junior **Pihu**, whose birthday is on **3 November**. I am **Saksham**, her senior, and the site is from me. It must feel like a small interactive world, not a flat page: layered scenes, lots of motion, things that react to touch and mouse, and heartfelt writing. When she opens it, it should make her smile within the first five seconds and keep her exploring for several minutes.

## PROJECT SETUP

- Project folder: `C:\Users\saksh\OneDrive\Desktop\P_birth`
- Photos: `C:\Users\saksh\OneDrive\Desktop\P_birth\photo` (read every image in this folder, use all of them, and pick the best one for the hero and the "portrait" moments)
- Tech: plain **HTML + CSS + vanilla JavaScript**, no build step, so I can double-click `index.html` and it works offline. External libraries are allowed only through CDN and must degrade gracefully if offline. Preferred: **GSAP + ScrollTrigger** (animation), **canvas-confetti** (confetti), **Howler.js or the native Audio API** (sound). Three.js is optional for the background particle scene.
- File structure:
  ```
  P_birth/
    index.html
    css/style.css
    js/main.js
    js/scenes.js
    assets/audio/   (placeholder music + sfx, see Sound section)
    photo/          (already exists)
  ```
- The site must also be deployable as static files (GitHub Pages or Netlify) so I can send her a link. Add a short `README.md` explaining how to open it, how to deploy it, and where to edit names, messages and dates.
- Keep all editable text (messages, blessings, names, memories) in one `config` object at the top of `main.js` so I can change wording without touching the layout.

## DESIGN DIRECTION

- Mood: dreamy, warm, magical-night-sky meets pastel party. Think soft glow, floating lights, paper-craft layers.
- Palette (use CSS variables): deep midnight indigo `#1b1035`, plum `#3a1c5c`, rose pink `#ff7eb6`, peach `#ffb58a`, butter gold `#ffd86b`, mint `#8ff0d0`, cream `#fff7ee`.
- Typography (Google Fonts): a handwritten script for big wishes (`Dancing Script` or `Great Vibes`), a rounded friendly sans for body (`Poppins` or `Nunito`), a display face for headings (`Playfair Display` or `Fredoka`). Sizes fluid with `clamp()`.
- Style: glassmorphism cards with blurred backgrounds, soft gradients, gentle drop shadows, rounded corners (24px+), subtle grain overlay.
- **Mobile first.** She will almost certainly open this on her phone. Design for 360 to 430px wide first, then scale up to tablet and desktop. All touch targets at least 48px. No horizontal scroll. Test with `100dvh` to avoid mobile browser bar issues.
- Respect `prefers-reduced-motion`: reduce heavy motion but keep the experience nice.

## EXPERIENCE STRUCTURE (multi-layer, scene by scene)

The site is a journey of **8 scenes**. Navigation is by tapping/swiping/scrolling, with a persistent progress indicator (small floating balloons or dots) and a mute/unmute button. Scenes transition with smooth effects (curtain reveal, circular wipe, fade-through-sparkles), never a hard cut.

### Scene 0: Locked Gift (entry gate)
- Dark starry background with slowly twinkling stars and a drifting gradient aurora.
- A single wrapped gift box in the center, gently floating and glowing, with the text "Something is waiting for you, Pihu".
- She has to **tap and hold** (or tap 3 times) to open it. On each tap the box shakes more and ribbons loosen. On the final tap, the box bursts open with confetti, light rays and a soft "pop" sound, and the scene transitions into the next one.
- This tap is also the user interaction that allows background music to start (browsers block autoplay), so start the music here.
- Add a tiny hint under the box: "tap the gift".

### Scene 1: Countdown and Hello
- A big animated countdown to **3 November 00:00** (local time, year auto-detected). If the date has already arrived or passed, show "Today is the day!" with a celebration burst instead. Make the countdown flip digits in a stylish way.
- Under it, a typewriter line: "Hey Pihu, I made something for you."
- Floating balloons rise from the bottom continuously. **Balloons are clickable**: popping one releases confetti, a pop sound, and sometimes reveals a tiny word ("smile", "shine", "dream", "laugh").
- Cursor/touch trail of sparkles follows her finger or mouse.

### Scene 2: The Portrait Reveal
- Her photo appears inside a decorative frame (rounded, with a glowing gradient border that rotates slowly), surrounded by orbiting stars, hearts and tiny flowers on circular paths.
- Reveal animation: starts as a blurred, dark silhouette and sharpens as she scrolls/taps, like a polaroid developing.
- Headline in script font: "Happy Birthday, Pihu!" with letters dropping in one by one and a golden shimmer sweeping across.
- Subtext: "3rd November, a very good day to be born."
- Subtle 3D tilt on the photo that responds to mouse movement or phone gyroscope (with permission fallback to touch drag).
- If there are several photos, create a swipeable stack of polaroids that she can flick through, each slightly rotated, with a short caption.

### Scene 3: Wishes Sky (interactive night sky)
- A night sky full of stars. Some stars glow brighter. **Tapping a star** opens a floating glass card with one wish or blessing, then the star turns into a shooting star and flies away.
- Write at least **12 wishes**, each different in tone (funny, warm, ambitious, calm). Examples of themes: success in studies, good health, strong friendships, the confidence to speak up, peaceful exams, a trip she has been wanting, always having good chai, laughing until her stomach hurts, never losing her curiosity.
- A counter "Stars found: 4/12". When all are found, the constellation connects into a **heart** or the letter **P**, with a satisfying chime.

### Scene 4: Message from Saksham (the heart of the site)
- A long-form personal message, shown like a letter on warm paper, revealed paragraph by paragraph as she scrolls, with a soft ink-writing effect on key lines.
- Tone: sincere, a senior speaking to a junior he is proud of. Warm, a bit playful, not overly dramatic. Include a clear placeholder system so I can add real memories: `{{memory_1}}`, `{{memory_2}}`, `{{inside_joke}}`.
- Write a full first draft of this letter (around 250 to 350 words) in the `config` object. It should cover: how I noticed her talent and effort, the kind of person she is, a promise that I am always around if she needs help, and a wish for the year ahead. Keep the language simple, natural, Indian-English friendly. Avoid cliché-heavy phrases.
- End with a handwritten-style signature "— Saksham" that draws itself with an SVG stroke animation.

### Scene 5: Blessings Garden
- A lush animated garden (CSS/SVG) where flowers grow when she taps the ground. Each flower that blooms carries a **blessing** on its petals, for example: "May your confidence grow faster than your to-do list", "May every hard day end with a good meal and a good laugh".
- Fireflies drift around and gently move away from her cursor/finger.
- Day and night mix: soft golden-hour lighting that slowly shifts.
- Min 8 blessings, with a counter and a small reward animation (butterflies fly out) when all are bloomed.

### Scene 6: Memory Lane / Things We Love About Pihu
- A horizontal scroll or a stacked deck of cards. Each card flips on tap: front shows an emoji and a short trait ("Her laugh", "Her focus", "Her kindness", "Her chaos"), back shows a one or two line sentence.
- Include a **mini game**: "Catch the Cake Slices". Falling cake slices, hearts and stars; she moves a plate left/right (touch drag or mouse) to catch them for 20 seconds. Score displayed. Whatever the score, end with a cheerful message ("New high score in being awesome"). Keep the game simple, smooth and forgiving.

### Scene 7: Cake and Finale
- A beautiful animated cake (SVG/CSS) with candles. She **blows on the screen** using the microphone (Web Audio API, ask permission politely) OR taps the candles to extinguish them. Provide the tap fallback always.
- When the candles go out: smoke wisps, "make a wish" moment, a pause of one second, then a huge finale: fireworks over the night skyline, confetti cannons from both corners, floating lanterns, and the final text "Happy Birthday, Pihu. Have the best year yet."
- Below the finale: a small "Replay the journey" button, a "Send a reply to Saksham" button (opens WhatsApp / mailto with a prefilled text, number and email placeholders in `config`), and a "Save this as a wallpaper" button that downloads her portrait composed with the birthday text as a PNG using canvas.

## INTERACTIVE AND "REACTIVE" ELEMENTS (must include)

1. Sparkle cursor trail (desktop) and tap ripples (mobile).
2. Parallax layers that respond to mouse position and device tilt.
3. Magnetic buttons that lean towards the cursor.
4. Clickable balloons, stars, flowers, candles, cards.
5. Elements that react to scroll speed (stars streak slightly when she scrolls fast).
6. Hidden **easter eggs**: tapping the photo 5 times makes it wink with a heart burst; typing "pihu" on a keyboard triggers a surprise confetti rain; long-pressing the title shows a secret message "You found the secret. Chai is on me."
7. Time-aware greeting: if she opens it at night, show "Late night surprise!", in the morning "Good morning, birthday girl!" (for 3 November) and so on.
8. A small floating mascot (a cute star or paper plane character) that follows her around and says short things at the right moments.

## SOUND

- Background music: soft instrumental loop, volume 20 to 30 percent, fades in and out between scenes. Use a royalty-free track; put a clear `TODO` in `README.md` telling me exactly which file to drop in `assets/audio/` (`bg.mp3`) and fall back silently if the file is missing.
- SFX: pop (balloon), chime (star), whoosh (transition), sparkle (flower), soft blow (candle), fireworks.
- Always provide a visible mute button, defaulting to music on after her first tap.

## PERFORMANCE AND QUALITY

- Must run at 60fps on a mid-range Android phone. Use `transform` and `opacity` for animation, `will-change` sparingly, cap particle counts on mobile, pause animations when the tab is hidden.
- Preload photos, show a pretty loader ("Wrapping your gift...") with a progress bar.
- Compress or size images with `srcset` or `object-fit`, and use `loading="lazy"` for off-screen ones.
- Accessible: semantic HTML, alt text for images, focus styles, keyboard navigation for every interaction, ARIA labels on buttons, sufficient color contrast on text.
- Works in Chrome, Safari (iOS), Firefox and Edge. No console errors.
- Clean, commented code, with each scene in its own function in `scenes.js` (`initScene0()` ... `initScene7()`), shared helpers in `main.js`.

## CONTENT RULES

- Write all copy yourself, in a warm, natural voice that sounds like a real person, not a greeting card. Avoid stock phrases like "may all your dreams come true" unless twisted into something specific or funny.
- Mix English with a light touch of Hinglish in a couple of playful lines (for example "Birthday girl ban gayi aaj!"), controlled by a `config.useHinglish` flag.
- Never use any placeholder lorem ipsum. Everything on screen must be real, finished text.
- Keep every message short enough to read on a phone without scrolling inside the card.

## EDGE CASES TO HANDLE

- Photo folder empty or a file fails to load: show a decorative placeholder frame with her initial "P" and a console warning.
- Microphone permission denied: fall back to tapping the candles.
- Audio blocked or missing: continue silently.
- Very small screens (320px) and landscape phones.
- Reload mid-way: remember the furthest scene reached using `localStorage` and offer "Continue where you left off".

## DELIVERABLES

1. All files created in the project folder, fully working.
2. A short `README.md` with: how to run, how to edit text, where to place the music, how to deploy on GitHub Pages or Netlify.
3. After building, run the site locally, check every scene, fix any bug you find, and give me a checklist of what you tested.

## ORDER OF WORK

1. Look at the photos first and describe them briefly, then choose the hero image.
2. Build the skeleton and design system (colors, fonts, layout, transitions).
3. Build scenes 0 to 7 one at a time, testing each before moving on.
4. Add sound, easter eggs and the polish pass.
5. Final performance and mobile check.

Ask me before starting only if something truly blocks you (for example, the photo folder is unreadable). Otherwise make good creative decisions and go.
