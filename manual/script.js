/**
 * Script Interactivo - Atelier
 * Funcionalidades:
 * 1. Animaciones de entrada y salida al hacer scroll (Scroll Reveal Bidireccional).
 * 2. Desplazamiento suave (Smooth Scroll) para enlaces internos (#).
 * 3. Despliegue de acordeones fluidos.
 */
(function () {
  "use strict";

  /* --- 1. SCROLL REVEAL (ENTRADA Y SALIDA AL BAJAR/SUBIR) --- */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.15 // Porcentaje visible necesario para alternar visibilidad
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // ENTRADA: Se activa al desplazarse hasta el elemento
        entry.target.classList.add("visible");
      } else {
        // SALIDA: Se oculta cuando sale del área visible
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  window.initScrollReveal = function () {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el, index) => {
      // Retardo escalonado opcional para cuadrículas o elementos en lista
      if (!el.style.transitionDelay && el.parentElement && el.parentElement.classList.contains("accordion")) {
        el.style.transitionDelay = `${(index % 4) * 0.08}s`;
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

  /* --- 3. ACORDEONES FLUIDOS --- */
  window.initAccordions = function () {
    const triggers = document.querySelectorAll(".accordion-trigger");

    triggers.forEach((trigger) => {
      if (trigger.dataset.bound === "true") return;
      trigger.dataset.bound = "true";

      trigger.addEventListener("click", function () {
        const item = this.parentElement;
        const content = item.querySelector(".accordion-content");
        const isOpen = item.classList.contains("open");

        // Cierra otros acordeones abiertos opcionalmente
        document.querySelectorAll(".accordion-item.open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".accordion-trigger")?.setAttribute("aria-expanded", "false");
            const openContent = openItem.querySelector(".accordion-content");
            if (openContent) openContent.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove("open");
          this.setAttribute("aria-expanded", "false");
          content.style.maxHeight = null;
        } else {
          item.classList.add("open");
          this.setAttribute("aria-expanded", "true");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  };

  /* --- 4. INICIALIZACIÓN GLOBAL --- */
  const initAll = () => {
    window.initScrollReveal();
    window.initSmoothScroll();
    window.initAccordions();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();