/**
 * ============================================================================
 * PIHU'S BIRTHDAY SURPRISE WEBSITE - SCENE SCRIPTS (0 to 7 + Voice Note 4.5)
 * QA-fixed & upgraded version
 * ============================================================================
 */

// Scene Initializers
function initScene0() {
  const giftWrapper = document.getElementById("gift-box-wrapper");
  const tapDots = document.querySelectorAll(".gift-tap-dots .tap-dot");
  let tapCount = 0;
  let transitionFired = false; // guard against double-fire
  const maxTaps = 3;

  if (!giftWrapper) return;

  // Prevent double-tap/click ghost events on mobile
  let lastTapTime = 0;

  const handleTap = (e) => {
    if (transitionFired) return;
    const now = Date.now();
    if (now - lastTapTime < 300) return; // debounce
    lastTapTime = now;

    tapCount++;
    sound.init();

    if (tapCount === 1) {
      sound.playPop();
      giftWrapper.classList.add("gift-shake-1");
      if (tapDots[0]) tapDots[0].classList.add("filled");
      setTimeout(() => giftWrapper.classList.remove("gift-shake-1"), 450);
    } else if (tapCount === 2) {
      sound.playPop();
      giftWrapper.classList.add("gift-shake-2");
      if (tapDots[1]) tapDots[1].classList.add("filled");
      setTimeout(() => giftWrapper.classList.remove("gift-shake-2"), 450);
    } else if (tapCount >= maxTaps) {
      transitionFired = true;
      sound.playCelebration();
      if (tapDots[2]) tapDots[2].classList.add("filled");
      giftWrapper.classList.add("gift-shake-burst");

      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }

      setTimeout(() => {
        if (window.nav) window.nav.goToScene(1);
      }, 700);
    }
  };

  // Use only click (covers both mouse and touch via tap, avoids double-fire)
  giftWrapper.addEventListener("click", handleTap);

  // Keyboard accessibility
  giftWrapper.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleTap(e); }
  });
}

/**
 * ============================================================================
 * SCENE 1: COUNTDOWN & FLOATING BALLOONS
 * ============================================================================
 */
let balloonInterval = null; // track globally for cleanup

function initScene1() {
  const typewriterEl = document.getElementById("typewriter-content");
  const textToType = "Hey Pihu, I made something for you...";
  let charIdx = 0;
  let typeTimer = null;

  // Guard: clear any existing typewriter
  if (typewriterEl) typewriterEl.textContent = "";

  function typeChar() {
    if (!typewriterEl) return;
    if (charIdx < textToType.length) {
      typewriterEl.textContent += textToType.charAt(charIdx);
      charIdx++;
      typeTimer = setTimeout(typeChar, 75);
    }
  }
  typeChar();

  // Countdown Logic to 3 November — handles year rollover correctly
  function updateCountdown() {
    const daysEl = document.getElementById("count-days");
    const hoursEl = document.getElementById("count-hours");
    const minsEl = document.getElementById("count-mins");
    const secsEl = document.getElementById("count-secs");
    const todayBurstEl = document.getElementById("birthday-today-burst");
    const gridEl = document.getElementById("countdown-grid-wrap");
    const headlineEl = document.querySelector(".countdown-headline");

    if (!daysEl) return;

    const now = new Date();
    const isToday = now.getDate() === CONFIG.birthdayDay && now.getMonth() + 1 === CONFIG.birthdayMonth;

    if (isToday) {
      if (todayBurstEl) todayBurstEl.style.display = "block";
      if (gridEl) gridEl.style.display = "none";
      if (headlineEl) headlineEl.style.display = "none";
      // Celebration burst
      if (typeof confetti === "function") {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });
      }
      return;
    }

    // After birthday — show sensible "next year" message, not negative
    let target = new Date(now.getFullYear(), CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
    if (now.getTime() >= target.getTime()) {
      // Birthday passed — point to next year
      target = new Date(now.getFullYear() + 1, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
    }

    const diff = target.getTime() - now.getTime();
    if (diff <= 0) {
      if (todayBurstEl) todayBurstEl.style.display = "block";
      if (gridEl) gridEl.style.display = "none";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Floating Clickable Balloons
  const balloonContainer = document.getElementById("balloon-container");
  const balloonWords = ["smile", "shine", "dream", "laugh", "bright", "cheers", "superstar", "magic", "joy", "glow"];
  const balloonColors = [
    "linear-gradient(135deg, #ff7eb6, #ec4899)",
    "linear-gradient(135deg, #ffd86b, #f59e0b)",
    "linear-gradient(135deg, #8ff0d0, #10b981)",
    "linear-gradient(135deg, #ffb58a, #f97316)",
    "linear-gradient(135deg, #a78bfa, #8b5cf6)"
  ];

  // Clear old balloons and interval
  if (balloonInterval) clearInterval(balloonInterval);
  if (balloonContainer) balloonContainer.innerHTML = "";

  function spawnBalloon() {
    if (!balloonContainer) return;
    // Limit live balloons to avoid memory buildup
    if (balloonContainer.children.length > 12) return;

    const balloon = document.createElement("div");
    balloon.className = "floating-balloon";
    const leftPercent = Math.random() * 80 + 5;
    const duration = Math.random() * 4 + 7;
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];

    balloon.style.left = `${leftPercent}%`;
    balloon.setAttribute("aria-label", "Pop balloon for a secret word");
    balloon.setAttribute("tabindex", "0");
    balloon.setAttribute("role", "button");
    balloon.innerHTML = `
      <div class="balloon-body" style="background: ${color};">
        <div class="balloon-shine"></div>
      </div>
      <div class="balloon-string"></div>
    `;

    balloon.style.transition = `transform ${duration}s linear`;
    balloonContainer.appendChild(balloon);

    requestAnimationFrame(() => {
      balloon.style.transform = `translateY(-${window.innerHeight + 200}px) rotate(${(Math.random() - 0.5) * 40}deg)`;
    });

    const popBalloon = (e) => {
      e.stopPropagation();
      sound.playPop();
      const word = balloonWords[Math.floor(Math.random() * balloonWords.length)];

      // Show word popup — attached to body for correct positioning
      const popup = document.createElement("div");
      popup.className = "balloon-word-popup";
      popup.textContent = `✨ ${word}!`;
      const rect = balloon.getBoundingClientRect();
      popup.style.left = `${rect.left + rect.width / 2 - 30}px`;
      popup.style.top = `${rect.top - 20}px`;
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 1200);

      if (typeof confetti === "function") {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { x: rect.left / window.innerWidth, y: rect.top / window.innerHeight }
        });
      }
      balloon.remove();
    };

    balloon.addEventListener("click", popBalloon);
    balloon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); popBalloon(e); }
    });

    // Auto-remove when off screen
    const removeTimer = setTimeout(() => {
      if (balloon.parentNode) balloon.remove();
    }, duration * 1000 + 200);
  }

  balloonInterval = setInterval(spawnBalloon, 2200);
}

/**
 * ============================================================================
 * SCENE 2: THE PORTRAIT REVEAL & 3D TILT
 * ============================================================================
 */
let scene2Initialized = false;

function initScene2() {
  if (scene2Initialized) return;
  scene2Initialized = true;

  const polaroid = document.getElementById("portrait-card");
  const polaroidImg = document.getElementById("portrait-img");
  const captionEl = document.getElementById("portrait-caption");
  let tapCount = 0;
  let lastTapTime2 = 0;

  if (CONFIG.photos.length > 0) {
    if (polaroidImg) {
      polaroidImg.src = CONFIG.photos[0].src;
      polaroidImg.alt = CONFIG.photos[0].alt;
    }
    if (captionEl) captionEl.textContent = CONFIG.photos[0].caption;
  }

  // Developing polaroid effect on first enter
  if (polaroid) {
    polaroid.classList.remove("developed");
    polaroid.classList.add("developing");
    setTimeout(() => {
      polaroid.classList.remove("developing");
      polaroid.classList.add("developed");
    }, 400);
  }

  // 3D Parallax Tilt on Mouse Move
  const wrapper = document.querySelector(".polaroid-wrapper");
  if (wrapper && polaroid) {
    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 22;
      const rotateY = (x / rect.width) * 22;
      polaroid.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });

    wrapper.addEventListener("mouseleave", () => {
      polaroid.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });

    // Touch tilt (device orientation fallback)
    if (window.DeviceOrientationEvent) {
      const requestOrientation = async () => {
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
          try {
            const perm = await DeviceOrientationEvent.requestPermission();
            if (perm !== "granted") return;
          } catch(e) { return; }
        }
        window.addEventListener("deviceorientation", (e) => {
          if (!e.beta || !e.gamma) return;
          const rotX = Math.max(-15, Math.min(15, e.beta / 3));
          const rotY = Math.max(-15, Math.min(15, e.gamma / 3));
          if (polaroid) {
            polaroid.style.transform = `perspective(1000px) rotateX(${-rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
          }
        }, { passive: true });
      };
      // Request on first touch of portrait area
      if (wrapper) {
        wrapper.addEventListener("touchstart", () => { requestOrientation(); }, { once: true, passive: true });
      }
    }
  }

  // Easter Egg: 5 rapid taps (no slower than 3s total, debounced)
  if (polaroid) {
    polaroid.addEventListener("click", () => {
      const now = Date.now();
      if (now - lastTapTime2 > 2500) tapCount = 0; // reset if too slow
      lastTapTime2 = now;
      tapCount++;
      sound.playPop();

      if (tapCount >= 5) {
        tapCount = 0;
        sound.playCelebration();
        const winkEl = document.getElementById("easter-wink-burst");
        if (winkEl) {
          winkEl.classList.add("active");
          setTimeout(() => winkEl.classList.remove("active"), 1200);
        }
        if (typeof confetti === "function") {
          confetti({ particleCount: 60, spread: 90, origin: { y: 0.5 } });
        }
        showToast("💖 Secret Winking Mode Activated! You're the best!");
      }
    });
  }
}

/**
 * ============================================================================
 * SCENE 3: WISHES SKY (12 Interactive Night Stars)
 * ============================================================================
 */
let scene3Initialized = false;

function initScene3() {
  if (scene3Initialized) return;
  scene3Initialized = true;

  const skyWrap = document.getElementById("wishes-sky-wrap");
  const counterEl = document.getElementById("wishes-found-count");
  const modal = document.getElementById("wish-modal");
  const modalClose = document.getElementById("wish-modal-close");
  const modalIcon = document.getElementById("wish-modal-icon");
  const modalTitle = document.getElementById("wish-modal-title");
  const modalText = document.getElementById("wish-modal-text");
  const constellationSvg = document.getElementById("constellation-svg");

  let foundStars = new Set();
  const totalWishes = CONFIG.wishes.length;

  if (!skyWrap) return;

  const starPositions = [
    { x: 18, y: 22 }, { x: 38, y: 16 }, { x: 62, y: 20 }, { x: 82, y: 24 },
    { x: 24, y: 45 }, { x: 44, y: 40 }, { x: 58, y: 48 }, { x: 78, y: 44 },
    { x: 20, y: 72 }, { x: 36, y: 78 }, { x: 64, y: 76 }, { x: 80, y: 70 }
  ];

  CONFIG.wishes.forEach((wish, idx) => {
    const pos = starPositions[idx % starPositions.length];
    const starBtn = document.createElement("button");
    starBtn.className = "sky-star-btn";
    starBtn.style.left = `${pos.x}%`;
    starBtn.style.top = `${pos.y}%`;
    starBtn.setAttribute("aria-label", `Wish star: ${wish.title}`);
    starBtn.setAttribute("id", `star-btn-${wish.id}`);
    starBtn.innerHTML = `<span class="sky-star-glyph" aria-hidden="true">⭐</span>`;

    starBtn.addEventListener("click", () => {
      // Prevent counting same star twice
      if (foundStars.has(wish.id)) {
        // Re-open modal for already-found star
        if (modalIcon) modalIcon.textContent = wish.icon;
        if (modalTitle) modalTitle.textContent = wish.title;
        if (modalText) modalText.textContent = wish.text;
        if (modal) modal.classList.add("active");
        return;
      }

      sound.playChime(659);
      starBtn.classList.add("shooting-star-anim");
      starBtn.classList.add("star-claimed");
      starBtn.querySelector(".sky-star-glyph").textContent = "🌟";

      if (modalIcon) modalIcon.textContent = wish.icon;
      if (modalTitle) modalTitle.textContent = wish.title;
      if (modalText) modalText.textContent = wish.text;
      if (modal) modal.classList.add("active");

      foundStars.add(wish.id);
      if (counterEl) counterEl.textContent = `${foundStars.size}/${totalWishes}`;

      // Constellation only at exactly 12/12
      if (foundStars.size === totalWishes) {
        setTimeout(() => {
          if (constellationSvg) constellationSvg.classList.add("revealed");
          sound.playCelebration();
          showToast("✨ Constellation Complete: You lit up the entire sky! 🌟");
          if (typeof confetti === "function") {
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
          }
        }, 1000);
      }
    });

    skyWrap.appendChild(starBtn);
  });

  // Modal close handlers (click outside, close button, Escape)
  if (modalClose && modal) {
    modalClose.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }
}

/**
 * ============================================================================
 * SCENE 4: LETTER FROM SAKSHAM
 * ============================================================================
 */
let scene4Initialized = false;

function initScene4() {
  if (scene4Initialized) return;
  scene4Initialized = true;

  const letterBody = document.getElementById("letter-body-content");
  const sigSvg = document.getElementById("signature-svg");
  if (!letterBody) return;

  letterBody.innerHTML = "";

  CONFIG.letter.paragraphs.forEach((pText, i) => {
    let replacedText = pText
      .replace("{{memory_1}}", `<span class="highlight-ink">${CONFIG.memories.memory_1}</span>`)
      .replace("{{memory_2}}", `<span class="highlight-ink">${CONFIG.memories.memory_2}</span>`)
      .replace("{{inside_joke}}", `<span class="highlight-ink">${CONFIG.memories.inside_joke}</span>`);

    // Safety net: remove any remaining {{ }} tokens
    replacedText = replacedText.replace(/\{\{[^}]+\}\}/g, "[memory]");

    const p = document.createElement("p");
    p.className = "letter-paragraph";
    p.innerHTML = replacedText;
    letterBody.appendChild(p);

    setTimeout(() => p.classList.add("visible"), 300 + i * 400);
  });

  // Animate cursive SVG signature
  setTimeout(() => {
    if (sigSvg) sigSvg.classList.add("animate");
  }, 300 + CONFIG.letter.paragraphs.length * 400);
}

/**
 * ============================================================================
 * SCENE 4.5: ANIMATED BIRTHDAY MASCOT (Replaces Voice Note)
 * ============================================================================
 */
let scene45Initialized = false;

function initScene45() {
  if (scene45Initialized) return;
  scene45Initialized = true;

  const mascot = document.getElementById("birthday-mascot");
  const mascotMouth = document.getElementById("mascot-mouth");
  const speechText = document.getElementById("mascot-speech-text");
  const speakBtn = document.getElementById("mascot-speak-btn");
  const danceBtn = document.getElementById("mascot-dance-btn");
  const cheerBtn = document.getElementById("mascot-cheer-btn");
  const stage = document.getElementById("mascot-stage");

  const MASCOT_WISHES = [
    "Happy Birthday Pihu! Wishing you the happiest and most wonderful year ahead! 🎉💖",
    "Big brother Saksham sent me to deliver the warmest birthday wish! You're a superstar, Pihu! ⭐",
    "May your year be filled with big smiles, lots of laughter, great chai, and endless wins! 🎂✨",
    "Always stay confident and cheerful! Remember your big brother Saksham always has your back! 🎈🌸"
  ];

  let currentWishIdx = 0;
  let isSpeaking = false;

  function speakMascotWish() {
    if (isSpeaking) return;
    isSpeaking = true;

    // Cycle wish text in bubble
    const wish = MASCOT_WISHES[currentWishIdx % MASCOT_WISHES.length];
    currentWishIdx++;
    if (speechText) speechText.textContent = wish;

    // Sound effect
    if (window.sound && typeof sound.playCelebration === "function") {
      sound.playSparkle();
    }

    // Mascot animations
    if (mascot) mascot.classList.add("speaking");
    if (mascotMouth) mascotMouth.classList.add("talking");

    // Confetti burst
    if (typeof confetti === "function") {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    // Browser Web Speech API to say Happy Birthday aloud
    let speechDuration = 2800;
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const spokenPhrase = "Happy Birthday Pihu! Wishing you a very very Happy Birthday from Saksham!";
        const utterance = new SpeechSynthesisUtterance(spokenPhrase);
        utterance.rate = 0.95;
        utterance.pitch = 1.25; // Friendly, high-spirited voice
        utterance.lang = "en-IN";

        utterance.onend = () => finishSpeaking();
        utterance.onerror = () => finishSpeaking();
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Speech synthesis error:", e);
        setTimeout(finishSpeaking, speechDuration);
      }
    } else {
      setTimeout(finishSpeaking, speechDuration);
    }

    // Safety fallback
    setTimeout(finishSpeaking, 3500);
  }

  function finishSpeaking() {
    if (!isSpeaking) return;
    isSpeaking = false;
    if (mascot) mascot.classList.remove("speaking");
    if (mascotMouth) mascotMouth.classList.remove("talking");
  }

  // Interactive Buttons
  if (speakBtn) {
    speakBtn.addEventListener("click", speakMascotWish);
  }

  if (mascot) {
    mascot.addEventListener("click", speakMascotWish);
  }

  if (danceBtn) {
    danceBtn.addEventListener("click", () => {
      if (window.sound) sound.playCelebration();
      if (mascot) {
        mascot.classList.add("dancing");
        setTimeout(() => mascot.classList.remove("dancing"), 2500);
      }
      if (typeof confetti === "function") {
        confetti({ particleCount: 45, spread: 80, origin: { y: 0.65 } });
      }
      showToast("💃 Mascot is doing a birthday dance for Pihu!");
    });
  }

  if (cheerBtn) {
    cheerBtn.addEventListener("click", () => {
      if (window.sound) sound.playPop();
      if (typeof confetti === "function") {
        confetti({ particleCount: 30, spread: 70, origin: { y: 0.7 } });
      }

      // Spawn floating heart balloons
      const emojis = ["🎈", "💖", "✨", "⭐", "🎉", "🎂"];
      for (let i = 0; i < 6; i++) {
        const balloon = document.createElement("div");
        balloon.textContent = emojis[i % emojis.length];
        balloon.style.position = "absolute";
        balloon.style.left = `${30 + (i * 12)}%`;
        balloon.style.bottom = "80px";
        balloon.style.fontSize = "2rem";
        balloon.style.pointerEvents = "none";
        balloon.style.zIndex = "10";
        balloon.style.transition = "all 2s ease-out";
        balloon.style.opacity = "1";

        if (stage) stage.appendChild(balloon);

        setTimeout(() => {
          balloon.style.transform = `translateY(-${140 + Math.random() * 80}px) scale(1.4)`;
          balloon.style.opacity = "0";
        }, 50);

        setTimeout(() => balloon.remove(), 2100);
      }
      showToast("🎈 Warm birthday wishes floating to Pihu!");
    });
  }

  // Auto-greet slightly after arriving
  setTimeout(() => {
    if (!scene45Initialized) return;
    speakMascotWish();
  }, 700);
}

/**
 * ============================================================================
 * SCENE 5: BLESSINGS GARDEN (Enchanted Fairytale Garden)
 * ============================================================================
 */
let scene5Initialized = false;

function initScene5() {
  if (scene5Initialized) return;
  scene5Initialized = true;

  const stage = document.getElementById("garden-stage");
  const plotsContainer = document.getElementById("garden-plots-container");
  const countEl = document.getElementById("blessings-bloom-count");
  const magicWaterBtn = document.getElementById("garden-magic-water-btn");
  const plantNextBtn = document.getElementById("garden-plant-next-btn");
  const resetBtn = document.getElementById("garden-reset-btn");
  const hintLabel = document.getElementById("garden-hint-label");

  // Garden Blessing Modal elements
  const modal = document.getElementById("garden-blessing-modal");
  const modalClose = document.getElementById("garden-modal-close");
  const modalText = document.getElementById("garden-modal-text");
  const modalIcon = document.getElementById("garden-modal-icon");
  const modalTitle = document.getElementById("garden-modal-title");

  const GARDEN_FLOWERS = [
    { id: 1, name: "Cherry Blossom", emoji: "🌸", title: "Confidence & Grace" },
    { id: 2, name: "Golden Sunflower", emoji: "🌻", title: "Warmth & Joy" },
    { id: 3, name: "Royal Tulip", emoji: "🌷", title: "Inner Composure" },
    { id: 4, name: "Velvet Rose", emoji: "🌹", title: "Courage & Strength" },
    { id: 5, name: "Mystic Lotus", emoji: "🪷", title: "Wisdom & Clarity" },
    { id: 6, name: "Sunshine Daisy", emoji: "🌼", title: "Laughter & Smiles" },
    { id: 7, name: "Coral Hibiscus", emoji: "🌺", title: "Spark & Energy" },
    { id: 8, name: "Starlight Bouquet", emoji: "💐", title: "Limitless Dreams" }
  ];

  let bloomedPlots = new Set();
  let celebrationFired = false;
  const maxBlessings = Math.min(CONFIG.blessings.length, GARDEN_FLOWERS.length);

  function openBlessingModal(flower, blessingText) {
    if (!modal) return;
    if (modalIcon) modalIcon.textContent = flower.emoji;
    if (modalTitle) modalTitle.textContent = `${flower.name} • ${flower.title}`;
    if (modalText) modalText.textContent = blessingText;
    modal.classList.add("active");
    if (window.sound) sound.playChime();
  }

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      if (modal) modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  // Render 8 garden beds
  function renderPlots() {
    if (!plotsContainer) return;
    plotsContainer.innerHTML = "";

    for (let i = 0; i < maxBlessings; i++) {
      const fl = GARDEN_FLOWERS[i];
      const isBloomed = bloomedPlots.has(i);

      const plotEl = document.createElement("div");
      plotEl.className = "garden-plot";
      plotEl.dataset.plotIndex = i;
      plotEl.setAttribute("role", "button");
      plotEl.setAttribute("tabindex", "0");
      plotEl.setAttribute("aria-label", `Garden plot ${i + 1}: ${fl.name}`);

      if (isBloomed) {
        plotEl.innerHTML = `
          <div class="plot-bloomed-flower">
            <span class="flower-tag-pill">${fl.name} ✨</span>
            <div class="flower-petals-wrap">${fl.emoji}</div>
            <div class="flower-stem-lush">
              <span class="stem-leaf-left"></span>
              <span class="stem-leaf-right"></span>
            </div>
          </div>
          <div class="plot-mound">
            <div class="plot-pebbles"><span>•</span><span>•</span><span>•</span></div>
          </div>
        `;
      } else {
        plotEl.innerHTML = `
          <div class="plot-seedling">
            <span class="seed-icon">🌱</span>
            <span class="seed-tag">Plot #${i + 1}</span>
          </div>
          <div class="plot-mound">
            <div class="plot-pebbles"><span>•</span><span>•</span><span>•</span></div>
          </div>
        `;
      }

      plotEl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (bloomedPlots.has(i)) {
          // Open blessing modal
          openBlessingModal(fl, CONFIG.blessings[i]);
        } else {
          bloomPlot(i, true);
        }
      });

      plotsContainer.appendChild(plotEl);
    }
  }

  function bloomPlot(index, showModal = true) {
    if (bloomedPlots.has(index)) return;
    bloomedPlots.add(index);

    const fl = GARDEN_FLOWERS[index];
    const blessing = CONFIG.blessings[index];

    if (window.sound) sound.playSparkle();

    // Re-render plots
    renderPlots();

    if (countEl) countEl.textContent = `${bloomedPlots.size}/${maxBlessings}`;
    if (hintLabel) hintLabel.textContent = `Tap any bloomed flower to view blessing ✨`;

    if (showModal) {
      setTimeout(() => {
        openBlessingModal(fl, blessing);
      }, 350);
    }

    // Check celebration
    if (bloomedPlots.size === maxBlessings && !celebrationFired) {
      celebrationFired = true;
      triggerGardenCelebration();
    }
  }

  function triggerGardenCelebration() {
    if (window.sound) sound.playCelebration();
    showToast("🌸 The Garden of Blessings is in Full Radiant Bloom for Pihu! 🦋✨");

    // Add rainbow arch
    if (stage && !stage.querySelector(".garden-rainbow")) {
      const rainbow = document.createElement("div");
      rainbow.className = "garden-rainbow";
      stage.appendChild(rainbow);
    }

    // Release 3D fluttering butterflies
    if (stage) {
      const bEmojis = ["🦋", "✨", "🦋", "🌸"];
      for (let i = 0; i < 4; i++) {
        const b = document.createElement("div");
        b.className = "fluttering-butterfly";
        b.textContent = bEmojis[i % bEmojis.length];
        b.style.top = `${15 + (i * 20)}%`;
        b.style.animationDelay = `${i * 1.5}s`;
        stage.appendChild(b);
      }
    }

    if (typeof confetti === "function") {
      confetti({ particleCount: 70, spread: 90, origin: { y: 0.65 } });
    }
  }

  // Magic Bloom All button (cascading wave)
  if (magicWaterBtn) {
    magicWaterBtn.addEventListener("click", () => {
      let delay = 0;
      for (let i = 0; i < maxBlessings; i++) {
        if (!bloomedPlots.has(i)) {
          setTimeout(() => {
            bloomPlot(i, false);
          }, delay);
          delay += 350;
        }
      }
      if (delay > 0) {
        showToast("🪄💧 Magic watering can is blooming all flowers!");
      } else {
        showToast("🌸 All flowers are already in full bloom!");
      }
    });
  }

  // Sprout Next button
  if (plantNextBtn) {
    plantNextBtn.addEventListener("click", () => {
      for (let i = 0; i < maxBlessings; i++) {
        if (!bloomedPlots.has(i)) {
          bloomPlot(i, true);
          return;
        }
      }
      showToast("🌸 All 8 flowers have bloomed!");
    });
  }

  // Reset Garden button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      bloomedPlots.clear();
      celebrationFired = false;
      renderPlots();
      if (countEl) countEl.textContent = `0/${maxBlessings}`;
      if (hintLabel) hintLabel.textContent = `Tap soil or plots to bloom a flower 🌷`;
      if (stage) {
        const rainbow = stage.querySelector(".garden-rainbow");
        if (rainbow) rainbow.remove();
        stage.querySelectorAll(".fluttering-butterfly").forEach(el => el.remove());
        stage.querySelectorAll(".bloomed-wild-flower").forEach(el => el.remove());
      }
      showToast("🌱 Garden refreshed — ready to bloom again!");
    });
  }

  // Free tapping anywhere on soil
  if (stage) {
    stage.addEventListener("click", (e) => {
      if (e.target.closest(".garden-plot") || e.target.closest(".garden-toolbar") || e.target.closest("#garden-blessing-modal")) {
        return;
      }

      // Check if there are unbloomed plots first
      for (let i = 0; i < maxBlessings; i++) {
        if (!bloomedPlots.has(i)) {
          bloomPlot(i, true);
          return;
        }
      }

      // If all bloomed, spawn bonus sparkling wild flower at click point
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (y > rect.height * 0.3) {
        if (window.sound) sound.playSparkle();
        const wildFlower = document.createElement("div");
        wildFlower.className = "bloomed-wild-flower";
        wildFlower.style.left = `${x}px`;
        wildFlower.style.top = `${y}px`;

        const wildEmojis = ["🌸", "🌺", "🌼", "🌷", "✨"];
        const randEmoji = wildEmojis[Math.floor(Math.random() * wildEmojis.length)];

        wildFlower.innerHTML = `
          <div style="font-size: 1.8rem; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));">${randEmoji}</div>
          <div style="width: 3px; height: 28px; background: #4ade80; border-radius: 2px;"></div>
        `;
        stage.appendChild(wildFlower);

        setTimeout(() => wildFlower.remove(), 4000);
      }
    });
  }

  // Spawn fireflies
  for (let i = 0; i < 10; i++) {
    const fly = document.createElement("div");
    fly.className = "firefly";
    fly.style.left = `${Math.random() * 88 + 4}%`;
    fly.style.top = `${Math.random() * 70 + 5}%`;
    fly.style.animationDelay = `${Math.random() * 4}s`;
    fly.setAttribute("aria-hidden", "true");
    if (stage) stage.appendChild(fly);
  }

  // Initial render of garden plots
  renderPlots();
}

/**
 * ============================================================================
 * SCENE 6: MEMORY LANE & MINI-GAME (Catch the Cake Slices)
 * ============================================================================
 */
let scene6Initialized = false;
let gameRunning = false;
let gameSpawnTimer = null;
let gameCountdownTimer = null;
let score = 0;
let timeLeft = 20;

function initScene6() {
  if (scene6Initialized) return;
  scene6Initialized = true;

  const traitsDeck = document.getElementById("traits-deck");
  const tabTraits = document.getElementById("tab-traits");
  const tabGame = document.getElementById("tab-game");
  const gameWrap = document.getElementById("game-wrap");

  // Render trait cards (6 cards flip and flip back)
  if (traitsDeck) {
    traitsDeck.innerHTML = "";
    CONFIG.traits.forEach((t) => {
      const card = document.createElement("div");
      card.className = "trait-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${t.name}: tap to reveal`);
      card.innerHTML = `
        <div class="trait-card-inner">
          <div class="trait-card-front">
            <span class="trait-emoji" aria-hidden="true">${t.emoji}</span>
            <span class="trait-name">${t.name}</span>
          </div>
          <div class="trait-card-back">
            <p>${t.desc}</p>
          </div>
        </div>
      `;
      const flipCard = () => {
        sound.playChime(700);
        card.classList.toggle("flipped");
      };
      card.addEventListener("click", flipCard);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipCard(); }
      });
      traitsDeck.appendChild(card);
    });
  }

  // Tab switching
  if (tabTraits && tabGame && gameWrap) {
    tabTraits.addEventListener("click", () => {
      tabTraits.classList.add("active");
      tabGame.classList.remove("active");
      if (traitsDeck) traitsDeck.style.display = "grid";
      gameWrap.classList.remove("active");
    });

    tabGame.addEventListener("click", () => {
      tabGame.classList.add("active");
      tabTraits.classList.remove("active");
      if (traitsDeck) traitsDeck.style.display = "none";
      gameWrap.classList.add("active");
      startMiniGame();
    });
  }
}

function startMiniGame() {
  // Stop existing game cleanly
  stopMiniGame();
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  timeLeft = 20;

  const scoreEl = document.getElementById("game-score");
  const timerEl = document.getElementById("game-timer");
  const stage = document.getElementById("game-stage");
  const plate = document.getElementById("catcher-plate");

  if (scoreEl) scoreEl.textContent = `Score: ${score}`;
  if (timerEl) timerEl.textContent = `Time: ${timeLeft}s`;

  // Clear leftover items from previous round
  if (stage) {
    stage.querySelectorAll(".falling-item").forEach(el => el.remove());
  }

  // Plate starts centered
  if (plate && stage) {
    const stageW = stage.getBoundingClientRect().width;
    plate.style.left = `${stageW / 2}px`;
    plate.style.transform = "translateX(-50%)";
  }

  // Lock swipe when game is active
  if (window.nav) window.nav.lockSwipe();

  // Plate control — prevent page scroll on touch
  function movePlate(clientX) {
    if (!stage || !plate) return;
    const rect = stage.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(36, Math.min(rect.width - 36, x));
    plate.style.left = `${x}px`;
    plate.style.transform = "translateX(-50%)";
  }

  const mouseMoveHandler = (e) => movePlate(e.clientX);
  const touchMoveHandler = (e) => {
    e.preventDefault(); // prevent page scroll during game
    if (e.touches[0]) movePlate(e.touches[0].clientX);
  };

  if (stage) {
    stage.addEventListener("mousemove", mouseMoveHandler);
    stage.addEventListener("touchmove", touchMoveHandler, { passive: false });
  }

  // Item spawner
  const items = ["🍰", "🧁", "⭐", "🍓", "💖"];
  const itemIntervals = [];

  gameSpawnTimer = setInterval(() => {
    if (!gameRunning) { clearInterval(gameSpawnTimer); return; }
    const itemEl = document.createElement("div");
    itemEl.className = "falling-item";
    itemEl.textContent = items[Math.floor(Math.random() * items.length)];
    itemEl.setAttribute("aria-hidden", "true");
    const leftPct = Math.random() * 70 + 10;
    itemEl.style.left = `${leftPct}%`;
    itemEl.style.top = "0px";
    itemEl.style.transform = "translate(-50%, 0)";
    if (stage) stage.appendChild(itemEl);

    let itemY = 0;
    const fallSpeed = Math.random() * 2 + 3;
    const anim = setInterval(() => {
      if (!gameRunning) { clearInterval(anim); if (itemEl.parentNode) itemEl.remove(); return; }
      itemY += fallSpeed;
      itemEl.style.top = `${itemY}px`;

      if (plate && itemEl.parentNode) {
        const plateRect = plate.getBoundingClientRect();
        const itemRect = itemEl.getBoundingClientRect();
        if (
          itemRect.bottom >= plateRect.top &&
          itemRect.top <= plateRect.bottom &&
          itemRect.right >= plateRect.left &&
          itemRect.left <= plateRect.right
        ) {
          sound.playPop();
          score += 10;
          if (scoreEl) scoreEl.textContent = `Score: ${score}`;
          clearInterval(anim);
          if (itemEl.parentNode) itemEl.remove();
          return;
        }
      }

      if (stage && itemY > stage.getBoundingClientRect().height + 30) {
        clearInterval(anim);
        if (itemEl.parentNode) itemEl.remove();
      }
    }, 20);
    itemIntervals.push(anim);
  }, 700);

  // Game countdown
  gameCountdownTimer = setInterval(() => {
    timeLeft--;
    if (timerEl) timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      stopMiniGame();
      // Clean up stage listeners
      if (stage) {
        stage.removeEventListener("mousemove", mouseMoveHandler);
        stage.removeEventListener("touchmove", touchMoveHandler);
      }
      if (window.nav) window.nav.unlockSwipe();

      sound.playCelebration();
      let msg = score >= 100 ? "🌟 Amazing!" : score >= 50 ? "💖 Well done!" : "🎉 Great try!";
      showToast(`🏆 Game Over! Score: ${score}! ${msg}`);
      if (typeof confetti === "function") {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }

      // Show replay button
      const replayGameBtn = document.getElementById("replay-game-btn");
      if (replayGameBtn) replayGameBtn.style.display = "inline-flex";
    }
  }, 1000);
}

function stopMiniGame() {
  gameRunning = false;
  if (gameSpawnTimer) { clearInterval(gameSpawnTimer); gameSpawnTimer = null; }
  if (gameCountdownTimer) { clearInterval(gameCountdownTimer); gameCountdownTimer = null; }
  // Remove leftover items
  const stage = document.getElementById("game-stage");
  if (stage) stage.querySelectorAll(".falling-item").forEach(el => el.remove());
}

/**
 * ============================================================================
 * SCENE 7: CAKE & GRAND FINALE
 * ============================================================================
 */
let scene7Initialized = false;

function initScene7() {
  if (scene7Initialized) return;
  scene7Initialized = true;

  const candles = document.querySelectorAll(".candle");
  const finaleCelebration = document.getElementById("finale-celebration");
  let extinguishedCount = 0;
  const totalCandles = candles.length;
  let finaleFired = false;

  function extinguishCandle(candle) {
    if (candle.classList.contains("extinguished")) return;
    candle.classList.add("extinguished");
    sound.playPuff();
    extinguishedCount++;
    if (extinguishedCount === totalCandles && !finaleFired) {
      finaleFired = true;
      showToast("✨ Make a wish, Pihu! ✨");
      setTimeout(triggerGrandFinale, 1000);
    }
  }

  // Tap candles (keyboard accessible)
  candles.forEach((c) => {
    c.addEventListener("click", () => extinguishCandle(c));
    c.setAttribute("tabindex", "0");
    c.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); extinguishCandle(c); }
    });
  });

  // Microphone blow detection
  const micBtn = document.getElementById("mic-blow-btn");
  if (micBtn) {
    micBtn.addEventListener("click", async () => {
      // Fallback for file:// and blocked origins
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast("Mic not available here — tap the candles directly! 🕯️");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        const mic = ctx.createMediaStreamSource(stream);
        mic.connect(analyser);
        analyser.fftSize = 512;
        const buffer = new Uint8Array(analyser.frequencyBinCount);

        showToast("🎙️ Listening! Blow gently now!");
        micBtn.textContent = "🎙️ Listening...";
        micBtn.disabled = true;

        // Use only LOW frequency bins (breath is low-freq) to avoid music false triggers
        const checkBlow = () => {
          if (extinguishedCount >= totalCandles) {
            stream.getTracks().forEach((t) => t.stop());
            ctx.close();
            return;
          }
          analyser.getByteFrequencyData(buffer);
          // Only check first 8 bins (low frequencies = real breath)
          let lowSum = 0;
          for (let i = 0; i < 8; i++) lowSum += buffer[i];
          const lowAvg = lowSum / 8;

          if (lowAvg > 55) {
            candles.forEach((c) => extinguishCandle(c));
            stream.getTracks().forEach((t) => t.stop());
            ctx.close();
          } else {
            requestAnimationFrame(checkBlow);
          }
        };
        checkBlow();
      } catch (err) {
        showToast("Mic access denied — tap the candles to blow them out! 🕯️");
        micBtn.textContent = "🎙️ Blow with Microphone";
        micBtn.disabled = false;
      }
    });
  }

  function triggerGrandFinale() {
    sound.playCelebration();
    if (finaleCelebration) finaleCelebration.classList.add("active");

    // Show paper plane coupon book button
    const plane = document.getElementById("paper-plane-btn");
    if (plane) plane.style.display = "flex";

    if (typeof confetti === "function") {
      const duration = 4.5 * 1000;
      const animationEnd = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.8 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.8 } });
        if (Date.now() < animationEnd) requestAnimationFrame(frame);
      };
      frame();
    }

    // Show wish jar section
    const wishJarSection = document.getElementById("wish-jar-section");
    if (wishJarSection) {
      wishJarSection.style.display = "block";
      initWishJar();
    }
  }

  // Action Buttons
  const replayBtn = document.getElementById("replay-journey-btn");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      // Full reset
      extinguishedCount = 0;
      finaleFired = false;
      if (finaleCelebration) finaleCelebration.classList.remove("active");
      candles.forEach(c => c.classList.remove("extinguished"));
      if (window.resetAllScenes) window.resetAllScenes();
      if (window.nav) window.nav.goToScene(0);
      scene4Initialized = false; // allow letter re-render
    });
  }

  const replyBtn = document.getElementById("reply-saksham-btn");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
      window.open(url, "_blank");
    });
  }

  const wallpaperBtn = document.getElementById("save-wallpaper-btn");
  if (wallpaperBtn) {
    wallpaperBtn.addEventListener("click", () => downloadWallpaper());
  }

  const replayGameBtn = document.getElementById("replay-game-btn");
  if (replayGameBtn) {
    replayGameBtn.addEventListener("click", () => {
      replayGameBtn.style.display = "none";
      startMiniGame();
    });
  }
}

/**
 * Global Scene Enter Hook — called by NavigationController.goToScene
 * DOM order: 0=gift, 1=countdown, 2=portrait, 3=sky, 4=letter, 5=voice-note, 6=garden, 7=memory, 8=cake
 */
window.onSceneEnter = function (sceneIndex) {
  const event = new CustomEvent("sceneChange", { detail: sceneIndex });
  window.dispatchEvent(event);

  // Apply sky time-of-day gradient (C-8)
  if (sceneIndex === 3) {
    applySkyTimeGradient();
  }

  switch (sceneIndex) {
    case 2: initScene2(); break;
    case 3: initScene3(); break;
    case 4: initScene4(); break;
    case 5: initScene45(); break;
    case 6: initScene5(); break;
    case 7: initScene6(); break;
    case 8: initScene7(); break;
  }
};

// Part C-8: Apply time-of-day gradient to wishes sky
function applySkyTimeGradient() {
  const skyWrap = document.getElementById("wishes-sky-wrap");
  if (!skyWrap) return;
  const hour = new Date().getHours();
  skyWrap.classList.remove("time-morning", "time-afternoon", "time-evening", "time-night");
  if (hour >= 5 && hour < 12) skyWrap.classList.add("time-morning");
  else if (hour >= 12 && hour < 17) skyWrap.classList.add("time-afternoon");
  else if (hour >= 17 && hour < 23) skyWrap.classList.add("time-evening");
  else skyWrap.classList.add("time-night");
}

// Initialize scenes that are visible from start
window.addEventListener("DOMContentLoaded", () => {
  initScene0();
  initScene1();
  // Scenes 2-8 initialized lazily on first enter via onSceneEnter
});

