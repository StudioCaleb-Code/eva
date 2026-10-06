(function () {
    // Configuración del Observador de Intersección (Entrada y Salida)
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -40px 0px", // Margen para activar antes/después de entrar
        threshold: 0.1 // Se activa con 10% visible
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, observerOptions);

    // Función principal expuesta globalmente para que tu cargador modular pueda invocarla
    window.initScrollReveal = function () {
        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => scrollObserver.observe(el));
    };

    // Observador de cambios en el DOM para cargas dinámicas por fetch
    const domObserver = new MutationObserver((mutations) => {
        let hasNewReveal = false;
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Node.ELEMENT_NODE
                    if (node.classList.contains("reveal") || node.querySelectorAll(".reveal").length > 0) {
                        hasNewReveal = true;
                    }
                }
            });
        });
        if (hasNewReveal) {
            window.initScrollReveal();
        }
    });

    // Iniciar observación de la raíz para cuando se inyecte HTML mediante fetch
    if (document.body) {
        domObserver.observe(document.body, { childList: true, subtree: true });
    }

    // Inicializar al cargar la página o si ya fue cargada
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", window.initScrollReveal);
    } else {
        window.initScrollReveal();
    }

    // Soporte para desplazamiento suave en enlaces internos (#)
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
})();