/* ==========================================================================
   LÓGICA DE ANIMACIÓN PARA SERVICIOS - L&L CONTRACTORS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector('#servicesss-section');

    const header = section.querySelector('.reveal-item');
    const cards = section.querySelectorAll('.card-wrap');

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                if (entry.target.classList.contains('reveal-item')) {
                    entry.target.classList.add('reveal');
                }

                if (entry.target.classList.contains('card-wrap')) {

                    const index = Array.from(cards).indexOf(entry.target);

                    setTimeout(() => {
                        entry.target.classList.add('reveal');
                    }, 150 + index * 180);
                }

                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -10% 0px"
    });

    section.querySelectorAll('.reveal-item, .card-wrap')
        .forEach(el => observer.observe(el));
});



document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.card-wrap');

    cards.forEach(card => {

        card.addEventListener('click', () => {

            const isActive = card.classList.contains('active');

            cards.forEach(c => c.classList.remove('active'));

            if (!isActive) {
                card.classList.add('active');
            }

        });

    });

});


/* ==========================================================================
   ANTES / DESPUES - L&L CONTRACTORS
   ========================================================================== */
document.querySelectorAll('.project-card').forEach(card => {

    const tag = card.querySelector('.status-tag');
    const textoInicial = tag.innerText;
    const textoDespues = card.getAttribute('data-after');

    const resetAll = () => {
        document.querySelectorAll('.project-card').forEach(c => {
            c.classList.remove('active');
            const t = c.querySelector('.status-tag');
            if (t) t.innerText = t.dataset.original || t.innerText;
        });
    };

    tag.dataset.original = textoInicial;

    // HOVER PC
    card.addEventListener('mouseenter', () => {
        if (window.matchMedia("(hover:hover)").matches) {
            card.classList.add('active');
            tag.innerText = textoDespues;
        }
    });

    card.addEventListener('mouseleave', () => {
        if (window.matchMedia("(hover:hover)").matches) {
            card.classList.remove('active');
            tag.innerText = textoInicial;
        }
    });

    // CLICK (MÓVIL + PC fallback)
    card.addEventListener('click', () => {
        const isActive = card.classList.contains('active');

        resetAll();

        if (!isActive) {
            card.classList.add('active');
            tag.innerText = textoDespues;
        }
    });

});



/* ==========================================================================
   SECCION BITACORAS - L&L CONTRACTORS INC.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const allCards = Array.from(document.querySelectorAll('.floating-card'));
    const loadBtn = document.getElementById('btnLoadMore');
    const btnText = document.getElementById('btnText');
    const portfolioSection = document.getElementById('portfolioSection');
    const es = document.documentElement.lang === 'es';
    
    let isExpanded = false;

    const updateVisibility = () => {
        const limit = (window.innerWidth < 768) ? 2 : 3;
        allCards.forEach((card, index) => {
            if (isExpanded) {
                card.classList.remove('hidden-card');
                card.classList.add('visible-anim');
            } else {
                if (index >= limit) {
                    card.classList.add('hidden-card');
                    card.classList.remove('visible-anim');
                } else {
                    card.classList.remove('hidden-card');
                    card.classList.add('visible-anim');
                }
            }
        });
    };

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateVisibility, 150);
    });

    updateVisibility();

    if (loadBtn) {
        loadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            isExpanded = !isExpanded;
            updateVisibility();
            
            btnText.innerText = isExpanded ? 
                (es ? "MOSTRAR MENOS " : "SHOW LESS ") : 
                (es ? "MOSTRAR MÁS " : "SHOW MORE ");
            
            if (!isExpanded && portfolioSection) {
                const rect = portfolioSection.getBoundingClientRect();

                if (rect.top < 0) {
                    window.scrollTo({
                        top: window.pageYOffset + rect.top - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    document.querySelectorAll('.toggle-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            const card = btn.closest('.floating-card');
            card.classList.toggle('active');
            btn.innerText = card.classList.contains('active') ? 
                            (es ? "OCULTAR DETALLES" : "HIDE DETAILS") : 
                            (es ? "TOCA PARA MÁS DETALLES" : "TAP FOR DETAILS");
        });
    });
});



/* ==========================================================================
   SLIDER IMAGENES INICIO - L&L CONTRACTORS INC.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const showcaseSlides = document.querySelectorAll(".hero-fade-slider .showcase-slide");
    
    if (showcaseSlides.length === 0) return;

    let currentSlideIndex = 0;
    const timePerSlide = 8000; 

    function playPremiumSlider() {
        showcaseSlides[currentSlideIndex].classList.remove("active");

        currentSlideIndex = (currentSlideIndex + 1) % showcaseSlides.length;

        showcaseSlides[currentSlideIndex].classList.add("active");
    }

    setInterval(playPremiumSlider, timePerSlide);
});



/* ==========================================================================
   UBICACION - L&L CONTRACTORs
   ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {

    const isEnglish = document.documentElement.lang === "en";

    const T = {
        open: isEnglish ? "OPEN" : "ABIERTO",
        closed: isEnglish ? "CLOSED" : "CERRADO",
        closesIn: isEnglish ? "CLOSES IN" : "CIERRA EN",
        hour: "H",
        minute: "M",
        less: isEnglish ? "LESS THAN A MINUTE" : "MENOS DE UN MINUTO"
    };

    function updateStatus() {

        const barraTexto = document.getElementById("estadoHorario");
        const container = document.querySelector(".premium-showroom");

        if (!barraTexto || !container) return;

        const now = new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago"
        });

        const chicagoTime = new Date(now);

        const hour = chicagoTime.getHours();
        const day = chicagoTime.getDay();

        const isOpen =
            (day === 0 || day === 6)
                ? (hour >= 8 && hour < 20)
                : (hour >= 7 && hour < 22);

        container.classList.remove("status-open", "status-closed");

        if (isOpen) {

            container.classList.add("status-open");

            const openHour =
                (day === 0 || day === 6) ? 20 : 22;

            const openMinutes = openHour * 60;
            const currentMinutes = hour * 60 + chicagoTime.getMinutes();

            let diff = openMinutes - currentMinutes;

            const h = Math.floor(diff / 60);
            const m = diff % 60;

            let text = "";

            if (h > 0) text += `${h}${T.hour}`;
            if (m > 0) text += ` ${m}${T.minute}`;

            if (h === 0 && m === 0) {
                text = T.less;
            }

            barraTexto.innerText = `${T.open} (${T.closesIn} ${text})`;

        } else {

            container.classList.add("status-closed");
            barraTexto.innerText = T.closed;
        }
    }

    updateStatus();
    setInterval(updateStatus, 60000);
});



/* ==========================================================================
   BOTON LLAMAR - L&L CONTRACTORS INC. 
   ========================================================================== */
window.addEventListener("DOMContentLoaded", () => {

  const call = document.getElementById("call-item");

  // animación inicial
  call.classList.add("active");

  setTimeout(() => {
    call.classList.remove("active");
    call.classList.add("normal");
  }, 6000);

});


/* ==========================================================================
   MENU - L&L CONTRACTORS INC. 
   ========================================================================== */
function openMenu() {

  document.body.classList.add("menu-open");

  document
    .getElementById("menu-panel")
    .classList.add("active");

  document
    .getElementById("menu-blur")
    .classList.add("active");
}

function closeMenu() {

  document.body.classList.remove("menu-open");

  document
    .getElementById("menu-panel")
    .classList.remove("active");

  document
    .getElementById("menu-blur")
    .classList.remove("active");
}

function toggleMenu() {

  if (
    document.body.classList.contains("menu-open")
  ) {
    closeMenu();
  } else {
    openMenu();
  }
}

function goTo(id) {

  closeMenu();

  setTimeout(() => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, 180);
}

// DESLIZAR 
function goToSection(id) {

  closeMenu();

  const section =
    document.getElementById(id);

  if (!section) return;

  let offset;

  if (id === "home" || id === "inicio") {

    if (window.innerWidth >= 769) {

      offset = 180;

    } else {

      offset = 150;

    }

  } else {

    if (window.innerWidth >= 769) {

      offset = 110;

    } else {

      offset = 60;

    }

  }

  const top =
    section.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  window.scrollTo({
    top: top,
    behavior: "smooth"
  });

}


/* =====================================
   FORMULARIO - L&L CONTRACTORS INC. 
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#contact-form");
    const fields = document.querySelectorAll("#contacto input, #contacto textarea, #contacto select");

    const select = document.querySelector("#contacto select[name='servicio']");
    const textarea = document.getElementById("more-info");

    const KEY = "contact_form_pro";
    const EXPIRATION = 1000 * 60 * 60; // 1 hora
    const INACTIVITY_LIMIT = 1000 * 60 * 2; // 2 minutos

    let inactivityTimer;

    function resetInactivityTimer() {

        clearTimeout(inactivityTimer);

        inactivityTimer = setTimeout(() => {

            localStorage.removeItem(KEY);
            console.log("🧹 Borrado por inactividad");

        }, INACTIVITY_LIMIT);
    }

    if (select && textarea) {

        select.addEventListener("change", () => {

            if (select.value === "other") {
                textarea.style.display = "block";
                textarea.focus();
            } else {
                textarea.style.display = "none";
                textarea.value = "";
            }

            resetInactivityTimer();
        });
    }

    fields.forEach(field => {

        field.addEventListener("input", () => {

            resetInactivityTimer();

            const data = {};

            fields.forEach(el => {
                const key = el.name;
                if (key) data[key] = el.value;
            });

            localStorage.setItem(KEY, JSON.stringify({
                time: Date.now(),
                data: data
            }));
        });
    });

    const saved = localStorage.getItem(KEY);

    if (saved) {

        const parsed = JSON.parse(saved);

        const expired = Date.now() - parsed.time > EXPIRATION;

        if (!expired) {

            fields.forEach(field => {

                const key = field.name;

                if (parsed.data[key]) {
                    field.value = parsed.data[key];
                }
            });

            if (parsed.data.servicio === "other") {
                textarea.style.display = "block";
            }

        } else {
            localStorage.removeItem(KEY);
        }
    }

    if (form) {
        form.addEventListener("submit", () => {
            localStorage.removeItem(KEY);
        });
    }

    resetInactivityTimer();

});

/* =====================================
   BENEFICIOS - L&L CONTRACTORS INC. 
   ===================================== */
const cards = document.querySelectorAll(".dash-card");

cards.forEach(card => {
    card.addEventListener("click", function () {

        // solo móvil/tablet
        if (window.innerWidth <= 992) {

            // cierra otras tarjetas
            cards.forEach(c => {
                if (c !== this) c.classList.remove("is-open");
            });

            // abre/cierra la actual
            this.classList.toggle("is-open");
        }
    });
});


/* =====================================
   PROMO BAR DESAPARECE - L&L CONTRACTORS INC. 
   ===================================== */
  window.addEventListener('scroll', function() {
            const header = document.getElementById("main-header");
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });





/* ===========================================
   CONECTAR FORMULARIO - L&L CONTRACTORS INC. 
   =========================================== */
document.addEventListener("DOMContentLoaded", function () {

  const contactForm = document.getElementById("contact-form");
  const successMessage = document.getElementById("successMessage");
  const btn = document.getElementById("submit-btn");

  let isSending = false;

  const lang = document.documentElement.lang || "en";

  const t = {
    es: {
      sending: "Enviando...",
      button: "ENVIAR SOLICITUD",
      error: "No se pudo enviar la solicitud. Por favor, inténtalo de nuevo más tarde."
    },
    en: {
      sending: "Sending...",
      button: "SUBMIT REQUEST",
      error: "We couldn't send your request. Please try again later."
    }
  };

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isSending) return;
    isSending = true;

    if (btn) {
      btn.disabled = true;
      btn.textContent = t[lang].sending;
    }

    const servicio = this.servicio.value;
    const detallesInput = this.detalles.value.trim();

    let detallesFinal;

    if (servicio === "other") {
      detallesFinal = detallesInput ||
        (lang === "es"
          ? "No se proporcionaron detalles"
          : "No details provided"
        );
    } else {
      detallesFinal =
        lang === "es"
          ? "No requerido (servicio estándar seleccionado)"
          : "Not required (standard service selected)";
    }

    emailjs.send("service_2xv9j0d", "template_3uuk4xs", {
      nombre: this.nombre.value,
      telefono: this.telefono.value,
      email: this.email.value,

      serviceValue: this.servicio.value,
      serviceText: this.servicio.options[this.servicio.selectedIndex].text,

      detalles: detallesFinal
    })
    .then(() => {

      successMessage.style.display = "block";
      contactForm.reset();

      isSending = false;

      if (btn) {
        btn.disabled = false;
        btn.textContent = t[lang].button;
      }

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);

    })
    .catch((error) => {

      console.error(error);

      alert(t[lang].error);

 
      isSending = false;

      if (btn) {
        btn.disabled = false;
        btn.textContent = t[lang].button;
      }

    });

  });

});



function goToSection(id) {
    const el = document.getElementById(id);

    closeMenu();

    setTimeout(() => {
        const top = el.offsetTop - 60;

        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }, 600);
}



