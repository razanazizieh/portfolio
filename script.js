const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
const cursor = document.getElementById("cursor");
const mainContent = document.getElementById("main-content");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
let particles = [];

let mouseX = 0,
  mouseY = 0,
  ballX = 0,
  ballY = 0;
const lerp = 0.15;

// Mouse Events
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.opacity = "1";
  if (Math.random() > 0.2) particles.push(new Particle(e.clientX, e.clientY));
});

// Touch Events
document.addEventListener(
  "touchstart",
  (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
  },
  { passive: true }
);

document.addEventListener(
  "touchmove",
  (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    if (Math.random() > 0.3) {
      particles.push(new Particle(touch.clientX, touch.clientY));
    }
  },
  { passive: true }
);

document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

function animate() {
  ballX += (mouseX - ballX) * lerp;
  ballY += (mouseY - ballY) * lerp;
  cursor.style.left = ballX + "px";
  cursor.style.top = ballY + "px";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.life > 0);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 1.2;
    this.speedY = (Math.random() - 0.5) * 1.2;
    this.color = Math.random() > 0.5 ? "#ff2d95" : "#9d00ff";
    this.life = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.012;
  }
  draw() {
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
animate();

document.querySelectorAll("a, .theme-toggle").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "30px";
    cursor.style.height = "30px";
    cursor.style.background = "rgba(255, 45, 149, 0.1)";
    cursor.style.border = "1px solid var(--neon-pink)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "5px";
    cursor.style.height = "5px";
    cursor.style.background = "var(--neon-pink)";
    cursor.style.border = "none";
  });
});

const updateNav = () => {
  let current = "";
  const scrollPos =
    window.innerWidth <= 1024 ? window.scrollY : mainContent.scrollTop;

  sections.forEach((s) => {
    if (scrollPos >= s.offsetTop - 150) {
      current = s.getAttribute("id");
    }
  });

  navLinks.forEach((l) => {
    l.classList.remove("active");
    if (current && l.getAttribute("href").includes(current)) {
      l.classList.add("active");
    }
  });
};

mainContent.addEventListener("scroll", updateNav);
window.addEventListener("scroll", updateNav);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("active");
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const favicon = document.getElementById("favicon");
let step = 0;
setInterval(() => {
  const glowSize = 35 + Math.sin(step) * 8;
  const coreSize = 15 + Math.sin(step) * 2;
  const animatedIcon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><radialGradient id='g'><stop offset='0%' stop-color='white'/><stop offset='100%' stop-color='%23ff2d95'/></radialGradient></defs><circle cx='55' cy='55' r='${glowSize}' fill='%23ff2d95' opacity='0.3'/><circle cx='55' cy='55' r='${coreSize}' fill='url(%23g)'/></svg>`;
  favicon.setAttribute("href", animatedIcon);
  step += 0.15;
}, 100);

document.getElementById("year").textContent = new Date().getFullYear();
