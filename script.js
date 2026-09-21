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
   TU SCRIPT ACTUALIZADO Y EN LÍNEA CON TU AVANCE + WIDGET FAUNA
   ========================================================== */

// Carrusel general de propiedades
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

// Control de pestañas interactivas para la sección B2B
function switchB2BTab(tabId, btnElement) {
    const panes = document.querySelectorAll('.b2b-tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
    if (btnElement) {
        btnElement.classList.add('active');
    }
}

// EFECTO DINÁMICO AL RITMO DEL SCROLL (FLUIDO TIPO APPLE)
window.addEventListener("scroll", () => {
    const revealElements = document.querySelectorAll('.apple-reveal');
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 40) {
            element.classList.add('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    window.dispatchEvent(new Event('scroll'));
});

// Funciones obligatorias para el Modal Estilo Apple
function openModal() {
    const modal = document.getElementById('infoModal');
    if (modal) modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    if (modal) modal.classList.remove('active');
}

// Cerrar si hacen clic fuera de la tarjeta blanca (en el fondo difuminado)
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

/* ----------------------------------------------------------
   CONTROL DEL MENÚ HAMBURGUESA MÓVIL (AGREGADO Y NECESARIO)
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cerrar automáticamente el menú al hacer clic en cualquier opción
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});