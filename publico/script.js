/**
 * Módulo Público Objetivo - EVA(ATELIER)
 * Manejo de animaciones continuas al hacer scroll arriba/abajo y smooth scroll.
 */
function initModuloPublico() {
    const container = document.querySelector('.mod-publico');
    if (!container) return;

    // 1. ANIMACIONES CONTINUAS DE ENTRADA Y SALIDA
    const revealElements = container.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        threshold: 0.15, // Se activa al visualizar un 15% del contenedor
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Entrada: añade la clase para animar
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
            // Salida: remueve la clase para reiniciar la animación al volver a pasar
            else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. NAVEGACIÓN SUAVE PARA ENLACES INTERNOS (#)
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

// Inicialización segura para carga directa o mediante la arquitectura Front Controller
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModuloPublico);
} else {
    initModuloPublico();
}