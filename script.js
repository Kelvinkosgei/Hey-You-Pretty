const ready = () => {
  const heroCta = document.getElementById("hero-cta");
  const storySection = document.getElementById("story");
  const typingText = document.getElementById("typing-text");
  const revealCards = document.querySelectorAll(".reveal-card");
  const curiousBtn = document.getElementById("curious-btn");
  const questionArea = document.getElementById("question-area");
  const answerMessage = document.getElementById("answer-message");
  const yesBtn = document.getElementById("yes-btn");
  const convinceBtn = document.getElementById("convince-btn");
  const confettiContainer = document.getElementById("confetti");
  const chatWidget = document.getElementById("chat-widget");
  const chatToggle = document.getElementById("chat-toggle");
  const chatMessages = document.getElementById("chat-messages");
  const chatOptions = document.querySelectorAll(".chat-option");
  const musicToggle = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");
  const heroHearts = document.getElementById("hero-hearts");
  const floatingGirls = document.getElementById("floating-girls");
  const quizCards = document.querySelectorAll(".quiz-card");
  const tiltElements = document.querySelectorAll(".tilt");
  const quizFeedback = document.getElementById("compatibility-feedback");
  const quizResult = document.getElementById("compatibility-result");
  const secretHeart = document.getElementById("secret-heart");
  const secretModal = document.getElementById("secret-modal");
  const modalClose = document.getElementById("modal-close");
  const secretHearts = document.getElementById("secret-hearts");

  if (heroCta && storySection) {
    heroCta.addEventListener("click", () => {
      storySection.scrollIntoView({ behavior: "smooth" });
    });
  }

  revealCards.forEach((card) => {
    const toggleOpen = () => {
      card.classList.toggle("open");
    };
    card.addEventListener("click", toggleOpen);
    card.addEventListener("keypress", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleOpen();
      }
    });
  });

  let typingStarted = false;
  const startTyping = () => {
    if (!typingText || typingStarted) return;
    typingStarted = true;
    const fullText = typingText.dataset.text || "";
    let index = 0;
    const interval = setInterval(() => {
      typingText.textContent = fullText.slice(0, index);
      index += 1;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 35);
  };

  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          if (entry.target === storySection) {
            startTyping();
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  revealElements.forEach((el) => observer.observe(el));

  const supportsHover = window.matchMedia("(hover: hover)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (supportsHover) {
    tiltElements.forEach((element) => {
      let bounds;
      const handleMove = (event) => {
        if (!bounds) {
          bounds = element.getBoundingClientRect();
        }
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        const percentX = (x / bounds.width) * 2 - 1;
        const percentY = (y / bounds.height) * 2 - 1;
        const rotateX = Math.max(Math.min(percentY * -8, 8), -8);
        const rotateY = Math.max(Math.min(percentX * 8, 8), -8);
        element.style.setProperty("--tilt-x", `${rotateX}deg`);
        element.style.setProperty("--tilt-y", `${rotateY}deg`);
      };
      const resetTilt = () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
        bounds = null;
      };
      element.addEventListener("mousemove", handleMove);
      element.addEventListener("mouseleave", resetTilt);
    });
  }

  if (supportsHover && !prefersReducedMotion) {
    let lastTrailTime = 0;
    window.addEventListener("mousemove", (event) => {
      const now = performance.now();
      if (now - lastTrailTime < 40) return;
      lastTrailTime = now;
      const trail = document.createElement("span");
      trail.className = "trail-heart";
      const size = 6 + Math.random() * 6;
      trail.style.width = `${size}px`;
      trail.style.height = `${size}px`;
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;
      document.body.appendChild(trail);
      setTimeout(() => {
        trail.remove();
      }, 1200);
    });
  }

  if (floatingGirls) {
    const count = 9;
    const basePositions = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 100);
    for (let i = 0; i < count; i += 1) {
      const img = document.createElement("img");
      img.className = "floating-girl";
      img.src = "images/girl.jpeg";
      img.alt = "";
      const size = 90 + Math.random() * 90;
      const startX = basePositions[i] + (Math.random() - 0.5) * 10;
      const drift = (Math.random() - 0.5) * 22;
      const endX = Math.max(Math.min(startX + drift, 110), -10);
      const startY = 100 + Math.random() * 40;
      const endY = -40 - Math.random() * 40;
      const duration = 22 + Math.random() * 18;
      const delay = Math.random() * 12 * -1;
      const rotStart = (Math.random() - 0.5) * 16;
      const rotEnd = rotStart + (Math.random() - 0.5) * 12;
      const alpha = 0.35 + Math.random() * 0.2;

      img.style.setProperty("--size", `${size}px`);
      img.style.setProperty("--start-x", `${startX}vw`);
      img.style.setProperty("--end-x", `${endX}vw`);
      img.style.setProperty("--start-y", `${startY}vh`);
      img.style.setProperty("--end-y", `${endY}vh`);
      img.style.setProperty("--duration", `${duration}s`);
      img.style.setProperty("--delay", `${delay}s`);
      img.style.setProperty("--start-rot", `${rotStart}deg`);
      img.style.setProperty("--end-rot", `${rotEnd}deg`);
      img.style.setProperty("--alpha", alpha.toFixed(2));

      floatingGirls.appendChild(img);
    }
  }

  if (curiousBtn && questionArea) {
    curiousBtn.addEventListener("click", () => {
      questionArea.classList.add("show");
    });
  }

  const clearAnswer = () => {
    if (answerMessage) {
      answerMessage.textContent = "";
    }
  };

  if (convinceBtn) {
    convinceBtn.addEventListener("click", () => {
      if (answerMessage) {
        answerMessage.textContent = "Fair enough. Coffee is on me.";
      }
    });
  }

  const launchConfetti = () => {
    if (!confettiContainer) return;
    const colors = ["#ff4d6d", "#ff758f", "#ffd6e0", "#ffffff"];
    confettiContainer.innerHTML = "";
    for (let i = 0; i < 80; i += 1) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 0.2}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiContainer.appendChild(piece);
    }
    setTimeout(() => {
      confettiContainer.innerHTML = "";
    }, 1800);
  };

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      if (answerMessage) {
        answerMessage.textContent = "Good choice. I was hoping you'd say that.";
      }
      launchConfetti();
    });
  }

  if (questionArea) {
    questionArea.addEventListener("transitionend", clearAnswer, { once: true });
  }

  const chatReplies = {
    why: "Because you deserve something more thoughtful than a one-line text.",
    think:
      "You feel like a calm storm in the best way. Easy to talk to. Hard to ignore.",
    date:
      "Call it a low-pressure adventure invitation. The answer can be yes or yes.",
  };

  const addChatMessage = (text, type = "bot") => {
    if (!chatMessages) return;
    const message = document.createElement("div");
    message.className = `chat-message ${type}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  chatOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const key = option.dataset.key;
      const label = option.textContent || "";
      addChatMessage(label, "user");
      setTimeout(() => {
        addChatMessage(chatReplies[key] || "Let me get back to you on that.");
      }, 450);
    });
  });

  if (chatToggle && chatWidget) {
    chatToggle.addEventListener("click", () => {
      chatWidget.classList.toggle("collapsed");
    });
  }

  const toggleMusic = async () => {
    if (!musicToggle || !bgMusic) return;
    try {
      if (bgMusic.paused) {
        bgMusic.volume = 0.6;
        await bgMusic.play();
        musicToggle.textContent = "Pause music";
        musicToggle.setAttribute("aria-pressed", "true");
      } else {
        bgMusic.pause();
        musicToggle.textContent = "Play music";
        musicToggle.setAttribute("aria-pressed", "false");
      }
    } catch (error) {
      musicToggle.textContent = "Play music";
      musicToggle.setAttribute("aria-pressed", "false");
    }
  };

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", () => {
      toggleMusic();
    });
  }

  if (bgMusic) {
    bgMusic.volume = 0.6;
  }

  const spawnHeart = () => {
    if (!heroHearts) return;
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤";
    const size = 12 + Math.random() * 14;
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = "-20px";
    heart.style.animationDuration = `${8 + Math.random() * 8}s`;
    heroHearts.appendChild(heart);
    setTimeout(() => heart.remove(), 16000);
  };

  setInterval(spawnHeart, 900);

  let answeredCount = 0;
  const quizMessages = [
    "That choice feels like a scene from a good movie.",
    "That answer just upgraded the vibe level.",
    "That is a seriously compatible pick.",
  ];
  quizCards.forEach((card) => {
    const options = card.querySelectorAll(".quiz-option");
    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (card.classList.contains("answered")) return;
        card.classList.add("answered");
        option.classList.add("selected");
        options.forEach((btn) => {
          btn.disabled = true;
        });
        answeredCount += 1;
        if (quizFeedback) {
          const messageIndex = Number(card.dataset.question) || 0;
          const message = quizMessages[messageIndex] || quizMessages[0];
          quizFeedback.textContent = `${message} Good answer, that increases our compatibility score.`;
        }
        if (answeredCount === quizCards.length && quizResult) {
          quizResult.textContent = "Compatibility result: suspiciously high.";
        }
      });
    });
  });

  const openSecret = () => {
    if (!secretModal) return;
    secretModal.classList.add("show");
    if (secretHearts) {
      secretHearts.innerHTML = "";
      for (let i = 0; i < 14; i += 1) {
        const heart = document.createElement("span");
        heart.className = "secret-heart-float";
        heart.textContent = "❤";
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.fontSize = `${12 + Math.random() * 18}px`;
        heart.style.animationDelay = `${Math.random() * 6}s`;
        secretHearts.appendChild(heart);
      }
    }
  };

  const closeSecret = () => {
    if (secretModal) {
      secretModal.classList.remove("show");
    }
  };

  if (secretHeart) {
    secretHeart.addEventListener("click", openSecret);
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeSecret);
  }

  if (secretModal) {
    secretModal.addEventListener("click", (event) => {
      if (event.target === secretModal) {
        closeSecret();
      }
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSecret();
    }
  });
};

document.addEventListener("DOMContentLoaded", ready);
