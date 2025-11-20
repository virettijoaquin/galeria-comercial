// ==========================================
// LOCALES COMERCIALES - FILTROS Y BÚSQUEDA
// ==========================================

// Variable global para almacenar las tiendas
let tiendasData = [];

document.addEventListener('DOMContentLoaded', function() {
    loadTiendas();
});

// ==========================================
// CARGA DE DATOS DESDE JSON
// ==========================================
async function loadTiendas() {
    try {
        const response = await fetch('../data/tiendas.json');
        if (!response.ok) {
            throw new Error('Error al cargar las tiendas');
        }
        const data = await response.json();
        tiendasData = data.tiendas;
        renderTiendas(tiendasData);
        initStoresFilters();
        initStoresSearch();
    } catch (error) {
        console.error('Error:', error);
        showError();
    }
}

// ==========================================
// RENDERIZADO DE TIENDAS
// ==========================================
function renderTiendas(tiendas) {
    const storesGrid = document.getElementById('storesGrid');
    if (!storesGrid) return;
    
    storesGrid.innerHTML = '';
    
    tiendas.forEach((tienda, index) => {
        const storeCard = createStoreCard(tienda);
        storesGrid.appendChild(storeCard);
        
        // Añadir animación de entrada con delay
        setTimeout(() => {
            storeCard.style.opacity = '1';
            storeCard.style.transform = 'translateY(0)';
        }, index * 50);
    });
    
    updateStoresCount(tiendas.length);
    toggleEmptyMessage(tiendas.length === 0);
}

function createStoreCard(tienda) {
    const card = document.createElement('div');
    card.className = 'store-card';
    card.setAttribute('data-category', tienda.categoria);
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    card.innerHTML = `
        <div class="store-card-header">
            <div class="store-logo">${tienda.logo}</div>
            <span class="badge badge-${tienda.badgeColor}">${getCategoryName(tienda.categoria)}</span>
        </div>
        <div class="store-card-body">
            <h3 class="store-name">${tienda.nombre}</h3>
            <p class="store-description">${tienda.descripcion}</p>
            <p class="store-location">📍 ${tienda.ubicacion}</p>
        </div>
        <div class="store-card-footer">
            <a href="mapa.html?tienda=${tienda.id}" class="btn btn-outline-secondary">Ver en mapa</a>
        </div>
    `;
    
    return card;
}

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

// ==========================================
// FILTROS POR CATEGORÍA
// ==========================================
function initStoresFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar active al botón clickeado
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filtrar tiendas
            filterStores(category);
            
            // Limpiar búsqueda
            const searchInput = document.getElementById('storeSearch');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
}

function filterStores(category) {
    const searchInput = document.getElementById('storeSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    // Filtrar tiendas según categoría y búsqueda
    const filteredTiendas = tiendasData.filter(tienda => {
        const matchesCategory = category === 'todas' || tienda.categoria === category;
        const matchesSearch = searchTerm === '' || 
            tienda.nombre.toLowerCase().includes(searchTerm) || 
            tienda.descripcion.toLowerCase().includes(searchTerm);
        
        return matchesCategory && matchesSearch;
    });
    
    // Renderizar tiendas filtradas
    renderTiendas(filteredTiendas);
}

// ==========================================
// BÚSQUEDA POR NOMBRE
// ==========================================
function initStoresSearch() {
    const searchInput = document.getElementById('storeSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const category = activeFilter ? activeFilter.getAttribute('data-category') : 'todas';
            filterStores(category);
        });
    }
}

// ==========================================
// CONTADOR DE TIENDAS
// ==========================================
function updateStoresCount(count) {
    const countElement = document.getElementById('storesCount');
    if (countElement) {
        countElement.textContent = count || 0;
    }
}

// ==========================================
// MENSAJE VACÍO
// ==========================================
function toggleEmptyMessage(show) {
    const emptyMessage = document.getElementById('emptyMessage');
    const storesGrid = document.getElementById('storesGrid');
    
    if (emptyMessage) {
        emptyMessage.style.display = show ? 'flex' : 'none';
    }
    if (storesGrid) {
        storesGrid.style.display = show ? 'none' : 'grid';
    }
}

// ==========================================
// MANEJO DE ERRORES
// ==========================================
function showError() {
    const storesGrid = document.getElementById('storesGrid');
    if (storesGrid) {
        storesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="font-size: 3rem; margin-bottom: 1rem;">⚠️</p>
                <p style="font-size: 1.2rem; color: var(--text-muted);">
                    Error al cargar las tiendas. Por favor, intenta más tarde.
                </p>
            </div>
        `;
    }
}

console.log('Locales Comerciales - JavaScript cargado correctamente ✅');
