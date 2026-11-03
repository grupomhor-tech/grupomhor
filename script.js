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
   CONTROL DEL MENÚ Y BOTÓN CONTACTO
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        navLinks.classList.remove("active");

        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });

        const closeBtn = navLinks.querySelector(".menu-close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                navLinks.classList.remove("active");
            });
        }
    }

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
   EFECTO HERO (SOLO ESCRITORIO - ESTABLE Y FINO)
   ========================================================== */
let ticking = false;

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 900) return;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            const heroBg = document.getElementById('heroBg');
            if (heroBg) {
                const scrollPosition = window.scrollY || document.documentElement.scrollTop;
                const maxScroll = window.innerHeight;

                if (scrollPosition <= maxScroll) {
                    const progress = scrollPosition / maxScroll;
                    const scale = 1.15 + (progress * 0.1);
                    heroBg.style.transform = `scale(${scale}) translateZ(0)`;
                }
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

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
   CONTROL DE PESTAÑAS Y CARRUSEL B2B
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
   EFECTO APPLE REVEAL
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
   MODAL ESTILO APPLE (FILOSOFÍA)
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
   WIDGET FLOTANTE DE FAUNA SUR
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
                        console.warn("Reproducción de audio prevenida:", error);
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

/* ==========================================================
   MODAL DE PROPIEDADES (ESTILO ENGEL & VÖLKERS + VIDEOS YOUTUBE)
   ========================================================== */
let fotosModalActuales = [];
let indiceFotoModal = 0;
let idPropiedadActual = '';

const datosPropiedades = {
    'propiedad-1': {
        youtubeId: 'hsYrNm_OA2w', // Parcelas bosque nativo Pucón
        desc: `
            <p>Parcelas con servicios instalados de luz y agua desde los 5.000 a 6.000 m², camino privado en un sector exclusivo a solo 15 minutos de Pucón.</p>
            <p>Ven a conocer estas increíbles parcelas con toda la documentación al día, los terrenos son planos y algunos cuentan con una hermosa vista al volcán Villarrica.</p>
        `
    },
    'propiedad-2': {
        youtubeId: '2Th5bxFmBoE', // Departamento Condominio Loncotraro
        desc: `
            <p>Te presentamos este departamento exclusivo en Condominio Loncotraro. Ubicado en un cuarto piso, consta de 48,30 m², dos dormitorios, un baño, cocina americana, living comedor, terraza, lavandería y estacionamiento privado.</p>
            <p>Con seguridad 24/7, áreas verdes, sala de eventos, juegos infantiles y piscina.</p>
        `
    },
    'propiedad-3': {
        youtubeId: '',
        desc: `
            <p>Ofrecemos esta propiedad en el corazón de Villarrica, en Avenida Colo Colo. Un terreno urbano de 325 m² aproximados, oportunidad única de inversión en un entorno con una plusvalía proyectada al más alto nivel.</p>
            <p>Se reciben ofertas serias. Posee Rol propio y documentación al día.</p>
        `
    },
    'propiedad-4': {
        youtubeId: '',
        desc: `
            <p>Presentamos este hogar que su dueña se ha preocupado de entregar remodelado, con patio amplio y excelente conectividad para vivir en familia o invertir, ubicado en C. Lago Panguipulli (Segunda faja), un lugar consolidado de Villarrica.</p>
            <p>Sector tranquilo y seguro, con áreas verdes y cercano a colegios, supermercados, CESFAM y comercios locales.</p>
        `
    },
    'propiedad-5': {
        youtubeId: '',
        desc: `
            <p>Hermosa parcela ubicada en cerro La Barda, rodeada de naturaleza, árboles nativos y hermosas vistas a cerros y al volcán Villarrica. Cuenta con agua y luz a conectar (200 m).</p>
            <p>La parcela es la número 31, cuenta con toda su documentación al día. Y está ubicada a solo 14 km de Caburgua.</p>
        `
    },
    'propiedad-6': {
        youtubeId: 'IqDJt039_vM', // Proyecto turístico Aldea de Rinconada
        desc: `
            <p>¡Vive o invierte en un entorno privileged rodeado de bosque nativo! Ubicado a solo 30 km de Pucón (Ruta Pucón-Curarrehue, sector Catripulli). Una oportunidad única con excelente conectividad, naturaleza y comodidades listas para habitar o desarrollar un proyecto turístico.</p>
            <p><strong>Incluye:</strong><br>
            - Casa Principal (147 m² + 60 m² terraza + 40 m² estacionamiento, 6 dormitorios y 2 baños).<br>
            - Cabaña 2 (50 m², 2 dormitorios, 1 baño e incluye tinaja).<br>
            - Cabaña 3 (50 m², 2 dormitorios y 1 baño).<br>
            - Cabaña 4 (26 m², 1 dormitorio y 1 baño).</p>
        `
    }
};

function abrirPropiedadModal(cardElement, propId = '') {
    const imagenes = cardElement.querySelectorAll('.carousel img');
    fotosModalActuales = Array.from(imagenes).map(img => img.src);
    indiceFotoModal = 0;
    idPropiedadActual = propId;

    if (fotosModalActuales.length > 0) {
        document.getElementById('modalImg').src = fotosModalActuales[0];
    }

    document.getElementById('modalBadge').textContent = cardElement.querySelector('.card-badge')?.textContent || '';
    document.getElementById('modalTitle').textContent = cardElement.querySelector('.card-title')?.textContent || '';
    document.getElementById('modalSpecs').innerHTML = cardElement.querySelector('.card-specs-futuristic')?.innerHTML || '';
    document.getElementById('modalPrice').textContent = cardElement.querySelector('.card-price')?.textContent || '';

    const propData = datosPropiedades[propId];

    // Carga de descripción
    const descContainer = document.getElementById('modalDescription');
    if (descContainer) {
        descContainer.innerHTML = propData ? propData.desc : '<p style="color: #86868b; font-size: 0.9rem;">Propiedad exclusiva de Grupo Mhor.</p>';
    }

    // Manejo de video YouTube optimizado a 1080p por defecto para todos los videos
    const videoSection = document.getElementById('modalVideoSection');
    const iframe = document.getElementById('modalYoutubeIframe');

    if (propData && propData.youtubeId) {
        const originUrl = encodeURIComponent(window.location.origin);
        iframe.src = `https://www.youtube-nocookie.com/embed/${propData.youtubeId}?enablejsapi=1&origin=${originUrl}&rel=0&modestbranding=1&vq=hd1080`;
        videoSection.style.display = 'block';
    } else {
        iframe.src = '';
        videoSection.style.display = 'none';
    }

    if (propId) {
        history.pushState(null, null, `#${propId}`);
    }

    const titulo = encodeURIComponent(cardElement.querySelector('.card-title')?.textContent || 'una propiedad');
    const urlCompleta = `${window.location.origin}${window.location.pathname}#${propId}`;
    const wspUrl = `https://wa.me/56948814357?text=${encodeURIComponent('Hola Grupo Mhor, me interesa solicitar más información y detalles sobre la propiedad: ')}${titulo} (${urlCompleta})`;
    document.getElementById('modalWspBtn').href = wspUrl;

    document.getElementById('propiedadModal').classList.add('active');
}

function cerrarPropiedadModal() {
    document.getElementById('propiedadModal').classList.remove('active');

    // Pausar y limpiar video al cerrar
    const iframe = document.getElementById('modalYoutubeIframe');
    if (iframe) iframe.src = '';

    if (window.location.hash) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

function cambiarFotoModal(direccion) {
    if (fotosModalActuales.length === 0) return;
    indiceFotoModal = (indiceFotoModal + direccion + fotosModalActuales.length) % fotosModalActuales.length;
    document.getElementById('modalImg').src = fotosModalActuales[indiceFotoModal];
}

function copiarEnlacePropiedad() {
    const urlCompleta = idPropiedadActual 
        ? `${window.location.origin}${window.location.pathname}#${idPropiedadActual}` 
        : window.location.href;

    navigator.clipboard.writeText(urlCompleta).then(() => {
        alert("¡Enlace de la propiedad copiado al portapapeles!");
    }).catch(err => {
        console.error("Error al copiar enlace: ", err);
    });
}

// Detectar si el usuario entra mediante un enlace directo con hashtag al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const cardTarget = document.getElementById(hash);
        if (cardTarget) {
            setTimeout(() => {
                abrirPropiedadModal(cardTarget, hash);
            }, 400);
        }
    }
});

// Evento global para cerrar el modal al hacer clic fuera del recuadro
window.addEventListener("click", (event) => {
    const modalPropiedad = document.getElementById("propiedadModal");
    if (modalPropiedad && event.target === modalPropiedad) {
        cerrarPropiedadModal();
    }
});