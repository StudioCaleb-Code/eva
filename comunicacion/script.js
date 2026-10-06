/**
 * Script Principal - Atelier
 * Incluye:
 * - Animaciones de Scroll bidireccionales (Entrada y Salida al subir/bajar)
 * - Desplazamiento suave (Smooth Scroll)
 * - Acordeones fluidos
 * - Manejo interactivo del formulario de contacto
 */
(function () {
  "use strict";

  /* 1. ANIMACIÓN REVEAL (ENTRADA Y SALIDA CONTINUA EN SCROLL) */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.12 // Porcentaje visible en pantalla para activar
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Entrada al entrar en viewport (bajar o subir)
        entry.target.classList.add("visible");
      } else {
        // Salida al salir de viewport
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  window.initScrollReveal = function () {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el, index) => {
      // Escalonamiento si son elementos contiguos
      if (!el.style.transitionDelay && el.parentElement && el.parentElement.classList.contains("accordion")) {
        el.style.transitionDelay = `${(index % 4) * 0.08}s`;
      }
      revealObserver.observe(el);
    });
  };

  /* 2. ACORDEONES INTERACTIVOS */
  window.initAccordions = function () {
    const triggers = document.querySelectorAll(".accordion-trigger");

    triggers.forEach((trigger) => {
      if (trigger.dataset.bound === "true") return;
      trigger.dataset.bound = "true";

      trigger.addEventListener("click", function () {
        const item = this.parentElement;
        const content = item.querySelector(".accordion-content");
        const isOpen = item.classList.contains("open");

        // Cierra los demás items abiertos
        document.querySelectorAll(".accordion-item.open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
            openItem.querySelector(".accordion-content").style.maxHeight = null;
          }
        });

        // Conmuta el estado actual
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

  /* 3. FORMULARIO DE CONTACTO */
  window.initContactForm = function () {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");

    if (form && !form.dataset.bound) {
      form.dataset.bound = "true";

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        
        if (feedback) {
          feedback.textContent = "";
          feedback.className = "form-message";
        }

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          if (feedback) {
            feedback.classList.add("success");
            feedback.textContent = "¡Mensaje enviado con éxito a Atelier!";
          }

          form.reset();

          setTimeout(() => {
            if (feedback) {
              feedback.textContent = "";
              feedback.className = "form-message";
            }
          }, 4500);
        }, 1000);
      });
    }
  };

  /* 4. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL) */
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

  /* 5. INICIALIZACIÓN GLOBAL */
  const initAll = () => {
    window.initScrollReveal();
    window.initAccordions();
    window.initContactForm();
    window.initSmoothScroll();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();