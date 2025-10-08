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

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Show celebration animation
    this.celebrateSubmission();

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1000);
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
    const message = document.createElement("div");
    message.innerHTML = "¡Confirmación enviada! <br>📱 Abriendo WhatsApp...";
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
  // Set the target date - November 15, 2025 at 5:00 PM
  // You can change this date as needed
  const targetDate = "November 15, 2025 17:00:00";
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
