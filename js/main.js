function animateCounter(el) {
  if (el.dataset.counted === "true") {
    return;
  }

  const target = parseInt(el.dataset.count, 10);
  if (Number.isNaN(target)) {
    return;
  }

  el.dataset.counted = "true";
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const animatedTargets = document.querySelectorAll(
  ".hero__panel, .problem-card, .service-card, .case-card, .process__step, .pricing-card, .panel, .process-detail"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCounter);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

animatedTargets.forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav__toggle");
const navList = document.getElementById("nav-links");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navList.classList.toggle("nav__links--open", !isOpen);
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navList.classList.remove("nav__links--open");
    });
  });
}
