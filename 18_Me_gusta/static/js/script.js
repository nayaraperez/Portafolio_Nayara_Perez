const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Desplegar menú en móviles
mobileMenu.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Cambiar estado activo y cerrar menú móvil al hacer clic
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });
});