/**
 * Script Principal - Módulo Propuestas de Mejora (Atelier)
 * Funcionalidades incluidas:
 * 1. Scroll Reveal bidireccional (Entrada y Salida progresiva en ambas direcciones).
 * 2. Desplazamiento suave (Smooth Scroll) para navegación mediante anclas.
 */
(function () {
    "use strict";

    /* --- 1. ANIMACIÓN REVEAL (ENTRADA Y SALIDA AL HACER SCROLL) --- */
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.14 // Porcentaje visible necesario para alternar visibilidad
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // ENTRADA: Se activa al hacer scroll hacia abajo o arriba sobre el elemento
                entry.target.classList.add("visible");
            } else {
                // SALIDA: Se oculta al salir del campo de visión
                entry.target.classList.remove("visible");
            }
        });
    }, observerOptions);

    window.initScrollReveal = function () {
        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el, index) => {
            // Retardo progresivo si pertenecen a una secuencia timeline
            if (!el.style.transitionDelay && el.classList.contains("timeline-item")) {
                el.style.transitionDelay = `${(index % 4) * 0.1}s`;
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