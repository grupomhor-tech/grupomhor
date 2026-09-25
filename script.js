/* ----------------------------------------------------------
   CONTROL DE LA TRANSICIÓN DE CARGA INICIAL (SPLASH SCREEN)
   ---------------------------------------------------------- */
window.addEventListener("load", () => {
    const splash = document.getElementById("splashScreen");
    if (splash) {
        setTimeout(() => {
            splash.classList.add("fade-out");
        }, 500); // Se oculta suavemente tras medio segundo (0.5s)
    }
});

/* ==========================================================
   CONTROL DEL MENÚ HAMBURGUESA (MÓVIL - TRES LÍNEAS)
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        // Abrir / Cerrar menú al presionar la hamburguesa
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Botón de cierre explícito (X) dentro del menú móvil a pantalla completa
        const closeBtn = navLinks.querySelector('.menu-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        }

        // Ocultar el menú móvil automáticamente al hacer clic en cualquier opción de enlace
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }
});

/* ==========================================================
   CARRUSEL GENERAL DE PROPIEDADES
   ========================================================== */
function moveSlide(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const images = carousel.querySelectorAll('img');
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    if (images[currentIndex]) {
        images[currentIndex].classList.remove('active');
    }
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    
    if (images[currentIndex]) {
        images[currentIndex].classList.add('active');
    }
}

/* ==========================================================
   CONTROL DE PESTAÑAS Y CARRUSEL HORIZONTAL INTERACTIVO (B2B)
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".b2b-content-container");
    const panes = document.querySelectorAll(".b2b-tab-pane");
    const buttons = document.querySelectorAll(".b2b-tabs-nav .tab-btn");

    if (!container || panes.length === 0 || buttons.length === 0) return;

    // 1. Función interna para actualizar las clases activas visuales de forma inmediata
    function updateActiveState(index) {
        buttons.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        panes.forEach((pane, idx) => {
            if (idx === index) {
                pane.classList.add("active");
            } else {
                pane.classList.remove("active");
            }
        });
    }

    // 2. Sincronización ultrarrápida al hacer scroll horizontal en el carrusel (sin demoras)
    container.addEventListener("scroll", () => {
        let scrollLeft = container.scrollLeft;
        let paneWidth = panes[0].offsetWidth + parseInt(window.getComputedStyle(container).gap || 20);
        let currentIndex = Math.round(scrollLeft / paneWidth);
        
        if (currentIndex >= 0 && currentIndex < panes.length) {
            updateActiveState(currentIndex);
        }
    }, { passive: true });

    // 3. Sincronizar al hacer clic en los botones superiores
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            updateActiveState(index);
            const targetPane = panes[index];
            container.scrollTo({
                left: targetPane.offsetLeft - container.offsetLeft - (container.clientWidth - targetPane.clientWidth) / 2,
                behavior: "smooth"
            });
        });
    });
});

// Mantener compatibilidad global por si alguna función externa llama a switchB2BTab
function switchB2BTab(tabId, btnElement) {
    const panes = document.querySelectorAll('.b2b-tab-pane');
    const buttons = document.querySelectorAll('.tab-btn');
    
    panes.forEach((pane) => {
        if (pane.id === tabId) {
            pane.classList.add('active');
            const container = document.querySelector(".b2b-content-container");
            if (container) {
                container.scrollTo({
                    left: pane.offsetLeft - container.offsetLeft - (container.clientWidth - pane.clientWidth) / 2,
                    behavior: "smooth"
                });
            }
        } else {
            pane.classList.remove('active');
        }
    });

    buttons.forEach(btn => {
        if (btn === btnElement) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/* ==========================================================
   EFECTO DINÁMICO AL RITMO DEL SCROLL (FLUIDO TIPO APPLE)
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll('.apple-reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});

/* ==========================================================
   MODAL ESTILO APPLE
   ========================================================== */
function openModal() {
    const modal = document.getElementById('infoModal'); 
    if (modal) modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    if (modal) modal.classList.remove('active');
}

// Cerrar si hacen clic fuera de la tarjeta blanca
window.addEventListener('click', function(event) {
    const modal = document.getElementById('infoModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

/* ----------------------------------------------------------
   WIDGET FLOTANTE DE FAUNA SUR Y AUDIOS DE AVES
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    const faunaToggleBtn = document.getElementById("faunaToggleBtn");
    const faunaModal = document.getElementById("faunaModal");
    const faunaCloseBtn = document.getElementById("faunaCloseBtn");
    const birdAudioPlayer = document.getElementById("birdAudioPlayer");
    const faunaItems = document.querySelectorAll(".fauna-item");

    // Abrir/Cerrar panel flotante de fauna
    if (faunaToggleBtn && faunaModal) {
        faunaToggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            faunaModal.classList.toggle("active");
        });
    }

    // Botón de cierre explícito (X) dentro del widget
    if (faunaCloseBtn && faunaModal) {
        faunaCloseBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            faunaModal.classList.remove("active");
        });
    }

    // Cerrar el widget de fauna al hacer clic fuera de él
    document.addEventListener("click", function (e) {
        const container = document.querySelector(".fauna-widget-container");
        if (container && faunaModal && !container.contains(e.target)) {
            faunaModal.classList.remove("active");
        }
    });

    // Reproducción de audios vinculados mediante [data-audio] en la lista
    if (birdAudioPlayer && faunaItems.length > 0) {
        faunaItems.forEach(item => {
            item.addEventListener("click", function () {
                const birdName = this.getAttribute("data-audio");
                
                if (birdName) {
                    const audioPath = `audio/aves/${birdName}.mp3`;

                    faunaItems.forEach(i => i.style.opacity = "1");
                    this.style.opacity = "0.7";

                    birdAudioPlayer.src = audioPath;
                    birdAudioPlayer.play().catch(error => {
                        console.warn("Reproducción de audio prevenida o bloqueada por políticas del navegador:", error);
                    });
                }
            });
        });
    }
});