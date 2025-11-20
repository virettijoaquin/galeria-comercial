// ==========================================
// PLAZA Delta - CENTRO COMERCIAL
// Main JavaScript File
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los componentes
    initNavbar();
    initSmoothScroll();
    initActiveNavLinks();
    initBrandsCarousel();
    initScrollAnimations();
    initActiveNavLinks();
});

// ==========================================
// NAVEGACIÓN MÓVIL Y DROPDOWNS
// ==========================================
function initNavbar() {
  const navbarToggle = document.getElementById("navbarToggle");
  const navbarMenu = document.getElementById("navbarMenu");
  const navbarLinks = document.querySelectorAll(".navbar-link");
  const dropdowns = document.querySelectorAll(".navbar-dropdown");

  if (navbarToggle && navbarMenu) {
    // Toggle del menú móvil
    navbarToggle.addEventListener("click", function () {
      navbarMenu.classList.toggle("active");
      navbarToggle.classList.toggle("active");

      // Animación del ícono hamburguesa
      const spans = navbarToggle.querySelectorAll("span");
      if (navbarMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Cerrar menú al hacer clic en un enlace (no dropdown)
    navbarLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Si es un dropdown parent, no cerrar el menú en móvil
        const isDropdownParent =
          this.parentElement.classList.contains("navbar-dropdown");

        if (isDropdownParent && window.innerWidth <= 768) {
          e.preventDefault();
          this.parentElement.classList.toggle("active");
        } else if (!isDropdownParent && window.innerWidth <= 768) {
          navbarMenu.classList.remove("active");
          navbarToggle.classList.remove("active");

          const spans = navbarToggle.querySelectorAll("span");
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
        }
      });
    });

    // Cerrar menú al hacer clic en enlaces del dropdown
    const dropdownLinks = document.querySelectorAll(".dropdown-menu a");
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          navbarMenu.classList.remove("active");
          navbarToggle.classList.remove("active");

          const spans = navbarToggle.querySelectorAll("span");
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";

          // Cerrar dropdowns abiertos
          dropdowns.forEach((d) => d.classList.remove("active"));
        }
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", function (event) {
      const isClickInsideNav = navbarMenu.contains(event.target);
      const isClickOnToggle = navbarToggle.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        navbarMenu.classList.contains("active")
      ) {
        navbarMenu.classList.remove("active");
        navbarToggle.classList.remove("active");

        const spans = navbarToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";

        // Cerrar todos los dropdowns
        dropdowns.forEach((d) => d.classList.remove("active"));
      }
    });
  }

  // Prevenir que los dropdowns cierren el menú en desktop
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".navbar-link");
    if (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth > 768) {
          e.preventDefault();
        }
      });
    }
  });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Ignorar enlaces vacíos o solo "#"
      if (href === "#" || href === "") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ==========================================
// ANIMACIONES AL HACER SCROLL
// ==========================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Animar cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animar secciones
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const title = section.querySelector(".section-title");
    const subtitle = section.querySelector(".section-subtitle");

    if (title) {
      title.style.opacity = "0";
      title.style.transform = "translateY(20px)";
      title.style.transition = "all 0.6s ease";
      observer.observe(title);
    }

    if (subtitle) {
      subtitle.style.opacity = "0";
      subtitle.style.transform = "translateY(20px)";
      subtitle.style.transition = "all 0.6s ease 0.2s";
      observer.observe(subtitle);
    }
  });
}

// ==========================================
// ACTIVE NAV LINKS (según posición de scroll)
// ==========================================
function initActiveNavLinks() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-link");

  // Guardar enlaces que ya tienen active desde el HTML (páginas actuales)
  const preActiveLinks = [];
  navLinks.forEach(link => {
    if (link.classList.contains('active')) {
      preActiveLinks.push(link);
    }
  });

  // También guardar enlaces activos en dropdown
  const dropdownLinks = document.querySelectorAll('.dropdown-menu a.active');

  window.addEventListener("scroll", function () {
    // Solo activar scroll links si NO hay enlaces pre-activos (páginas multi-página)
    // y solo para enlaces con href que empiecen con #
    if (preActiveLinks.length === 0 && dropdownLinks.length === 0) {
      let current = "";
      const headerHeight = document.querySelector(".header").offsetHeight;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        // Solo modificar enlaces de tipo anchor (#)
        if (href && href.startsWith("#")) {
          link.classList.remove("active");
          if (href === `#${current}`) {
            link.classList.add("active");
          }
        }
      });
    }

    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    }
  });
}

// ==========================================
// ANIMACIÓN DEL HERO AL CARGAR
// ==========================================
window.addEventListener("load", function () {
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroButtons = document.querySelector(".hero-buttons");

  if (heroTitle) {
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(30px)";
    setTimeout(() => {
      heroTitle.style.transition = "all 0.8s ease";
      heroTitle.style.opacity = "1";
      heroTitle.style.transform = "translateY(0)";
    }, 100);
  }

  if (heroSubtitle) {
    heroSubtitle.style.opacity = "0";
    heroSubtitle.style.transform = "translateY(30px)";
    setTimeout(() => {
      heroSubtitle.style.transition = "all 0.8s ease";
      heroSubtitle.style.opacity = "1";
      heroSubtitle.style.transform = "translateY(0)";
    }, 300);
  }

  if (heroButtons) {
    heroButtons.style.opacity = "0";
    heroButtons.style.transform = "translateY(30px)";
    setTimeout(() => {
      heroButtons.style.transition = "all 0.8s ease";
      heroButtons.style.opacity = "1";
      heroButtons.style.transform = "translateY(0)";
    }, 500);
  }
});

// ==========================================
// UTILIDADES
// ==========================================

// Función para hacer scroll hacia arriba
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Botón de scroll to top (agregar si es necesario)
function initScrollToTop() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--secondary-color);
        color: white;
        font-size: 24px;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;

  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.pointerEvents = "auto";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.pointerEvents = "none";
    }
  });

  scrollBtn.addEventListener("click", scrollToTop);
}

// Activar scroll to top button
initScrollToTop();

// ==========================================
// NEWSLETTER FORM (básico)
// ==========================================
const newsletterForm = document.querySelector(".footer-section button");
if (newsletterForm) {
  newsletterForm.addEventListener("click", function (e) {
    e.preventDefault();
    const emailInput = this.previousElementSibling;

    if (emailInput && emailInput.value) {
      // Aquí iría la lógica para enviar el email
      alert("¡Gracias por suscribirte! Pronto recibirás nuestras novedades.");
      emailInput.value = "";
    } else {
      alert("Por favor, ingresa tu email.");
    }
  });
}

console.log("Plaza Mayor - Website cargado correctamente ✅");

// ==========================================
// MAPA INTERACTIVO
// ==========================================

const busqueda = document.getElementById("busqueda");
const pisos = document.querySelectorAll("#filtroPiso .nav-link");

// Solo ejecutar si existe el elemento busqueda (página de mapa)
if (busqueda) {
  let tiendasData = [];
  let currentPiso = "Planta Baja";
  
  const mapaLogo = document.getElementById("mapaLogo");
  const panel = document.querySelector(".panel");
  const panel_nombre = document.getElementById("panel-nombre");
  const panel_info = document.getElementById("panel-info");
  const panel_desc = document.getElementById("panel-desc");
  const panel_logo = document.getElementById("panel-logo");
  const infoLink = document.getElementById("infoLink");
  const maps = document.querySelectorAll(".mall-map");
  const tiendasList = document.getElementById("tiendas-list");

  // Cargar tiendas desde JSON
  async function loadTiendasMapa() {
    try {
      const response = await fetch('../data/tiendas.json');
      if (!response.ok) {
        throw new Error('Error al cargar las tiendas');
      }
      const data = await response.json();
      tiendasData = data.tiendas;
      renderTiendasList();
      renderTiendasOnMap();
      filterStores();
      
      // Verificar si hay una tienda seleccionada en localStorage
      checkSelectedTienda();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Verificar si hay una tienda seleccionada desde locales-comerciales
  function checkSelectedTienda() {
    const selectedTiendaId = localStorage.getItem('selectedTienda');
    const selectedPiso = localStorage.getItem('selectedPiso');
    
    if (selectedTiendaId) {
      // Buscar la tienda por ID
      const tienda = tiendasData.find(t => t.id == selectedTiendaId);
      
      if (tienda) {
        // Scroll suave a la sección del mapa
        const seccionMapa = document.getElementById('seccion-mapa');
        if (seccionMapa) {
          seccionMapa.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
        
        // Pequeño delay para asegurar que todo esté renderizado
        setTimeout(() => {
          showTiendaOnMap(tienda);
        }, 500);
      }
      
      // Limpiar localStorage después de usar
      localStorage.removeItem('selectedTienda');
      localStorage.removeItem('selectedPiso');
    }
  }

  // Renderizar lista de tiendas
  function renderTiendasList() {
    if (!tiendasList) return;
    
    tiendasList.innerHTML = '';
    
    tiendasData.forEach(tienda => {
      const tiendaElement = document.createElement('li');
      tiendaElement.className = 'tienda';
      tiendaElement.innerHTML = `
        <strong>${tienda.nombre}</strong>
        <small>${getCategoryName(tienda.categoria)}</small>
      `;
      
      // Agregar click handler
      tiendaElement.addEventListener('click', () => {
        showTiendaOnMap(tienda);
      });
      
      tiendasList.appendChild(tiendaElement);
    });
  }

  // Renderizar marcadores en el mapa (ya no necesario con SVG, pero lo dejamos por compatibilidad)
  function renderTiendasOnMap() {
    // Los marcadores ahora están en el SVG, no necesitamos crearlos aquí
    // Esta función se mantiene vacía para no romper el código existente
    console.log('Mapas SVG cargados - marcadores integrados en SVG');
  }

  // Mostrar tienda en el mapa
  function showTiendaOnMap(tienda) {
    const pisoNormalizado = normalizePiso(tienda.piso);
    
    // Cambiar al piso de la tienda si es necesario
    if (currentPiso !== pisoNormalizado) {
      pisos.forEach((p) => {
        if (p.dataset.piso === pisoNormalizado) {
          p.click();
        }
      });
    }
    
    // Resaltar local en SVG
    setTimeout(() => {
      const svgObjects = document.querySelectorAll('.mall-map:not(.d-none) object');
      svgObjects.forEach(obj => {
        const svgDoc = obj.contentDocument;
        if (svgDoc) {
          // Remover selección de todos
          svgDoc.querySelectorAll('.local').forEach(l => l.classList.remove('selected'));
          
          // Seleccionar el local de esta tienda
          const local = svgDoc.querySelector(`.local[data-tienda-id="${tienda.id}"]`);
          if (local) {
            local.classList.add('selected');
          }
        }
      });
    }, 100);

    // Mostrar panel de información
    const logoSrc = tienda.logoImg || '../assets/img/logo.png';
    panel_logo.src = logoSrc;
    panel_nombre.textContent = tienda.nombre;
    panel_info.textContent = getCategoryName(tienda.categoria) + ' - ' + pisoNormalizado;
    panel_desc.textContent = tienda.descripcion;
    
    if (tienda.url) {
      infoLink.href = tienda.url;
      infoLink.style.display = 'inline-block';
    } else {
      infoLink.style.display = 'none';
    }
    
    panel.style.display = 'block';
  }

  // Normalizar nombre de piso
  function normalizePiso(piso) {
    const pisoMap = {
      'planta-baja': 'Planta Baja',
      'primer-piso': 'Primer Piso',
      'segundo-piso': 'Segundo Piso'
    };
    return pisoMap[piso] || piso;
  }

  // Obtener nombre de categoría
  function getCategoryName(categoria) {
    const categorias = {
      'moda': 'Moda',
      'tecnologia': 'Tecnología',
      'deportes': 'Deportes',
      'hogar': 'Hogar',
      'belleza': 'Belleza',
      'accesorios': 'Accesorios',
      'libreria': 'Librería',
      'otros': 'Otros'
    };
    return categorias[categoria] || categoria;
  }

  /* ---------------- MAIN FILTER LOGIC ---------------- */
  function filterStores() {
    const query = busqueda.value.toLowerCase();
    const tiendaElements = tiendasList.querySelectorAll('.tienda');

    tiendaElements.forEach((tiendaElement, index) => {
      const tienda = tiendasData[index];
      const nombre = tienda.nombre.toLowerCase();
      const categoria = tienda.categoria.toLowerCase();
      const pisoNormalizado = normalizePiso(tienda.piso);

      const matchSearch = nombre.includes(query) || categoria.includes(query);
      const matchPiso = currentPiso === pisoNormalizado;

      tiendaElement.style.display = matchSearch && matchPiso ? 'block' : 'none';
    });
  }

  /* ---------------- SEARCH ---------------- */
  busqueda.addEventListener("input", filterStores);

  /* ---------------- Piso FILTER ---------------- */
  pisos.forEach((piso) => {
    piso.addEventListener("click", () => {
      pisos.forEach((p) => p.classList.remove("active"));
      piso.classList.add("active");

      currentPiso = piso.dataset.piso;
      filterStores();
      updateMapVisibility(currentPiso);

      // Hide highlight and logo when switching floors
      mapaLogo.style.display = "none";
      panel.style.display = "none";
    });
  });

  /* -------------- MAP SWITCHER -------------- */
  function updateMapVisibility(piso) {
    maps.forEach((map) => {
      if (map.dataset.piso === piso) {
        map.classList.remove("d-none");
      } else {
        map.classList.add("d-none");
      }
    });
  }

  // Inicializar carga de tiendas
  loadTiendasMapa();
}

// ==========================================
// TERMINA MAPA INTERACTIVO
// ==========================================
// ==========================================
// CARRUSEL DE MARCAS
// ==========================================
function initBrandsCarousel() {
    const track = document.querySelector('.carousel-track');
    const pagination = document.querySelector('.carousel-pagination');
    
    if (!track || !pagination) return;
    
    const items = track.querySelectorAll('.brand-logo-card');
    let currentPage = 0;
    
    function getItemsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 4;
    }
    
    function getTotalPages() {
        return Math.ceil(items.length / getItemsPerView());
    }
    
    function generatePagination() {
        pagination.innerHTML = '';
        const totalPages = getTotalPages();
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Ir a página ${i + 1}`);
            
            if (i === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => goToPage(i));
            pagination.appendChild(dot);
        }
    }
    
    function getPageWidth() {
        // El ancho de la página es el ancho del contenedor menos el padding
        const container = track.parentElement;
        const style = window.getComputedStyle(container);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;
        const paddingRight = parseFloat(style.paddingRight) || 0;
        return container.offsetWidth - paddingLeft - paddingRight;
    }
    
    function goToPage(pageIndex) {
        currentPage = pageIndex;
        const pageWidth = getPageWidth();
        const offset = -currentPage * pageWidth;
        
        track.style.transform = `translateX(${offset}px)`;
        
        // Actualizar dots activos
        const dots = pagination.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }
    
    // Inicializar paginación
    generatePagination();
    
    // Drag con mouse - usar el contenedor para capturar todos los eventos
    const container = track.parentElement;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let startScrollLeft = 0;
    
    container.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
    
    // Touch para móviles
    container.addEventListener('touchstart', dragStart);
    window.addEventListener('touchmove', drag, { passive: false });
    window.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        // Solo iniciar si el click es dentro del contenedor
        if (!container.contains(e.target)) return;
        
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        currentX = startX;
        
        // Obtener la posición actual
        const transform = track.style.transform;
        const match = transform.match(/translateX\((-?\d+\.?\d*)px\)/);
        startScrollLeft = match ? parseFloat(match[1]) : 0;
        
        track.style.cursor = 'grabbing';
        track.style.transition = 'none';
        
        // Prevenir selección de texto
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const distance = currentX - startX;
        const newPosition = startScrollLeft + distance;
        
        const pageWidth = getPageWidth();
        const maxScroll = -(getTotalPages() - 1) * pageWidth;
        
        // Limitar el scroll
        const limitedPosition = Math.max(maxScroll, Math.min(0, newPosition));
        track.style.transform = `translateX(${limitedPosition}px)`;
    }
    
    function dragEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        track.style.cursor = 'grab';
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const distance = currentX - startX;
        const pageWidth = getPageWidth();
        const threshold = pageWidth * 0.2;
        
        // Determinar nueva página
        if (distance < -threshold && currentPage < getTotalPages() - 1) {
            currentPage++;
        } else if (distance > threshold && currentPage > 0) {
            currentPage--;
        }
        
        goToPage(currentPage);
    }
    
    // Recalcular en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldTotalPages = pagination.querySelectorAll('.carousel-dot').length;
            const newTotalPages = getTotalPages();
            
            // Si cambia el número de páginas, regenerar paginación
            if (newTotalPages !== oldTotalPages) {
                generatePagination();
            }
            
            // Asegurar que currentPage sea válido
            if (currentPage >= newTotalPages) {
                currentPage = 0;
            }
            
            goToPage(currentPage);
            currentTranslate = 0;
            prevTranslate = 0;
        }, 250);
    });
}

console.log('Plaza Delta - Website cargado correctamente ✅');
