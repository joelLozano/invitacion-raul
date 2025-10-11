// Confetti Animation
class ConfettiGenerator {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.confetti = [];
    this.colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#ffd93d",
      "#6c5ce7",
      "#fd79a8",
      "#00b894",
      "#e17055",
    ];
    this.init();
  }

  init() {
    // Create canvas
    this.canvas = document.createElement("canvas");
    this.canvas.id = "confetti-canvas";
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "1000";

    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.resize();

    // Handle window resize
    window.addEventListener("resize", () => this.resize());

    // Start animation
    this.animate();

    // Generate confetti periodically
    setInterval(() => this.generateConfetti(), 300);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateConfetti() {
    const count = Math.random() * 3 + 2; // 2-5 pieces

    for (let i = 0; i < count; i++) {
      this.confetti.push({
        x: Math.random() * this.canvas.width,
        y: -10,
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: Math.random() * 3 + 2,
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        shape: Math.random() > 0.5 ? "circle" : "square",
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw confetti
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const piece = this.confetti[i];

      // Update position
      piece.x += piece.velocity.x;
      piece.y += piece.velocity.y;
      piece.rotation += piece.rotationSpeed;

      // Add some gravity and wind effect
      piece.velocity.y += 0.1;
      piece.velocity.x += Math.sin(piece.y * 0.01) * 0.1;

      // Fade out as it falls
      piece.opacity = Math.max(0, 1 - piece.y / this.canvas.height);

      // Draw confetti piece
      this.ctx.save();
      this.ctx.translate(piece.x, piece.y);
      this.ctx.rotate((piece.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = piece.opacity;

      if (piece.shape === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, piece.width / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = piece.color;
        this.ctx.fill();
      } else {
        this.ctx.fillStyle = piece.color;
        this.ctx.fillRect(
          -piece.width / 2,
          -piece.height / 2,
          piece.width,
          piece.height
        );
      }

      this.ctx.restore();

      // Remove confetti that's off screen
      if (piece.y > this.canvas.height + 50 || piece.opacity <= 0) {
        this.confetti.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Floating particles background effect
class FloatingParticles {
  constructor() {
    this.particles = [];
    this.init();
  }

  init() {
    // Create floating particles periodically
    setInterval(() => this.createParticle(), 2000);
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#ffd93d",
      "#6c5ce7",
      "#fd79a8",
      "#00b894",
      "#e17055",
    ];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particle.style.animationDelay = Math.random() * 2 + "s";

    document.body.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 8000);
  }
}

// Text animation effects
class TextAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Add letter-by-letter animation to the main title
    this.animateTitle();

    // Add staggered animation to list items
    this.animateListItems();

    // Add form submission celebration
    this.setupFormAnimation();
  }

  animateTitle() {
    const title = document.querySelector("h1");
    if (title) {
      const text = title.textContent;
      title.innerHTML = "";

      [...text].forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter;
        span.style.opacity = "0";
        span.style.transform = "translateY(-50px) rotateX(90deg)";
        span.style.display = "inline-block";
        span.style.transition =
          "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        span.style.transitionDelay = index * 0.05 + "s";

        title.appendChild(span);

        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0) rotateX(0deg)";
        }, 100 + index * 50);
      });
    }
  }

  animateListItems() {
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-30px) rotateY(-15deg)";
      item.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      item.style.transitionDelay = 1.2 + index * 0.2 + "s";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0) rotateY(0deg)";
      }, 1200 + index * 200);
    });
  }

  setupFormAnimation() {
    const form = document.getElementById("attendanceForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.sendWhatsAppMessage();
      });
    }
  }

  sendWhatsAppMessage() {
    // Get form data
    const nombreInput = document.getElementById("nombre");
    const asistenciaInputs = document.querySelectorAll(
      'input[name="asistencia"]'
    );

    let nombre = nombreInput.value.trim();
    let asistencia = "";

    // Get selected attendance option
    for (let input of asistenciaInputs) {
      if (input.checked) {
        asistencia = input.value;
        break;
      }
    }

    // Validate form
    if (!nombre) {
      alert("Por favor, ingresa tu nombre");
      nombreInput.focus();
      return;
    }

    if (!asistencia) {
      alert("Por favor, selecciona si asistirás o no");
      return;
    }

    // Create WhatsApp message
    let mensaje = `🎉 *Confirmación de Asistencia - Cumpleaños de Raúl* 🎂\n\n`;

    if (asistencia === "Sí") {
      mensaje += `✅ *Confirmación:* ¡SÍ ASISTIRÉ! 🎉\n\n`;
      mensaje += `¡Nos vemos en la fiesta! 🥳🎈`;
    } else {
      mensaje += `❌ *Confirmación:* No podré asistir 😔\n\n`;
      mensaje += `Lamento no poder acompañarte, pero le deseo un feliz cumpleaños! 🎂💝`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(mensaje);

    // WhatsApp phone number (remove spaces and special characters)
    const phoneNumber = "525527498383";

    // Enhanced iOS detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOSSafari = isIOS && isSafari;

    // Show celebration first
    this.celebrateSubmission();

    if (isIOSSafari) {
      // For iOS Safari, show immediate button since automatic opening is restricted
      // No setTimeout to preserve user gesture
      this.showWhatsAppButton(phoneNumber, encodedMessage);
    } else {
      // For other browsers, try automatic opening with minimal delay
      setTimeout(() => {
        this.openWhatsApp(phoneNumber, encodedMessage);
      }, 500);
    }
  }

  openWhatsApp(phoneNumber, encodedMessage) {
    // Enhanced mobile detection
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isMobile) {
      // For mobile devices, use different approaches
      const webUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      if (isIOS) {
        // iOS Safari specific handling
        // Safari blocks app URLs that aren't triggered directly by user interaction
        // So we use wa.me which handles the app/web routing automatically

        // First, try to detect if we're in Safari
        const isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );

        if (isSafari) {
          // For Safari, use wa.me directly as it handles the app detection
          window.open(webUrl, "_blank");
        } else {
          // For other iOS browsers (like Chrome), try app URL first
          const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

          try {
            // Create iframe method for iOS Chrome
            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = appUrl;
            document.body.appendChild(iframe);

            // Cleanup iframe after attempting to open app
            setTimeout(() => {
              document.body.removeChild(iframe);
            }, 1000);

            // Fallback to web version
            setTimeout(() => {
              window.open(webUrl, "_blank");
            }, 1500);
          } catch (e) {
            // If iframe method fails, use web version
            window.open(webUrl, "_blank");
          }
        }
      } else if (isAndroid) {
        // Android handling
        const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

        // Try intent URL for Android (more reliable)
        const intentUrl = `intent://send?phone=${phoneNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end`;

        try {
          // Try app URL first
          window.location.href = appUrl;

          // Fallback to web version if app doesn't open
          setTimeout(() => {
            window.open(webUrl, "_blank");
          }, 2000);
        } catch (e) {
          // If direct method fails, try intent URL
          try {
            window.location.href = intentUrl;
            setTimeout(() => {
              window.open(webUrl, "_blank");
            }, 2000);
          } catch (e2) {
            // Final fallback to web version
            window.open(webUrl, "_blank");
          }
        }
      } else {
        // Other mobile devices - use web version directly
        window.open(webUrl, "_blank");
      }
    } else {
      // Desktop handling
      const webWhatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
      const mobileUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Try web WhatsApp first
      const newWindow = window.open(webWhatsappUrl, "_blank");

      // Provide alternative if web WhatsApp doesn't work
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed == "undefined"
      ) {
        // If popup was blocked, use mobile version
        window.open(mobileUrl, "_blank");
      } else {
        // Offer mobile alternative after a delay
        setTimeout(() => {
          const useMobile = confirm(
            '💡 ¿No tienes WhatsApp Web? Haz clic en "Aceptar" para usar WhatsApp en tu teléfono móvil.'
          );
          if (useMobile) {
            window.open(mobileUrl, "_blank");
          }
        }, 4000);
      }
    }
  }

  showWhatsAppButton(phoneNumber, encodedMessage) {
    // Create a special button for iOS Safari
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.style.position = "fixed";
    buttonContainer.style.top = "50%";
    buttonContainer.style.left = "50%";
    buttonContainer.style.transform = "translate(-50%, -50%)";
    buttonContainer.style.zIndex = "2000";
    buttonContainer.style.textAlign = "center";
    buttonContainer.style.background = "rgba(0,0,0,0.8)";
    buttonContainer.style.padding = "30px";
    buttonContainer.style.borderRadius = "20px";
    buttonContainer.style.color = "white";
    buttonContainer.style.maxWidth = "90%";
    buttonContainer.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";

    buttonContainer.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #4ecdc4;">¡Confirmación Lista! 🎉</h3>
        <p style="margin: 0; font-size: 0.9em; opacity: 0.9;">Toca el botón para enviar tu confirmación por WhatsApp</p>
      </div>
      <button id="whatsappBtn" style="
        background: linear-gradient(45deg, #25D366, #128C7E);
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 1.1em;
        font-weight: bold;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
        transition: all 0.3s ease;
        margin-bottom: 15px;
        display: block;
        width: 100%;
      ">📱 Abrir WhatsApp</button>
      <button id="closeBtn" style="
        background: transparent;
        color: #ccc;
        border: 1px solid #666;
        padding: 8px 20px;
        font-size: 0.9em;
        border-radius: 20px;
        cursor: pointer;
      ">Cerrar</button>
    `;

    document.body.appendChild(buttonContainer);

    // Add button animations
    const whatsappBtn = buttonContainer.querySelector("#whatsappBtn");
    const closeBtn = buttonContainer.querySelector("#closeBtn");

    whatsappBtn.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
      this.style.boxShadow = "0 8px 25px rgba(37, 211, 102, 0.4)";
    });

    whatsappBtn.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 5px 15px rgba(37, 211, 102, 0.3)";
    });

    // Handle button clicks
    whatsappBtn.addEventListener("click", () => {
      // For iOS Safari, try multiple methods to ensure WhatsApp opens
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isIOS) {
        // Method 1: Try app URL scheme first
        const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

        try {
          // Direct navigation for iOS
          window.location.href = appUrl;

          // Fallback to web version after short delay if app doesn't open
          setTimeout(() => {
            // Check if we're still on the page (app didn't open)
            if (!document.hidden) {
              window.location.href = webUrl;
            }
          }, 1000);
        } catch (e) {
          // If app URL fails, use web version
          window.location.href = webUrl;
        }
      } else {
        // For non-iOS devices, use window.open
        window.open(webUrl, "_blank");
      }

      document.body.removeChild(buttonContainer);
    });

    closeBtn.addEventListener("click", () => {
      document.body.removeChild(buttonContainer);
    });

    // Auto-close after 15 seconds
    setTimeout(() => {
      if (buttonContainer.parentNode) {
        document.body.removeChild(buttonContainer);
      }
    }, 15000);
  }

  celebrateSubmission() {
    // Create celebration burst
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        this.createCelebrationParticle();
      }, i * 20);
    }

    // Show success message
    this.showSuccessMessage();
  }

  createCelebrationParticle() {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = "10px";
    particle.style.height = "10px";
    particle.style.background = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#ffd93d",
      "#6c5ce7",
      "#fd79a8",
      "#00b894",
      "#e17055",
    ][Math.floor(Math.random() * 8)];
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1001";

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 15 + 10;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let x = centerX;
    let y = centerY;
    let opacity = 1;

    function animateParticle() {
      x += vx;
      y += vy + 2; // gravity
      opacity -= 0.02;

      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animateParticle);
      } else {
        document.body.removeChild(particle);
      }
    }

    requestAnimationFrame(animateParticle);
  }

  showSuccessMessage() {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || typeof window.orientation !== "undefined";

    const message = document.createElement("div");
    const messageText = isMobile
      ? "¡Confirmación lista! <br>📱 Abriendo WhatsApp..."
      : "¡Confirmación lista! <br>� Abriendo WhatsApp Web...";

    message.innerHTML = messageText;
    message.style.position = "fixed";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%) scale(0)";
    message.style.background = "linear-gradient(45deg, #ff6b6b, #4ecdc4)";
    message.style.color = "white";
    message.style.padding = "20px 40px";
    message.style.borderRadius = "20px";
    message.style.fontSize = "1.5em";
    message.style.fontWeight = "bold";
    message.style.zIndex = "1002";
    message.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    message.style.transition =
      "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.transform = "translate(-50%, -50%) scale(1)";
    }, 100);

    setTimeout(() => {
      message.style.transform = "translate(-50%, -50%) scale(0)";
      setTimeout(() => {
        document.body.removeChild(message);
      }, 500);
    }, 3000);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ConfettiGenerator();
  new FloatingParticles();
  new TextAnimations();

  // Add some interactive effects
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("mouseover", function () {
      this.style.filter = "brightness(1.2) saturate(1.3)";
    });

    img.addEventListener("mouseout", function () {
      this.style.filter = "brightness(1) saturate(1)";
    });
  });

  // Add click effect to buttons
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,255,255,0.6)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.left = e.clientX - this.offsetLeft + "px";
      ripple.style.top = e.clientY - this.offsetTop + "px";

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Countdown functionality
class CountdownTimer {
  constructor(targetDate) {
    this.targetDate = new Date(targetDate).getTime();
    this.init();
  }

  init() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
      document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");

      // Add special animation when time is almost up
      if (distance < 24 * 60 * 60 * 1000) {
        // Less than 24 hours
        document.querySelector(".countdown").style.animation =
          "countdownUrgent 1s ease-in-out infinite";
      }
    } else {
      // Event has started
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";

      document.querySelector(".countdown-title").textContent =
        "¡Es hora de la fiesta!";
      document.querySelector(".countdown").style.animation =
        "celebrateTime 0.5s ease-in-out infinite alternate";
    }
  }
}

// Initialize countdown when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set the target date - November 22, 2025 at 10:00 AM
  // You can change this date as needed
  const targetDate = "November 22, 2025 10:00:00";
  new CountdownTimer(targetDate);
});
s;

// Add countdown animations CSS
const countdownStyle = document.createElement("style");
countdownStyle.textContent = `
    @keyframes countdownUrgent {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
    
    @keyframes celebrateTime {
        0% {
            transform: scale(1);
            filter: hue-rotate(0deg);
        }
        100% {
            transform: scale(1.05);
            filter: hue-rotate(20deg);
        }
    }
`;
document.head.appendChild(countdownStyle);
