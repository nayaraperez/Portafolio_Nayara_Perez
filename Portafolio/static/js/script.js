document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú móvil (Hamburguesa)
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navMenu.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
  }
  const revealCards = document.querySelectorAll(
    ".hero-card, .skill-card, .project-card, .video-wrapper, .additional-card, .timeline-card, .reference-card, .contact-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  revealCards.forEach((card) => {
    card.classList.add("reveal");
    observer.observe(card);
  });
});