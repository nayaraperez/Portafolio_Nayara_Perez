/* =================================================================
   INICIALIZACIÓN DEL DOCUMENTO
   ================================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ===============================================================
     1. NAVEGACIÓN MÓVIL (MENÚ HAMBURGUESA)
     =============================================================== */
  const botonMenu = document.getElementById("boton-menu");
  const menuNavegacion = document.getElementById("menu-navegacion");
  const enlacesNavegacion = document.querySelectorAll(".enlace-navegacion");

  if (botonMenu && menuNavegacion) {
    // Abrir o cerrar menú al pulsar el botón
    botonMenu.addEventListener("click", () => {
      botonMenu.classList.toggle("abierto");
      menuNavegacion.classList.toggle("abierto");
    });

    // Cerrar menú móvil al hacer clic en cualquier enlace
    enlacesNavegacion.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        botonMenu.classList.remove("abierto");
        menuNavegacion.classList.remove("abierto");
      });
    });
  }

  /* ===============================================================
     2. ANIMACIÓN DE REVELADO DE TARJETAS (INTERSECTION OBSERVER)
     =============================================================== */
  const tarjetasParaRevelar = document.querySelectorAll(
    ".tarjeta-presentacion, .tarjeta-habilidad, .tarjeta-proyecto, .contenedor-video, .tarjeta-linea-tiempo, .tarjeta-referencia, .tarjeta-contacto"
  );

  const observadorVisibilidad = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("activo");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Asignar clase inicial y observar cada elemento
  tarjetasParaRevelar.forEach((tarjeta) => {
    tarjeta.classList.add("revelar");
    observadorVisibilidad.observe(tarjeta);
  });

});























function iniciarEfectoPetalos() {
  // Crear el contenedor dentro del body si no existe
  let contenedor = document.querySelector(".contenedor-petalos");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.classList.add("contenedor-petalos");
    document.body.appendChild(contenedor);
  }

  function generarPetalo() {
    const petalo = document.createElement("div");
    petalo.classList.add("petalo-rosa");

    // Parámetros aleatorios
    const tamano = Math.random() * 10 + 10;            // Ancho de 10px a 20px
    const posX = Math.random() * window.innerWidth;    // Posición horizontal
    const duracionCaida = Math.random() * 4 + 6;       // Tiempo de caída (6s a 10s)
    const duracionBalanceo = Math.random() * 3 + 2;    // Tiempo de bamboleo (2s a 5s)

    // Aplicar estilos dinámicos
    petalo.style.width = `${tamano}px`;
    petalo.style.height = `${tamano * 1.4}px`;        // Forma levemente alargada
    petalo.style.left = `${posX}px`;
    petalo.style.animationDuration = `${duracionCaida}s, ${duracionBalanceo}s`;

    contenedor.appendChild(petalo);

    // Eliminar el pétalo del HTML al terminar de caer
    setTimeout(() => {
      petalo.remove();
    }, duracionCaida * 1000);
  }

  // Generar un pétalo nuevo cada 350 milisegundos
  setInterval(generarPetalo, 350);
}

// Iniciar cuando el documento esté cargado
document.addEventListener("DOMContentLoaded", iniciarEfectoPetalos);