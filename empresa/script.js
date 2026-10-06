/**
 * Módulo Empresa - EVA(ATELIER)
 * Control de animaciones continuas de scroll (Entrada/Salida) y desplazamiento suave.
 */
function initModuloEmpresa() {
  const container = document.querySelector('.mod-empresa');
  if (!container) return;

  // 1. ANIMACIONES CONTINUAS AL HACER SCROLL ARRIBA Y ABAJO
  const revealElements = container.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    threshold: 0.15, // Se activa al mostrar un 15% del elemento
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Al entrar a la pantalla se activa la animación de ENTRADA
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
      // Al salir de la pantalla se activa la animación de SALIDA
      else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL) PARA LOS BOTONES E ENLACES
  const anchorLinks = container.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = container.querySelector(targetId) || document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Ejecución compatible con Front Controller y carga de script directo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModuloEmpresa);
} else {
  initModuloEmpresa();
}