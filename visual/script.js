/**
 * Módulo Identidad Visual - EVA(ATELIER)
 * Control de animaciones continuas de scroll (Entrada/Salida), copiado de colores HEX y desplazamiento suave.
 */
function initModuloVisual() {
    const container = document.querySelector('.mod-visual');
    if (!container) return;

    // 1. ANIMACIONES CONTINUAS AL HACER SCROLL (ENTRADA Y SALIDA)
    const revealElements = container.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Activa animación al ingresar a la pantalla
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
            // Reinicia al salir de pantalla para volver a reanimar
            else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. COPIAR CÓDIGO HEX AL HACER CLIC EN LOS SWATCHES
    const swatches = container.querySelectorAll('.swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', function () {
            const hexColor = this.getAttribute('data-color');
            if (!hexColor) return;

            navigator.clipboard.writeText(hexColor).then(() => {
                const copyStatus = this.querySelector('.copy-status');
                if (copyStatus) {
                    const originalHTML = copyStatus.innerHTML;
                    copyStatus.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';

                    setTimeout(() => {
                        copyStatus.innerHTML = originalHTML;
                    }, 1800);
                }
            }).catch(err => {
                console.error('Error al copiar el color HEX: ', err);
            });
        });
    });

    // 3. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL)
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

    // 4. ACTUALIZACIÓN AUTOMÁTICA DEL AÑO EN EL FOOTER
    const yearSpan = container.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Inicialización diferida y compatible con navegación dinámica
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModuloVisual);
} else {
    initModuloVisual();
}