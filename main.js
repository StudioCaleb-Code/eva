document.addEventListener('DOMContentLoaded', () => {

    // Mapeo exacto de rutas
    const routes = {
        'inicio': {
            html: 'inicio/inicio.html',
            css: 'inicio/inicio.css',
            js: 'inicio/script.js'
        },
        'empresa': {
            html: 'empresa/empresa.html',
            css: 'empresa/empresa.css',
            js: 'empresa/script.js'
        },
        'publico-objetivo': {
            html: 'publico/publico.html',
            css: 'publico/publico.css',
            js: 'publico/script.js'
        },
        'identidad-corporativa': {
            html: 'corporativa/corporativa.html',
            css: 'corporativa/corporativa.css',
            js: 'corporativa/script.js'
        },
        'identidad-visual': {
            html: 'visual/visual.html',
            css: 'visual/visual.css',
            js: 'visual/script.js'
        },
        'imagen-institucional': {
            html: 'imagen/imagen.html',
            css: 'imagen/imagen.css',
            js: 'imagen/script.js'
        },
        'aplicaciones': {
            html: 'aplicacion/aplicacion.html',
            css: 'aplicacion/aplicacion.css',
            js: 'aplicacion/script.js'
        },
        'comunicacion': {
            html: 'comunicacion/comunicacion.html',
            css: 'comunicacion/comunicacion.css',
            js: 'comunicacion/script.js'
        },
        'manual-identidad': {
            html: 'manual/manual.html',
            css: 'manual/manual.css',
            js: 'manual/script.js'
        },
        'propuestas-mejora': {
            html: 'mejoras/mejoras.html',
            css: 'mejoras/mejoras.css',
            js: 'mejoras/script.js'
        }
    };

    const appRoot = document.getElementById('app-root');
    const moduleCssLink = document.getElementById('module-css');

    // Elementos del Carrusel del Navegador
    const navContainer = document.getElementById('nav-container');
    const arrowLeft = document.getElementById('nav-arrow-left');
    const arrowRight = document.getElementById('nav-arrow-right');

    /**
     * Resuelve rutas de manera absoluta para evitar colisiones entre carpetas
     */
    function resolvePath(path) {
        if (!path) return '';
        const a = document.createElement('a');
        a.href = path;
        return a.href;
    }

    /**
     * Sincroniza el estado activo del menú
     */
    function updateActiveNav(activeModuleName) {
        const navButtons = document.querySelectorAll('#main-nav .nav-btn');

        navButtons.forEach(btn => {
            const btnModule = btn.getAttribute('data-module');
            if (btnModule === activeModuleName) {
                btn.classList.add('active');
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Carga dinámicamente el CSS del módulo de forma aislada
     */
    async function loadModuleCss(cssPath) {
        if (!moduleCssLink) return;

        if (!cssPath) {
            moduleCssLink.setAttribute('href', '');
            return;
        }

        const resolvedCss = resolvePath(cssPath);

        try {
            const response = await fetch(resolvedCss, { method: 'HEAD' });
            const contentType = response.headers.get('content-type');

            if (response.ok && contentType && contentType.includes('text/css')) {
                moduleCssLink.setAttribute('href', resolvedCss);
            } else {
                console.warn(`No se pudo cargar el CSS en: ${resolvedCss}`);
                moduleCssLink.setAttribute('href', '');
            }
        } catch (error) {
            console.error(`Error al verificar CSS (${resolvedCss}):`, error);
            moduleCssLink.setAttribute('href', '');
        }
    }

    /**
     * Carga dinámicamente el JS del módulo y deshecha el JS del módulo anterior
     */
    function loadModuleScript(scriptPath) {
        const existingScript = document.getElementById('module-script');
        if (existingScript) {
            existingScript.remove();
        }

        if (!scriptPath) return;

        const resolvedJs = resolvePath(scriptPath);

        const script = document.createElement('script');
        script.id = 'module-script';
        script.src = resolvedJs;
        script.async = true;

        script.onerror = () => {
            console.warn(`No se pudo cargar el script del módulo en: ${resolvedJs}`);
        };

        document.body.appendChild(script);
    }

    /**
     * Carga el módulo, inyecta su HTML y ejecuta animaciones suaves
     */
    async function loadModule(moduleName) {
        const module = routes[moduleName];

        if (!module) {
            appRoot.innerHTML = '<div style="padding: 3rem; text-align: center;"><h2>404 - Módulo no encontrado</h2></div>';
            return;
        }

        try {
            const resolvedHtml = resolvePath(module.html);
            const response = await fetch(resolvedHtml);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const htmlContent = await response.text();

            // 1. Limpiar e Inyectar HTML
            appRoot.innerHTML = htmlContent;

            // 2. Cargar CSS correspondiente
            await loadModuleCss(module.css);

            // 3. Cargar JS correspondiente
            loadModuleScript(module.js);

            // 4. Actualizar Hash en la URL
            if (window.location.hash !== `#${moduleName}`) {
                window.location.hash = moduleName;
            }

            // 5. Marcar botón activo
            updateActiveNav(moduleName);

            // 6. Desplazamiento suave al inicio al cambiar de pantalla
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Error al cargar módulo:', error);
            appRoot.innerHTML = '<div style="padding: 3rem; text-align: center; color: #dc3545;"><h2>Error al cargar el contenido.</h2></div>';
        }
    }

    /**
     * Captura de clics globales para enlaces dinámicos y navegación
     */
    document.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('[data-module]');

        if (targetBtn) {
            e.preventDefault();
            const moduleName = targetBtn.getAttribute('data-module');

            if (moduleName) {
                loadModule(moduleName);
            }
        }
    });

    /**
     * CARRUSEL DE NAVEGACIÓN (Desplazamiento horizontal suave)
     */
    if (navContainer && arrowLeft && arrowRight) {

        const getScrollAmount = () => navContainer.clientWidth * 0.75;

        arrowLeft.addEventListener('click', () => {
            navContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        arrowRight.addEventListener('click', () => {
            navContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        const checkArrowsVisibility = () => {
            const maxScrollLeft = navContainer.scrollWidth - navContainer.clientWidth;

            arrowLeft.disabled = navContainer.scrollLeft <= 5;
            arrowRight.disabled = navContainer.scrollLeft >= maxScrollLeft - 5;
        };

        navContainer.addEventListener('scroll', checkArrowsVisibility);
        window.addEventListener('resize', checkArrowsVisibility);

        setTimeout(checkArrowsVisibility, 100);
    }

    /**
     * Detección de ruta inicial por hash de URL
     */
    function handleHashRoute() {
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash && routes[currentHash]) {
            loadModule(currentHash);
        } else {
            loadModule('inicio');
        }
    }

    window.addEventListener('hashchange', handleHashRoute);
    handleHashRoute();
});