
const root = document.documentElement;
const slider = document.getElementById("color-slider");
const colorValue = document.getElementById("color-value");
const presets = document.querySelectorAll(".preset[data-hue]");
const randomButton = document.getElementById("random-color");
const themeButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const backButton = document.getElementById("back-button");
const helperText = document.getElementById("helper-text");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let hue = 267;
let particles = [];
let animationFrame = null;

function setHue(value) {
    hue = Number(value);

    root.style.setProperty("--hue", hue);
    slider.value = hue;
    colorValue.textContent = `${hue}°`;

    presets.forEach((preset) => {
        const active = Number(preset.dataset.hue) === hue;

        preset.classList.toggle("active", active);
        preset.setAttribute("aria-pressed", String(active));
    });
}

slider.addEventListener("input", (event) => {
    setHue(event.target.value);
});

presets.forEach((preset) => {
    preset.addEventListener("click", () => {
        setHue(preset.dataset.hue);
    });
});

randomButton.addEventListener("click", () => {
    let nextHue = Math.floor(Math.random() * 361);

    if (Math.abs(nextHue - hue) < 25) {
        nextHue = (nextHue + 145) % 361;
    }

    setHue(nextHue);
    helperText.textContent = "New color, new galaxy. ✦";
});

themeButton.addEventListener("click", () => {
    const isLight = root.dataset.theme !== "light";

    root.dataset.theme = isLight ? "light" : "dark";
    themeIcon.textContent = isLight ? "☾" : "☼";
    themeLabel.textContent = isLight ? "Dark mode" : "Light mode";

    document.querySelector('meta[name="theme-color"]')
        .setAttribute(
            "content",
            isLight ? "#f5f6ff" : "#080b14"
        );
});

backButton.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        helperText.textContent =
            "No previous page found. Use Back to Home instead.";
    }
});

document.getElementById("year").textContent =
    new Date().getFullYear();

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(
        65,
        Math.floor(
            (window.innerWidth * window.innerHeight) / 18000
        )
    );

    particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5 + 0.4,
        speed: Math.random() * 0.22 + 0.04,
        alpha: Math.random() * 0.45 + 0.15
    }));

    if (reducedMotion) {
        drawParticles(false);
    }
}

function drawParticles(animate = true) {
    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach((particle) => {
        if (animate) {
            particle.y -= particle.speed;

            if (particle.y < -5) {
                particle.y = window.innerHeight + 5;
                particle.x = Math.random() * window.innerWidth;
            }
        }

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `hsla(${hue}, 90%, 80%, ${particle.alpha})`;

        ctx.fill();
    });

    if (animate) {
        animationFrame = requestAnimationFrame(
            () => drawParticles(true)
        );
    }
}

function initializeParticles() {
    resizeCanvas();

    if (!reducedMotion) {
        drawParticles(true);
    }
}

window.addEventListener("resize", () => {
    if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
    }

    initializeParticles();
});

setHue(267);
initializeParticles();
