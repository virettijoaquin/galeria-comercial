// ==========================================
// PLAZA MAYOR - CENTRO COMERCIAL
// Main JavaScript File
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los componentes
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavLinks();
});

// ==========================================
// NAVEGACIÓN MÓVIL Y DROPDOWNS
// ==========================================
function initNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    const dropdowns = document.querySelectorAll('.navbar-dropdown');

    if (navbarToggle && navbarMenu) {
        // Toggle del menú móvil
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
            
            // Animación del ícono hamburguesa
            const spans = navbarToggle.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Cerrar menú al hacer clic en un enlace (no dropdown)
        navbarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Si es un dropdown parent, no cerrar el menú en móvil
                const isDropdownParent = this.parentElement.classList.contains('navbar-dropdown');
                
                if (isDropdownParent && window.innerWidth <= 768) {
                    e.preventDefault();
                    this.parentElement.classList.toggle('active');
                } else if (!isDropdownParent && window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    
                    const spans = navbarToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });

        // Cerrar menú al hacer clic en enlaces del dropdown
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    
                    const spans = navbarToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    
                    // Cerrar dropdowns abiertos
                    dropdowns.forEach(d => d.classList.remove('active'));
                }
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarMenu.contains(event.target);
            const isClickOnToggle = navbarToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
                
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Cerrar todos los dropdowns
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    }

    // Prevenir que los dropdowns cierren el menú en desktop
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.navbar-link');
        if (link) {
            link.addEventListener('click', function(e) {
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
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar enlaces vacíos o solo "#"
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
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
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animar cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animar secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        const subtitle = section.querySelector('.section-subtitle');
        
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            title.style.transition = 'all 0.6s ease';
            observer.observe(title);
        }
        
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(20px)';
            subtitle.style.transition = 'all 0.6s ease 0.2s';
            observer.observe(subtitle);
        }
    });
}

// ==========================================
// ACTIVE NAV LINKS (según posición de scroll)
// ==========================================
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link');

    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Cambiar estilo del header al hacer scroll
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ==========================================
// ANIMACIÓN DEL HERO AL CARGAR
// ==========================================
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 300);
    }

    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroButtons.style.transition = 'all 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
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
        behavior: 'smooth'
    });
}

// Botón de scroll to top (agregar si es necesario)
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
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

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    });

    scrollBtn.addEventListener('click', scrollToTop);
}

// Activar scroll to top button
initScrollToTop();

// ==========================================
// NEWSLETTER FORM (básico)
// ==========================================
const newsletterForm = document.querySelector('.footer-section button');
if (newsletterForm) {
    newsletterForm.addEventListener('click', function(e) {
        e.preventDefault();
        const emailInput = this.previousElementSibling;
        
        if (emailInput && emailInput.value) {
            // Aquí iría la lógica para enviar el email
            alert('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
            emailInput.value = '';
        } else {
            alert('Por favor, ingresa tu email.');
        }
    });
}

console.log('Plaza Mayor - Website cargado correctamente ✅');
