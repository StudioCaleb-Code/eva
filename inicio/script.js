/**
 * Script Módulo Inicio - Atelier
 * Funcionalidades:
 * 1. Scroll Reveal bidireccional (Entrada y Salida progresiva de elementos).
 * 2. Desplazamiento suave (Smooth Scroll) para enlaces internos.
 */
(function () {
  "use strict";

  /* --- 1. ANIMACIÓN REVEAL (ENTRADA Y SALIDA AL HACER SCROLL) --- */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.14 // Porcentaje visible en pantalla para alternar visibilidad
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // ENTRADA: Se muestra cuando se desplaza hacia el elemento
        entry.target.classList.add("visible");
      } else {
        // SALIDA: Se oculta al salir del área visible del usuario
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  window.initScrollReveal = function () {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el, index) => {
      // Escalado progresivo opcional en rejillas (cards)
      if (!el.style.transitionDelay && el.classList.contains("card")) {
        el.style.transitionDelay = `${(index % 3) * 0.09}s`;
      }
      scrollObserver.observe(el);
    });
  };

  /* --- 2. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL) --- */
  window.initSmoothScroll = function () {
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      }
    });
  };

  /* --- 3. INICIALIZACIÓN GLOBAL --- */
  const initAll = () => {
    window.initScrollReveal();
    window.initSmoothScroll();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();