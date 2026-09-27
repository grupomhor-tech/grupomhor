/* ----------------------------------------------------------
   CONTROL DE LA TRANSICIÓN DE CARGA INICIAL (SPLASH SCREEN)
   ---------------------------------------------------------- */
window.addEventListener("load", () => {
    const splash = document.getElementById("splashScreen");
    if (splash) {
        setTimeout(() => {
            splash.classList.add("fade-out");
        }, 500);
    }
});

/* ==========================================================
   CONTROL DEL MENÚ Y BOTÓN CONTACTO (SIN PARPADEO AL RECARGAR)
   ========================================================== */
// Ejecución inmediata al construir el DOM para evitar saltos visuales al actualizar
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        // Asegurarse de quitar la clase active al recargar la página por si el navegador guardó el estado del DOM
        navLinks.classList.remove("active");

        // Abrir / Cerrar menú al presionar la hamburguesa
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });

        // Botón de cierre explícito (X)
        const closeBtn = navLinks.querySelector(".menu-close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                navLinks.classList.remove("active");
            });
        }
    }

    // Delegación limpia de eventos para el botón Contacto y enlaces del menú
    if (navLinks) {
        navLinks.addEventListener("click", (e) => {
            const link = e.target.closest("a, button, .btn-contacto");
            if (link) {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                }
            }
        });
    }
});

/* ==========================================================
   CARRUSEL GENERAL DE PROPIEDADES
   ========================================================== */
function moveSlide(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const images = carousel.querySelectorAll("img");
    if (images.length === 0) return;

    let currentIndex = Array.from(images).findIndex(img => img.classList.contains("active"));

    if (currentIndex !== -1 && images[currentIndex]) {
        images[currentIndex].classList.remove("active");
    } else {
        currentIndex = 0;
    }

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    if (images[currentIndex]) {
        images[currentIndex].classList.add("active");
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

    function updateActiveState(index) {
        buttons.forEach((btn, idx) => {
            btn.classList.toggle("active", idx === index);
        });

        panes.forEach((pane, idx) => {
            pane.classList.toggle("active", idx === index);
        });
    }

    container.addEventListener("scroll", () => {
        const scrollLeft = container.scrollLeft;
        const gap = parseInt(window.getComputedStyle(container).gap || "20", 10);
        const paneWidth = panes[0].offsetWidth + gap;
        if (paneWidth > 0) {
            const currentIndex = Math.round(scrollLeft / paneWidth);
            if (currentIndex >= 0 && currentIndex < panes.length) {
                updateActiveState(currentIndex);
            }
        }
    }, { passive: true });

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            updateActiveState(index);
            const targetPane = panes[index];
            if (targetPane) {
                container.scrollTo({
                    left: targetPane.offsetLeft - container.offsetLeft - (container.clientWidth - targetPane.clientWidth) / 2,
                    behavior: "smooth"
                });
            }
        });
    });
});

function switchB2BTab(tabId, btnElement) {
    const panes = document.querySelectorAll(".b2b-tab-pane");
    const buttons = document.querySelectorAll(".tab-btn");

    panes.forEach(pane => {
        if (pane.id === tabId) {
            pane.classList.add("active");
            const container = document.querySelector(".b2b-content-container");
            if (container) {
                container.scrollTo({
                    left: pane.offsetLeft - container.offsetLeft - (container.clientWidth - pane.clientWidth) / 2,
                    behavior: "smooth"
                });
            }
        } else {
            pane.classList.remove("active");
        }
    });

    buttons.forEach(btn => {
        btn.classList.toggle("active", btn === btnElement);
    });
}

/* ==========================================================
   EFECTO DINÁMICO AL RITMO DEL SCROLL (FLUIDO TIPO APPLE)
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".apple-reveal");

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
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
    const modal = document.getElementById("infoModal");
    if (modal) modal.classList.add("active");
}

function closeModal() {
    const modal = document.getElementById("infoModal");
    if (modal) modal.classList.remove("active");
}

window.addEventListener("click", (event) => {
    const modal = document.getElementById("infoModal");
    if (modal && event.target === modal) {
        closeModal();
    }
});

/* ----------------------------------------------------------
   WIDGET FLOTANTE DE FAUNA SUR Y AUDIOS DE AVES
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const faunaToggleBtn = document.getElementById("faunaToggleBtn");
    const faunaModal = document.getElementById("faunaModal");
    const faunaCloseBtn = document.getElementById("faunaCloseBtn");
    const birdAudioPlayer = document.getElementById("birdAudioPlayer");
    const faunaItems = document.querySelectorAll(".fauna-item");

    if (faunaToggleBtn && faunaModal) {
        faunaToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            faunaModal.classList.toggle("active");
        });
    }

    if (faunaCloseBtn && faunaModal) {
        faunaCloseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            faunaModal.classList.remove("active");
        });
    }

    document.addEventListener("click", (e) => {
        const container = document.querySelector(".fauna-widget-container");
        if (container && faunaModal && !container.contains(e.target)) {
            faunaModal.classList.remove("active");
        }
    });

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
                        this.style.opacity = "1";
                    });

                    birdAudioPlayer.onended = () => {
                        this.style.opacity = "1";
                    };
                }
            });
        });
    }
});