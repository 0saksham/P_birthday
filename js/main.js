/**
 * ============================================================================
 * PIHU'S BIRTHDAY SURPRISE WEBSITE - CORE LOGIC & CONFIGURATION
 * Crafted with love by Saksham for Pihu | 3rd November
 * QA-fixed & upgraded version
 * ============================================================================
 */

// Global Configuration Object - Edit all texts, dates, and memories here
const CONFIG = {
  recipientName: "Pihu",
  senderName: "Saksham",
  birthdayDay: 3,
  birthdayMonth: 11, // November (1-indexed)
  useHinglish: true,

  // Photo settings (add more photos to this array for photo wall)
  photos: [
    {
      src: "photo/WhatsApp Image 2026-10-29 at 11.01.05 PM.jpeg",
      caption: "Memories @ GEHU - Unforgettable moments together! ✨",
      alt: "Saksham and Pihu at Graphic Era Hill University"
    }
  ],

  // Contact for finale reply button
  whatsappNumber: "918755354252", // ← REPLACE with your real WhatsApp number (91 + 10 digits)
  email: "sgodiyal00@gmail.com",
  whatsappMessage: "Hey Saksham! Just saw the birthday surprise website you made... it made my day! Thank you so much! ✨🎉",

  // Custom memories & inside jokes for letter
  memories: {
    memory_1: "when we first connected while you were in 1st year and I was in 2nd year, and how you've always stood firmly by me with true support",
    memory_2: "how you always bring thoughtful advice, honest questions, and true loyalty to everything",
    inside_joke: "our endless college discussions and post-class chai breaks"
  },

  // 12 distinct wishes for Scene 3 (The interactive night sky)
  wishes: [
    { id: 1, icon: "🎓", title: "Fearless Ambition", text: "May you conquer every presentation, project, and exam with effortless confidence." },
    { id: 2, icon: "☕", title: "Perfect Chai", text: "May your cup of chai always be hot, perfectly spiced, and just what you need after a long day." },
    { id: 3, icon: "🌟", title: "Unwavering Focus", text: "May you stay true to your spark, no matter how chaotic college gets." },
    { id: 4, icon: "😄", title: "Belly Laughs", text: "May you have days full of jokes so funny your stomach hurts from laughing." },
    { id: 5, icon: "🚀", title: "Endless Curiosity", text: "Never stop asking questions and building cool things. Your potential is limitless." },
    { id: 6, icon: "🌸", title: "Peaceful Mind", text: "May deadlines never stress you out, and your mind always remain calm and composed." },
    { id: 7, icon: "🤝", title: "Golden Friendships", text: "Surrounded always by friends who lift you higher and cheer the loudest for your wins." },
    { id: 8, icon: "💪", title: "Inner Strength", text: "The confidence to raise your hand, speak your truth, and lead the room." },
    { id: 9, icon: "✈️", title: "Dream Adventures", text: "May this year bring that travel trip you have been wishing to embark upon!" },
    { id: 10, icon: "💡", title: "Brilliant Ideas", text: "May fresh ideas hit you at just the right moment, turning every obstacle into an opportunity." },
    { id: 11, icon: "🍰", title: "Sweet Moments", text: "Extra desserts, zero guilt, and sweet little surprises waiting around every corner." },
    { id: 12, icon: "🏆", title: "Deserved Recognition", text: "May every bit of hard work and late-night preparation you put in get recognized in a big way." }
  ],

  // 8 Blessings for Scene 5 (Blessings Garden)
  blessings: [
    "May your confidence grow faster than your college to-do list. 🌿",
    "May every difficult day end with a good meal and a great laugh. 🍲",
    "May you always walk into rooms knowing you belong there. ✨",
    "May your code and ideas always run without unexpected bugs. 💻",
    "May you find joy in the smallest quiet moments. 🌼",
    "May self-doubt never stand between you and your dreams. 🌈",
    "May you always stay as genuine, kind, and sharp as you are. 🌸",
    "May this new year of your life be your boldest and happiest chapter yet. 🌻"
  ],

  // Personality Traits for Scene 6
  traits: [
    { emoji: "⚡", name: "Her Energy", desc: "Lights up the entire corridor and never does anything half-heartedly." },
    { emoji: "🎯", name: "Her Focus", desc: "When she decides to learn or solve something, consider it done." },
    { emoji: "💖", name: "Her Kindness", desc: "Always there with a genuine smile and a helping hand for everyone." },
    { emoji: "☕", name: "Chai Partner", desc: "Always ready for a tea break and an honest conversation." },
    { emoji: "🧠", name: "Quick Wit", desc: "Sharp replies, smart perspectives, and a great sense of humor." },
    { emoji: "🛡️", name: "Always in Support", desc: "Ever since 1st year, she has always stood with me and backed me up through thick and thin." }
  ],

  // Full letter draft from Saksham to Pihu (Scene 4)
  letter: {
    salutation: "Hey Pihu,",
    paragraphs: [
      "Happy Birthday! Today is all about celebrating you. Looking back to when we first connected—when you were in 1st year and I was in 2nd year—I wanted to take a moment to tell you how truly grateful and proud I am to have you as my younger sister in college.",
      "Right from the start, you've always stood firmly with me. Whenever things were tough or chaotic, you always came forward in support without a second thought. {{memory_1}}. Having someone so loyal, genuine, and grounded in your corner is a blessing, and {{memory_2}}.",
      "College life and the journey ahead can have its hectic days, submissions, and {{inside_joke}}. But remember: your strength, kindness, and calm resilience speak louder than any stressful phase. Never let fleeting doubts dim that brilliant spark.",
      "Always remember that as an older brother, I am forever in your corner. Whether you need guidance, someone to back you up in any situation, or just a chai break when things get heavy—I'm always right here for you. Keep smiling that genuine smile, aim high, and make this year your happiest one yet."
    ],
    valediction: "Always here for you, as your older brother,",
    signatureText: "Saksham"
  },

  // PART C: Secret lock gate answer (forgiving: case-insensitive, trimmed)
  secretAnswer: "pihu", // answer to "What is your name?"
  secretHint: "apna naam bhul gi pihu wo likh 😂",

  // PART C: Preview mode bypass (set true while testing)
  previewMode: true,

  // PART C: Wish jar
  wishJarKey: "pihu_birthday_wish_2026"
};

/**
 * ============================================================================
 * SYNTHETIC WEB AUDIO ENGINE
 * ============================================================================
 */
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.isInitialized = false;
    this.bgAudio = null;
    this.ambientInterval = null;
    this.bgmDisabled = false;
  }

  init() {
    if (this.isInitialized) {
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch(() => {});
      }
      return;
    }
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        if (this.audioCtx.state === "suspended") {
          this.audioCtx.resume().catch(() => {});
        }
      }
      this.isInitialized = true;
      this.initBackgroundMusic();
    } catch (e) {
      console.warn("Web Audio not supported or blocked:", e);
    }
  }

  playBGM() {
    if (this.isMuted || this.bgmDisabled) return;
    this.init();
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    if (this.bgAudio) {
      if (this.bgAudio.paused) {
        const p = this.bgAudio.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    } else {
      this.initBackgroundMusic();
    }
  }

  pauseBGM() {
    if (this.bgAudio && !this.bgAudio.paused) {
      this.bgAudio.pause();
    }
  }

  stopBGMForEndPage() {
    this.bgmDisabled = true;
    this.pauseBGM();
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  enableBGMForOtherScenes() {
    this.bgmDisabled = false;
    if (!this.isMuted) {
      this.playBGM();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
      if (!this.isMuted && this.bgAudio.paused && !this.bgmDisabled) {
        this.bgAudio.play().catch(() => {});
      }
    }
    // Also stop/resume procedural ambient
    if (this.audioCtx) {
      if (this.isMuted) {
        this.audioCtx.suspend().catch(() => {});
      } else {
        this.audioCtx.resume().catch(() => {});
      }
    }
    const muteBtn = document.getElementById("mute-btn");
    if (muteBtn) {
      muteBtn.textContent = this.isMuted ? "🔇" : "🎵";
      muteBtn.setAttribute("aria-label", this.isMuted ? "Unmute sound" : "Mute sound");
    }
    return this.isMuted;
  }

  initBackgroundMusic() {
    if (this.bgAudio) {
      if (!this.isMuted && !this.bgmDisabled && this.bgAudio.paused) {
        this.bgAudio.play().catch(() => {});
      }
      return;
    }
    const domAudio = document.getElementById("bg-music");
    const audio = domAudio || new Audio("assets/audio/bg.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    this.bgAudio = audio;

    audio.onerror = () => {
      if (!this.bgmDisabled) {
        this.startProceduralAmbientMusic();
      }
    };

    if (!this.isMuted && !this.bgmDisabled) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          audio.onerror = () => {
            if (!this.bgmDisabled) {
              this.startProceduralAmbientMusic();
            }
          };
        });
      }
    }
  }

  startProceduralAmbientMusic() {
    if (this.ambientInterval || !this.audioCtx) return;
    const chords = [
      [261.63, 329.63, 392.0, 523.25],
      [220.0, 261.63, 329.63, 440.0],
      [174.61, 220.0, 261.63, 349.23],
      [196.0, 246.94, 293.66, 392.0]
    ];
    let chordIdx = 0;
    const playPad = () => {
      if (this.isMuted || !this.audioCtx || this.audioCtx.state !== "running") return;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;
      notes.forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        const now = this.audioCtx.currentTime + (i * 0.15);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.018, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 5.2);
      });
    };
    playPad();
    this.ambientInterval = setInterval(playPad, 4800);
  }

  playPop() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") this.audioCtx.resume();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playChime(pitch = 587.33) {
    if (this.isMuted || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") this.audioCtx.resume();
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(pitch, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    } catch (e) {}
  }

  playWhoosh() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") this.audioCtx.resume();
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.5);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
    } catch (e) {}
  }

  playSparkle() {
    if (this.isMuted || !this.audioCtx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playChime(freq), idx * 75);
    });
  }

  playPuff() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") this.audioCtx.resume();
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) {}
  }

  playCelebration() {
    if (this.isMuted || !this.audioCtx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((f, i) => {
      setTimeout(() => this.playChime(f), i * 110);
    });
  }
}

const sound = new SoundEngine();

/**
 * ============================================================================
 * SCENE NAVIGATION & PROGRESS CONTROLLER
 * ============================================================================
 */
class NavigationController {
  constructor() {
    this.currentScene = 0;
    this.totalScenes = 9; // 0-7 + 4.5 voice note = 9 scenes
    this.scenes = [];
    this.navDots = [];
    this._swipeLocked = false;
    this.init();
  }

  init() {
    this.scenes = Array.from(document.querySelectorAll(".scene"));
    this.totalScenes = this.scenes.length;
    const dotsContainer = document.getElementById("nav-dots-container");
    dotsContainer.innerHTML = "";

    for (let i = 0; i < this.totalScenes; i++) {
      const dot = document.createElement("button");
      dot.className = `nav-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to Scene ${i + 1}`);
      dot.setAttribute("id", `nav-dot-${i}`);
      dot.addEventListener("click", () => this.goToScene(i));
      dotsContainer.appendChild(dot);
      this.navDots.push(dot);
    }

    // Keyboard Arrow Navigation
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") this.nextScene();
      else if (e.key === "ArrowLeft" || e.key === "PageUp") this.prevScene();
      else if (e.key === "Escape") {
        // Close wish modal if open
        const modal = document.getElementById("wish-modal");
        if (modal && modal.classList.contains("active")) {
          modal.classList.remove("active");
        }
      }
    });

    // Touch Swipe — only on scenes that aren't the game stage
    let touchStartX = 0;
    let touchStartY = 0;
    window.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
      if (this._swipeLocked) return;
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > 60 && Math.abs(diffY) < 50) {
        if (diffX < 0) this.nextScene();
        else this.prevScene();
      }
    }, { passive: true });

    // Restore saved progress
    const savedScene = parseInt(localStorage.getItem("pihu_furthest_scene"), 10);
    if (!isNaN(savedScene) && savedScene > 0 && savedScene < this.totalScenes) {
      setTimeout(() => {
        showMascotDialog(`Welcome back, Pihu! Tap here to continue from Scene ${savedScene + 1}! ✨`, () => {
          this.goToScene(savedScene);
        });
      }, 1800);
    }
  }

  goToScene(index) {
    if (index < 0 || index >= this.totalScenes || index === this.currentScene) return;

    sound.init();
    sound.playWhoosh();

    const currentEl = this.scenes[this.currentScene];
    const targetEl = this.scenes[index];

    currentEl.classList.remove("active");
    currentEl.classList.toggle("prev", index > this.currentScene);

    targetEl.classList.remove("prev");
    targetEl.classList.add("active");

    if (this.navDots[this.currentScene]) this.navDots[this.currentScene].classList.remove("active");
    if (this.navDots[index]) this.navDots[index].classList.add("active");

    this.currentScene = index;

    // Save progression
    const prevFurthest = parseInt(localStorage.getItem("pihu_furthest_scene") || "0", 10);
    if (index > prevFurthest) {
      localStorage.setItem("pihu_furthest_scene", index.toString());
    }

    if (window.onSceneEnter) window.onSceneEnter(index);
    updateMascotForScene(index);
  }

  nextScene() {
    if (this.currentScene < this.totalScenes - 1) this.goToScene(this.currentScene + 1);
  }

  prevScene() {
    if (this.currentScene > 0) this.goToScene(this.currentScene - 1);
  }

  lockSwipe() { this._swipeLocked = true; }
  unlockSwipe() { this._swipeLocked = false; }
}

let nav = null;

/**
 * ============================================================================
 * BACKGROUND CANVAS: TWINKLING & SHOOTING STARS
 * ============================================================================
 */
function initBackgroundStars() {
  const canvas = document.getElementById("star-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [], shootingStars = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let animRunning = true;

  const resizeObs = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  };
  window.addEventListener("resize", resizeObs);

  function createStars() {
    stars = [];
    const count = Math.min(180, Math.floor((width * height) / 5000));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }

  function spawnShootingStar() {
    if (Math.random() < 0.015 && shootingStars.length < 2) {
      shootingStars.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.3,
        len: Math.random() * 80 + 40,
        speed: Math.random() * 7 + 6,
        alpha: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2
      });
    }
  }

  function render(time) {
    if (!animRunning) return;
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      const flicker = Math.sin(time * 0.002 + star.twinkleOffset) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(255, 247, 238, ${star.alpha * flicker})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    spawnShootingStar();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      const endX = s.x - Math.cos(s.angle) * s.len;
      const endY = s.y - Math.sin(s.angle) * s.len;
      const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
      grad.addColorStop(0, `rgba(255, 216, 107, ${s.alpha})`);
      grad.addColorStop(1, "rgba(255, 216, 107, 0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.alpha -= 0.015;
      if (s.alpha <= 0 || s.x > width || s.y > height) shootingStars.splice(i, 1);
    }
    requestAnimationFrame(render);
  }

  // Pause when tab hidden (FIX: battery / CPU)
  document.addEventListener("visibilitychange", () => {
    animRunning = !document.hidden;
    if (!document.hidden) requestAnimationFrame(render);
  });

  createStars();
  requestAnimationFrame(render);
}

/**
 * ============================================================================
 * SPARKLE CURSOR TRAIL & TOUCH RIPPLES
 * ============================================================================
 */
function initSparkleCursor() {
  const canvas = document.getElementById("cursor-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let animRunning = true;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = ["#ff7eb6", "#ffd86b", "#8ff0d0", "#ffb58a", "#fff"];

  function addParticle(x, y) {
    if (particles.length > 60) return;
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 - 0.5,
      size: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.1
    });
  }

  // Desktop sparkle trail
  window.addEventListener("mousemove", (e) => {
    if (Math.random() < 0.4) addParticle(e.clientX, e.clientY);
  });

  // Mobile touch ripple (not sparkle — avoids scroll interference)
  window.addEventListener("touchmove", (e) => {
    if (e.touches[0] && Math.random() < 0.35) {
      addParticle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  function renderSparkles() {
    if (!animRunning) { requestAnimationFrame(renderSparkles); return; }
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      for (let s = 0; s < 4; s++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(p.size * 1.5, 0);
        ctx.lineTo(p.size * 0.3, p.size * 0.3);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.alpha -= 0.025;
      p.size = Math.max(0, p.size - 0.04);
      if (p.alpha <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(renderSparkles);
  }

  document.addEventListener("visibilitychange", () => {
    animRunning = !document.hidden;
  });

  requestAnimationFrame(renderSparkles);
}

/**
 * ============================================================================
 * TIME-AWARE GREETING PILL
 * ============================================================================
 */
function updateTimeGreeting() {
  const greetingEl = document.getElementById("time-greeting-text");
  if (!greetingEl) return;
  const now = new Date();
  const hour = now.getHours();
  const isBirthday = now.getDate() === CONFIG.birthdayDay && now.getMonth() + 1 === CONFIG.birthdayMonth;

  let text = "";
  if (isBirthday) {
    text = "🎉 Today is Pihu's Birthday!";
  } else if (hour >= 23 || hour < 5) {
    text = "🌙 Late night surprise for Pihu!";
  } else if (hour >= 5 && hour < 12) {
    text = "☀️ Good morning, Pihu!";
  } else if (hour >= 12 && hour < 17) {
    text = "✨ Good afternoon, Pihu!";
  } else {
    text = "🌆 Good evening, Pihu!";
  }
  greetingEl.textContent = text;
}

/**
 * ============================================================================
 * FLOATING MASCOT COMPANION ("TARA" / SPARKY)
 * ============================================================================
 */
const MASCOT_MESSAGES = [
  "Tap the gift box to unlock your surprise! 🎁",
  "Pop the balloons to find secret words! 🎈",
  "Look at that golden glow! Tap the photo for surprises ✨",
  "12 glowing stars hold 12 special wishes. Find them all! 🌟",
  "A heartfelt letter from your older brother... 💌",
  "A special birthday friend is waiting to wish you! 🎈✨",
  "Tap the garden soil to make blessings bloom! 🌸",
  "Flip the memory cards or play the mini cake game! 🍰",
  "Blow into your mic or tap the candles to make a wish! 🎂"
];

function showMascotDialog(text, onClickAction = null) {
  const bubble = document.getElementById("mascot-bubble");
  if (!bubble) return;
  bubble.textContent = text;
  bubble.style.display = "block";
  if (onClickAction) {
    bubble.style.cursor = "pointer";
    bubble.onclick = onClickAction;
  } else {
    bubble.style.cursor = "default";
    bubble.onclick = null;
  }
}

function updateMascotForScene(sceneIndex) {
  if (sceneIndex >= 0 && sceneIndex < MASCOT_MESSAGES.length) {
    showMascotDialog(MASCOT_MESSAGES[sceneIndex]);
  }
}

/**
 * ============================================================================
 * HIDDEN EASTER EGGS
 * ============================================================================
 */
function initEasterEggs() {
  let typedBuffer = "";
  window.addEventListener("keydown", (e) => {
    typedBuffer += e.key.toLowerCase();
    if (typedBuffer.length > 10) typedBuffer = typedBuffer.slice(-10);
    if (typedBuffer.includes("pihu")) {
      typedBuffer = "";
      triggerEasterConfettiRain();
      showToast("🎉 Secret Unlocked: Pihu Super Cheer Squad Activated! ✨");
    }
  });

  const title = document.querySelector(".portrait-heading");
  if (title) {
    let pressTimer;
    const startPress = () => {
      pressTimer = setTimeout(() => {
        showToast("☕ You found the secret! Chai & samosa is on Saksham!");
        sound.playSparkle();
      }, 1200);
    };
    const cancelPress = () => clearTimeout(pressTimer);
    title.addEventListener("mousedown", startPress);
    title.addEventListener("mouseup", cancelPress);
    title.addEventListener("mouseleave", cancelPress);
    title.addEventListener("touchstart", startPress, { passive: true });
    title.addEventListener("touchend", cancelPress);
    title.addEventListener("touchcancel", cancelPress);
  }
}

function showToast(message) {
  const toast = document.getElementById("easter-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

function triggerEasterConfettiRain() {
  sound.playCelebration();
  if (typeof confetti === "function") {
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.3 } });
  }
}

/**
 * ============================================================================
 * WALLPAPER GENERATOR (Canvas PNG Download)
 * ============================================================================
 */
function downloadWallpaper() {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#120924");
  grad.addColorStop(0.5, "#2d134b");
  grad.addColorStop(1, "#1b1035");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 60; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = "rgba(255, 216, 107, " + (Math.random() * 0.6 + 0.2) + ")";
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = CONFIG.photos[0].src;

  img.onload = () => {
    const frameX = 140, frameY = 320, frameW = 800, frameH = 1050;
    ctx.save();
    ctx.shadowColor = "rgba(255, 126, 182, 0.4)";
    ctx.shadowBlur = 40;
    ctx.fillStyle = "#ffffff";
    if (ctx.roundRect) {
      ctx.roundRect(frameX, frameY, frameW, frameH, 30);
    } else {
      ctx.rect(frameX, frameY, frameW, frameH);
    }
    ctx.fill();
    ctx.restore();

    const photoX = frameX + 30, photoY = frameY + 30;
    const photoW = frameW - 60, photoH = frameH - 160;
    ctx.save();
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(photoX, photoY, photoW, photoH, 20);
    } else {
      ctx.rect(photoX, photoY, photoW, photoH);
    }
    ctx.clip();
    ctx.drawImage(img, photoX, photoY, photoW, photoH);
    ctx.restore();

    ctx.fillStyle = "#2b1b38";
    ctx.font = "italic 44px serif";
    ctx.textAlign = "center";
    ctx.fillText("Pihu \u2022 3rd November \u2728", canvas.width / 2, frameY + frameH - 60);

    ctx.fillStyle = "#ffd86b";
    ctx.font = "bold 64px serif";
    ctx.fillText("Happy Birthday Pihu!", canvas.width / 2, 200);

    ctx.fillStyle = "#ffb58a";
    ctx.font = "32px sans-serif";
    ctx.fillText("May this year be your brightest chapter yet.", canvas.width / 2, 260);

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "28px sans-serif";
    ctx.fillText("With best wishes, Saksham \uD83C\uDF1F", canvas.width / 2, 1750);

    try {
      const link = document.createElement("a");
      link.download = "Happy_Birthday_Pihu_Wallpaper.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("✨ Wallpaper downloaded! Set it on your phone! 📱");
    } catch(e) {
      showToast("📱 iOS: Long-press the image to save it as wallpaper.");
    }
  };

  img.onerror = () => {
    showToast("Photo loading error for wallpaper. Try on a server!");
  };
}

/**
 * ============================================================================
 * PART C-3: SECRET LOCK GATE
 * ============================================================================
 */
function initSecretGate() {
  const gate = document.getElementById("secret-gate");
  const mainContent = document.getElementById("scenes-viewport");
  const gateInput = document.getElementById("gate-input");
  const gateSubmit = document.getElementById("gate-submit");
  const gateHint = document.getElementById("gate-hint");
  const gateError = document.getElementById("gate-error");

  if (!gate) return;

  // Check if already unlocked this session
  if (sessionStorage.getItem("pihu_gate_passed") === "1") {
    gate.style.display = "none";
    return;
  }

  gate.style.display = "flex";
  if (mainContent) mainContent.style.visibility = "hidden";

  const tryAnswer = () => {
    const val = (gateInput ? gateInput.value : "").trim().toLowerCase();
    const correct = CONFIG.secretAnswer.toLowerCase();
    // Forgiving: accept exact "pihu", or if it includes "pihu", or matches recipientName
    if (val === correct || val.includes("pihu") || val === CONFIG.recipientName.toLowerCase()) {
      sessionStorage.setItem("pihu_gate_passed", "1");
      gate.style.opacity = "0";
      gate.style.transition = "opacity 0.6s ease";
      setTimeout(() => {
        gate.style.display = "none";
        if (mainContent) mainContent.style.visibility = "visible";
      }, 600);
    } else {
      if (gateError) {
        gateError.textContent = "Arre apna naam bhul gi kya? Hint dekh lo! 😂";
        gateError.style.display = "block";
        setTimeout(() => gateError.style.display = "none", 3000);
      }
      if (gateInput) { gateInput.value = ""; gateInput.focus(); }
    }
  };

  if (gateSubmit) gateSubmit.addEventListener("click", tryAnswer);
  if (gateInput) {
    gateInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tryAnswer();
    });
  }
  if (gateHint) {
    gateHint.addEventListener("click", () => {
      gateHint.textContent = "Hint: " + CONFIG.secretHint;
    });
  }
}

/**
 * ============================================================================
 * PART C-5: PHOTO WALL (additional photos on a string)
 * ============================================================================
 */
function initPhotoWall() {
  const container = document.getElementById("photo-wall-inner");
  if (!container) return;
  CONFIG.photos.forEach((photo, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "photo-wall-polaroid";
    wrapper.setAttribute("tabindex", "0");
    wrapper.setAttribute("aria-label", photo.caption || "Photo " + (i + 1));
    wrapper.innerHTML = `
      <img src="${photo.src}" alt="${photo.alt || ''}" loading="lazy">
      <div class="photo-wall-caption">${photo.caption || ""}</div>
    `;
    wrapper.addEventListener("click", () => openPhotoLightbox(photo));
    wrapper.addEventListener("keydown", e => { if (e.key === "Enter") openPhotoLightbox(photo); });
    container.appendChild(wrapper);
  });
}

function openPhotoLightbox(photo) {
  const lb = document.getElementById("photo-lightbox");
  const lbImg = document.getElementById("lightbox-img");
  if (!lb || !lbImg) return;
  lbImg.src = photo.src;
  lbImg.alt = photo.alt || "";
  lb.classList.add("active");
}

function initPhotoLightbox() {
  const lb = document.getElementById("photo-lightbox");
  const closeBtn = document.getElementById("lightbox-close");
  if (!lb) return;
  if (closeBtn) closeBtn.addEventListener("click", () => lb.classList.remove("active"));
  lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("active"); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("active"); });
}

/**
 * ============================================================================
 * PART C-6: WISH JAR
 * ============================================================================
 */
function initWishJar() {
  const jarInput = document.getElementById("wish-jar-input");
  const jarBtn = document.getElementById("wish-jar-submit");
  const jarDisplay = document.getElementById("wish-jar-display");
  const jarStar = document.getElementById("wish-jar-star");
  const jarSend = document.getElementById("wish-jar-send");

  // Show saved wish if exists
  const saved = localStorage.getItem(CONFIG.wishJarKey);
  if (saved && jarDisplay) {
    jarDisplay.textContent = "Your wish: " + saved;
    jarDisplay.style.display = "block";
    if (jarSend) jarSend.style.display = "inline-flex";
  }

  if (jarBtn && jarInput) {
    jarBtn.addEventListener("click", () => {
      const wish = jarInput.value.trim();
      if (!wish) return;
      localStorage.setItem(CONFIG.wishJarKey, wish);
      // Animate paper star
      if (jarStar) {
        jarStar.style.display = "block";
        jarStar.classList.add("fly-away");
        setTimeout(() => {
          jarStar.style.display = "none";
          jarStar.classList.remove("fly-away");
        }, 1200);
      }
      if (jarDisplay) {
        jarDisplay.textContent = "Your wish: " + wish;
        jarDisplay.style.display = "block";
      }
      if (jarSend) jarSend.style.display = "inline-flex";
      jarInput.value = "";
      showToast("⭐ Your wish is in the stars now!");
      sound.playSparkle();
    });
  }

  if (jarSend) {
    jarSend.addEventListener("click", () => {
      const wish = localStorage.getItem(CONFIG.wishJarKey) || "";
      const msg = encodeURIComponent("Hey Saksham! My birthday wish: " + wish + " 🌟");
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, "_blank");
    });
  }
}

/**
 * ============================================================================
 * PART C-9: SERVICE WORKER OFFLINE INSTALL
 * ============================================================================
 */
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

/**
 * ============================================================================
 * PART C-10: FINALE CAKE LOCK (before Nov 3rd)
 * ============================================================================
 */
function checkCakeLock() {
  if (CONFIG.previewMode) return; // bypass for testing
  const now = new Date();
  const bday = new Date(now.getFullYear(), CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
  if (now < bday) {
    // Lock the cake scene
    const cakeScene = document.getElementById("scene-7");
    if (!cakeScene) return;
    const lockMsg = document.createElement("div");
    lockMsg.className = "cake-lock-overlay";
    lockMsg.innerHTML = `
      <div class="cake-lock-content">
        <div style="font-size:3rem">🎂</div>
        <h2>Come back on November 3rd to blow the candles!</h2>
        <p>The cake is waiting for you, Pihu. Just a little longer... ✨</p>
      </div>
    `;
    cakeScene.appendChild(lockMsg);
  }
}

/**
 * ============================================================================
 * PART C-11: PAPER PLANE COUPON BOOK
 * ============================================================================
 */
function initPaperPlane() {
  const plane = document.getElementById("paper-plane-btn");
  const couponBook = document.getElementById("coupon-book");
  const closeCoupon = document.getElementById("coupon-book-close");

  if (!plane) return;

  plane.addEventListener("click", () => {
    if (couponBook) couponBook.classList.add("active");
    sound.playSparkle();
  });

  if (closeCoupon) {
    closeCoupon.addEventListener("click", () => {
      if (couponBook) couponBook.classList.remove("active");
    });
  }

  // Redeem coupons
  document.querySelectorAll(".coupon-redeem-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const coupon = btn.dataset.coupon;
      const msg = encodeURIComponent(`Hey Saksham! I'm redeeming my coupon: "${coupon}" 🎟️`);
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, "_blank");
    });
  });
}

/**
 * ============================================================================
 * PRELOADER & INITIALIZATION
 * ============================================================================
 */
window.addEventListener("DOMContentLoaded", () => {
  // PART C-3: Secret gate
  initSecretGate();

  nav = new NavigationController();
  window.nav = nav;

  initBackgroundStars();
  initSparkleCursor();
  updateTimeGreeting();
  initEasterEggs();
  initPhotoWall();
  initPhotoLightbox();
  checkCakeLock();
  initPaperPlane();

    // Auto-trigger BGM without needing to click the mute button:
  sound.init();
  sound.playBGM();

  const interactionEvents = ['click', 'pointerdown', 'touchstart', 'touchend', 'keydown', 'scroll', 'wheel'];
  const tryStartAudio = () => {
    sound.playBGM();
    if (sound.bgAudio && !sound.bgAudio.paused) {
      interactionEvents.forEach(evt => {
        window.removeEventListener(evt, tryStartAudio, { capture: true, passive: true });
      });
    }
  };
  interactionEvents.forEach(evt => {
    window.addEventListener(evt, tryStartAudio, { capture: true, passive: true });
  });

  // Nav buttons
  const nextBtn = document.getElementById("next-scene-btn");
  const prevBtn = document.getElementById("prev-scene-btn");
  if (nextBtn) nextBtn.addEventListener("click", () => nav.nextScene());
  if (prevBtn) prevBtn.addEventListener("click", () => nav.prevScene());

  // Mute button
  const muteBtn = document.getElementById("mute-btn");
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      sound.init();
      sound.toggleMute();
    });
  }

  // Mascot tap
  const mascotAvatar = document.querySelector(".mascot-avatar");
  if (mascotAvatar) {
    mascotAvatar.addEventListener("click", () => {
      sound.playChime(784);
      const randomCheer = [
        "You're doing great, birthday girl! ✨",
        "Keep exploring every scene! 🎈",
        "Saksham put so much love into this! 💖",
        "Chai breaks make everything better! ☕",
        "May 3rd November bring endless joy! 🎂"
      ];
      showMascotDialog(randomCheer[Math.floor(Math.random() * randomCheer.length)]);
    });
  }

  // Preload photos & dismiss loader
  const loaderBar = document.querySelector(".loader-bar");
  const loader = document.getElementById("loader");
  let progress = 0;
  let imagesLoaded = 0;
  const totalImages = CONFIG.photos.length;

  // Preload all configured photos
  CONFIG.photos.forEach(photo => {
    const img = new Image();
    img.onload = img.onerror = () => {
      imagesLoaded++;
      if (imagesLoaded >= totalImages) {
        // All images ready — finish bar
        if (loaderBar) loaderBar.style.width = "100%";
        setTimeout(() => {
          if (loader) loader.classList.add("loaded");
        }, 350);
      }
    };
    img.src = photo.src;
  });

  // Animated progress bar (visual only — runs to 80% then waits for images)
  const timer = setInterval(() => {
    progress += 20;
    if (loaderBar) loaderBar.style.width = `${Math.min(progress, 80)}%`;
    if (progress >= 80) clearInterval(timer);
  }, 120);

  // Fallback: dismiss loader after 3s even if images stall
  setTimeout(() => {
    if (loader && !loader.classList.contains("loaded")) {
      loader.classList.add("loaded");
    }
  }, 3000);

  // Register SW for offline
  registerServiceWorker();
});

// Expose for scene reset
window.resetAllScenes = function() {
  // Reset garden
  const gardenStage = document.getElementById("garden-stage");
  if (gardenStage) {
    document.querySelectorAll(".bloomed-flower").forEach(f => f.remove());
    const countEl = document.getElementById("blessings-bloom-count");
    if (countEl) countEl.textContent = "0/" + CONFIG.blessings.length;
  }
  // Reset wishes
  const wishCounter = document.getElementById("wishes-found-count");
  if (wishCounter) wishCounter.textContent = "0/12";
  document.querySelectorAll(".sky-star-btn").forEach(b => {
    b.classList.remove("shooting-star-anim", "star-claimed");
    b.disabled = false;
  });
  const constellation = document.getElementById("constellation-svg");
  if (constellation) constellation.classList.remove("revealed");
  // Reset candles
  document.querySelectorAll(".candle").forEach(c => c.classList.remove("extinguished"));
  // Reset finale
  const finale = document.getElementById("finale-celebration");
  if (finale) finale.classList.remove("active");
  // Reset letter
  const letterBody = document.getElementById("letter-body-content");
  if (letterBody) letterBody.innerHTML = "";
  // Reset game score display
  const scoreEl = document.getElementById("game-score");
  const timerEl = document.getElementById("game-timer");
  if (scoreEl) scoreEl.textContent = "Score: 0";
  if (timerEl) timerEl.textContent = "Time: 20s";
};
