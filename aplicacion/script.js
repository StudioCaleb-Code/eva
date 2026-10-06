(function initModuleScript() {
  /**
   * Configuración e interacciones del módulo
   */
  function setupModule() {
    const appRoot = document.getElementById("app-root") || document;

    // --- ANIMACIÓN PERSISTENTE DE SCROLL (ENTRADA Y SALIDA) ---
    const revealItems = appRoot.querySelectorAll(".reveal");

    if (revealItems.length > 0) {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Entrada en la pantalla
                entry.target.classList.add("visible");
              } else {
                // Salida de la pantalla (se oculta para permitir re-animar)
                entry.target.classList.remove("visible");
              }
            });
          },
          {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
          }
        );

        revealItems.forEach((el) => observer.observe(el));
      } else {
        // Fallback para navegadores antiguos
        revealItems.forEach((el) => el.classList.add("visible"));
      }
    }

    // --- AÑO ACTUAL EN FOOTER / CRÉDITOS ---
    appRoot.querySelectorAll(".current-year").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  // Comprobar estado del DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupModule);
  } else {
    setupModule();
  }

  // --- DELEGACIÓN GLOBAL DE EVENTOS ---
  document.addEventListener("click", async (e) => {
    // Menú móvil
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

    // Copiado de colores HEX
    const colorCard = e.target.closest("[data-color]");
    if (colorCard) {
      const color = colorCard.dataset.color;
      try {
        await navigator.clipboard.writeText(color);
        const statusEl = colorCard.querySelector(".copy-status");
        if (statusEl) {
          const originalText = statusEl.textContent;
          statusEl.textContent = "¡Copiado!";
          setTimeout(() => (statusEl.textContent = originalText || "Copiar HEX"), 1400);
        }
      } catch {
        window.prompt("Copiar código HEX:", color);
      }
      return;
    }
  });
})();