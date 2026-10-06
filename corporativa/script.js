/**
 * Módulo Identidad Corporativa - EVA(ATELIER)
 * Control de animaciones continuas de scroll (Entrada/Salida) y desplazamiento suave.
 */
function initModuloCorporativa() {
    const container = document.querySelector('.mod-corporativa');
    if (!container) return;

    // 1. ANIMACIONES CONTINUAS AL HACER SCROLL (ENTRADA Y SALIDA)
    const revealElements = container.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Activa al entrar a la vista
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
            // Reinicia al salir para reanimar si se vuelve a subir/bajar
            else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL)
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModuloCorporativa);
} else {
    initModuloCorporativa();
}