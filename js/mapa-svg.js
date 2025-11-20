// ==========================================
// MAPA SVG INTERACTIVO - 3 PISOS
// ==========================================

function initSvgMap(tiendasData, showTiendaOnMapCallback) {
  const svgLocales = document.querySelectorAll('.local[data-tienda-id]');
  
  console.log(`Inicializando ${svgLocales.length} locales SVG`);
  
  svgLocales.forEach(local => {
    const tiendaId = parseInt(local.dataset.tiendaId);
    
    // Click handler
    local.addEventListener('click', function() {
      // Remover selección de otros locales en todos los SVGs
      document.querySelectorAll('.local').forEach(l => l.classList.remove('selected'));
      
      // Seleccionar este local
      this.classList.add('selected');
      
      // Buscar y mostrar la tienda
      if (tiendasData && tiendaId) {
        const tienda = tiendasData.find(t => t.id === tiendaId);
        if (tienda && showTiendaOnMapCallback) {
          showTiendaOnMapCallback(tienda);
        }
      }
    });
    
    // Hover effect - mostrar nombre
    local.addEventListener('mouseenter', function() {
      if (tiendasData && tiendaId) {
        const tienda = tiendasData.find(t => t.id === tiendaId);
        if (tienda) {
          // Crear tooltip si no existe
          let tooltip = this.querySelector('.svg-tooltip');
          if (!tooltip) {
            const svgNS = "http://www.w3.org/2000/svg";
            tooltip = document.createElementNS(svgNS, 'title');
            tooltip.textContent = tienda.nombre;
            this.appendChild(tooltip);
          }
        }
      }
    });
  });
}

// Función para resaltar un local desde el ID de tienda
function highlightLocalByTiendaId(tiendaId) {
  const svgLocales = document.querySelectorAll('.local[data-tienda-id]');
  
  // Remover selección de todos
  svgLocales.forEach(local => local.classList.remove('selected'));
  
  // Buscar y seleccionar el local correspondiente
  svgLocales.forEach(local => {
    if (parseInt(local.dataset.tiendaId) === parseInt(tiendaId)) {
      local.classList.add('selected');
      
      // Scroll suave al local
      const svg = local.closest('svg');
      if (svg) {
        const bbox = local.getBBox();
        const svgRect = svg.getBoundingClientRect();
        const scrollContainer = svg.closest('.map-container');
        
        if (scrollContainer) {
          scrollContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center'
          });
        }
      }
    }
  });
}

// Exportar funciones para uso global
if (typeof window !== 'undefined') {
  window.initSvgMap = initSvgMap;
  window.highlightLocalByTiendaId = highlightLocalByTiendaId;
}

console.log('Mapa SVG (3 pisos) - JavaScript cargado correctamente ✅');
