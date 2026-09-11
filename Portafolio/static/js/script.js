document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Alternar menú en dispositivos móviles
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Cerrar menú móvil al seleccionar una opción
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // Actualizar enlace activo automáticamente al hacer scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});


//sobre mi 
/* static/js/script.js */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navegación Móvil
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navMenu.classList.toggle("open");
    });
  }

  // 2. Movimiento fluido ultra suave (Inercia / LERP) para la sección Hero
  const card = document.querySelector(".hero-card");

  if (card) {
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let isHovered = false;

    // Ajusta la aceleración (menor número = movimiento más suave y amortiguado)
    const ease = 0.05; 

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Inclinación máxima tenue (3 grados)
      targetX = (y / (rect.height / 2)) * -3;
      targetY = (x / (rect.width / 2)) * 3;
    });

    card.addEventListener("mouseenter", () => {
      isHovered = true;
    });

    card.addEventListener("mouseleave", () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    });

    function updateCardTransform() {
      // Interpolación lineal para suavizar la transición entre la posición actual y la meta
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      card.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;

      requestAnimationFrame(updateCardTransform);
    }

    updateCardTransform();
  }
});

//habilidades
/* Opcional: Agrega esto al final de tu static/js/script.js */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".skill-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.style.opacity = "0.65";
        }
      });
    });

    card.addEventListener("mouseleave", () => {
      cards.forEach((otherCard) => {
        otherCard.style.opacity = "1";
      });
    });
  });
});

//proyecto 
/* Opcional: Interacción suave al pasar el cursor por la captura */
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const img = card.querySelector(".project-img");
    
    if (img) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        img.style.transform = `scale(1.04) translate(${x * 8}px, ${y * 8}px)`;
      });

      card.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1) translate(0px, 0px)";
      });
    }
  });
});

/* Animación suave al hacer scroll */
document.addEventListener("DOMContentLoaded", () => {
  const refCards = document.querySelectorAll(".reference-card");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  refCards.forEach((card) => observer.observe(card));
});