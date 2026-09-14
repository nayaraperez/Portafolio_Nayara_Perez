document.addEventListener("DOMContentLoaded", () => {
  // 1. Navegación Móvil Fluid
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

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

  // 2. ScrollSpy Suave (Resaltador de sección activa)
  const updateActiveLink = () => {
    let current = "";
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  // 3. Animación de Scroll Enlazada en Cadena (Staggered Reveal)
  const revealTargets = document.querySelectorAll(
    ".hero-card, .skill-card, .project-card, .video-wrapper, .additional-card, .timeline-card, .reference-card, .contact-card, .skills-header, .projects-header, .video-header, .additional-header, .education-header, .references-header, .contact-header"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Retardo progresivo suave según índice en pantalla
          setTimeout(() => {
            entry.target.classList.add("active");
          }, (index % 3) * 90);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));

  // 4. Inercia 3D Amortiguada en Tarjeta Hero (LERP Ultra-Smooth)
  const heroCard = document.querySelector(".hero-card");
  if (heroCard) {
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    const ease = 0.04; // Factor de fricción/suavizado

    heroCard.addEventListener("mousemove", (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = (y / (rect.height / 2)) * -2.5;
      targetY = (x / (rect.width / 2)) * 2.5;
    });

    heroCard.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
    });

    const animateHeroTilt = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      heroCard.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;
      requestAnimationFrame(animateHeroTilt);
    };

    animateHeroTilt();
  }

  // 5. Desenfoque Sutil de Tarjetas Habilidades al Hover
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      skillCards.forEach((other) => {
        if (other !== card) other.style.opacity = "0.55";
      });
    });
    card.addEventListener("mouseleave", () => {
      skillCards.forEach((other) => (other.style.opacity = "1"));
    });
  });

  // 6. Efecto Parallax Ligero en las Imágenes de Proyectos
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    const img = card.querySelector(".project-img");
    if (img) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `scale(1.05) translate(${x * 6}px, ${y * 6}px)`;
      });

      card.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1) translate(0px, 0px)";
      });
    }
  });

  // 7. Control de Reproducción Automatizado para el Video Demo
  const videoElement = document.querySelector(".video-wrapper video");
  if (videoElement) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !videoElement.paused) {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    videoObserver.observe(videoElement);
  }
});