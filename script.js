(function initModuleScript() {
  /**
   * Inicializa la lógica dependiente del DOM inyectado dinámicamente
   */
  function setupModule() {
    const appRoot = document.getElementById("app-root") || document;

    // 1. Scroll reveal (IntersectionObserver)
    const revealItems = appRoot.querySelectorAll(".reveal");
    if (revealItems.length > 0) {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });

        revealItems.forEach(el => observer.observe(el));
      } else {
        revealItems.forEach(el => el.classList.add("visible"));
      }
    }

    // 2. Año actual
    appRoot.querySelectorAll(".current-year").forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // 3. Formulario de contacto
    const form = appRoot.querySelector("#contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = form.querySelector(".form-message");
        if (msg) msg.textContent = "¡Gracias! Tu mensaje está listo para enviarse por el canal de Atelier.";
        form.reset();
      });
    }
  }

  // Ejecución inmediata si el DOM ya está listo (Carga dinámicas)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupModule);
  } else {
    setupModule();
  }

  // DELEGACIÓN GLOBAL DE EVENTOS (Evita que los eventos se rompan al cambiar de vista)
  document.addEventListener("click", async (e) => {
    
    // --- NAVEGACIÓN MÓVIL ---
    const menuBtn = e.target.closest(".menu-toggle");
    if (menuBtn) {
      const nav = document.querySelector(".site-nav");
      if (nav) {
        const open = nav.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", open);
      }
      return;
    }

    const navLink = e.target.closest(".site-nav a");
    if (navLink) {
      const nav = document.querySelector(".site-nav");
      nav?.classList.remove("is-open");
    }

    // --- ACORDEÓN ---
    const accordionTrigger = e.target.closest(".accordion-trigger");
    if (accordionTrigger) {
      const item = accordionTrigger.closest(".accordion-item");
      const content = item?.querySelector(".accordion-content");
      if (item && content) {
        const active = item.classList.toggle("open");
        accordionTrigger.setAttribute("aria-expanded", active);
        content.style.maxHeight = active ? content.scrollHeight + "px" : "0px";
      }
      return;
    }

    // --- PALETA DE COLORES (COPIAR HEX) ---
    const colorCard = e.target.closest("[data-color]");
    if (colorCard) {
      const color = colorCard.dataset.color;
      try {
        await navigator.clipboard.writeText(color);
        const statusEl = colorCard.querySelector(".copy-status");
        if (statusEl) {
          const originalText = statusEl.textContent;
          statusEl.textContent = "Copiado ✓";
          setTimeout(() => statusEl.textContent = originalText || "Copiar HEX", 1400);
        }
      } catch {
        window.prompt("Copia este color:", color);
      }
      return;
    }

    // --- ABRIR MODAL ---
    const modalBtn = e.target.closest("[data-modal-target]");
    if (modalBtn) {
      const modal = document.querySelector(modalBtn.dataset.modalTarget);
      if (modal) {
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
      }
      return;
    }

    // --- CERRAR MODAL ---
    const modalClose = e.target.closest(".modal-close, .modal-backdrop");
    if (modalClose) {
      if (e.target === modalClose || e.target.closest(".modal-close")) {
        const modal = modalClose.closest(".modal");
        if (modal) {
          modal.classList.remove("show");
          modal.setAttribute("aria-hidden", "true");
        }
      }
    }
  });

})();