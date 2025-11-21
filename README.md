# Plaza Delta - Galería Comercial

Trabajo práctico grupal de Diseño y Desarrollo Web

## 📋 Información del Proyecto

**Institución:** Universidad Argentina de la Empresa (UADE)  
**Materia:** Diseño y Desarrollo Web  
**Profesora:** Litovicius, Patricia  
**Horario:** Viernes 18:30hs  
**Año:** 2025

## 👥 Equipo de Desarrollo

- **FEAS, SANTIAGO** - Legajo: 1220557
- **LANTIERI, MATEO** - Legajo: [Por completar]
- **MARTINEZ, LEONARDO GONZALO** - Legajo: 1127909
- **MENA, MARIA PAZ** - Legajo: 1222870
- **VIRETTI, JOAQUÍN ANDRÉS** - Legajo: 1229509

## 🏢 Descripción del Proyecto

**Plaza Delta** es un sitio web completo para un centro comercial moderno que cuenta con más de 150 tiendas, una amplia zona gastronómica y múltiples opciones de entretenimiento para toda la familia.

El proyecto simula la experiencia digital de una galería comercial real, ofreciendo a los visitantes una navegación intuitiva para explorar tiendas, promociones, servicios y eventos.

## ✨ Características Principales

### 🏪 Directorio de Tiendas
- **Sistema dinámico basado en JSON** con 34+ tiendas distribuidas en 3 pisos
- **Filtrado por categorías:** Moda, Tecnología, Deportes, Hogar, Belleza, Accesorios, Librería
- **Búsqueda en tiempo real** por nombre o categoría
- **Sistema de logos dual:** Imágenes + fallback de texto
- **Enlaces a sitios web** de las tiendas (cuando disponible)
- **Distribución por pisos:**
  - Planta Baja: 11 locales
  - Primer Piso: 13 locales (incluye food court)
  - Segundo Piso: 10 locales

### 🗺️ Mapa Interactivo
- **Mapas SVG personalizados** para cada piso del centro comercial
- **Clickeable:** Selección directa de locales en el mapa
- **Navegación integrada:** Click en "Ver en mapa" desde el directorio guarda en localStorage y redirige
- **Auto-scroll inteligente:** Desplazamiento automático en mobile para mejor visualización
- **Código de colores por piso:**
  - Planta Baja: Azul (#1976D2)
  - Primer Piso: Violeta (#7B1FA2)
  - Segundo Piso: Verde (#388E3C)
- **Elementos especiales:** Escaleras, entrada, terraza, food court
- **Panel de información:** Muestra detalles al seleccionar una tienda

### 🎉 Promociones y Ofertas
- **Cards con hover effects unificados**
- **Sistema de filtrado** por categoría
- **Diseño responsive** con grid de 2-3 columnas
- **Imágenes optimizadas** y textos descriptivos
- **Overlays semitransparentes** para mejor jerarquía visual

### 🍽️ Gastronomía
- **Sección dedicada** con restaurantes, cafeterías y food court
- **Filtros por tipo:** Comida rápida, cafetería, restaurante
- **Información completa:** Horarios, especialidades, precios promedio

### 🎮 Entretenimiento
- **Cines, salas de juegos y actividades familiares**
- **Información de eventos** y actividades especiales
- **Horarios y precios** claramente detallados

### 🛠️ Servicios
- **WiFi gratuito**
- **Estacionamiento**
- **Cajeros automáticos**
- **Baños**
- **Sala de lactancia**
- **Accesibilidad completa**
- **Servicio de paquetería**

### 📞 Contacto
- **Formulario completo** con validación en tiempo real
- **Múltiples canales:** Email, teléfono, WhatsApp
- **Mapa de ubicación** integrado con Google Maps (iframe responsive)
- **Horarios de atención** detallados
- **Redes sociales:** Facebook, Instagram, Twitter, YouTube

### ❓ FAQ y Ayuda
- **Preguntas frecuentes** organizadas por categorías
- **Términos y condiciones**
- **Política de privacidad**
- **Mapa del sitio** con navegación completa

### 💼 Trabaja con Nosotros
- **Formulario de postulación**
- **Información sobre locales disponibles**
- **Oportunidades laborales**

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados con variables CSS
- **JavaScript (Vanilla)** - Interactividad sin frameworks
- **SVG** - Mapas vectoriales escalables e interactivos

### Características Técnicas
- **Responsive Design** - Mobile-first approach
- **Grid & Flexbox** - Layouts modernos
- **localStorage API** - Persistencia de navegación
- **Fetch API** - Carga dinámica de datos JSON
- **CSS Animations** - Transiciones y hover effects
- **Custom Properties** - Variables CSS para mantenibilidad
- **Semantic HTML** - Accesibilidad y SEO

## 📁 Estructura del Proyecto

```
galeria-comercial/
├── index.html                 # Página principal
├── README.md                  # Documentación
├── assets/
│   ├── icons/                 # Iconos y favicon
│   │   ├── favicon.ico
│   │   └── logo.png
│   └── img/                   # Imágenes y mapas
│       ├── logos/             # Logos de tiendas
│       ├── mapa-planta-baja.svg
│       ├── mapa-primer-piso.svg
│       └── mapa-segundo-piso.svg
├── data/
│   └── tiendas.json          # Base de datos de tiendas (34 stores)
├── js/
│   ├── main.js               # Lógica principal y mapa
│   ├── locales-comerciales.js # Sistema de directorio
│   ├── mapa-svg.js           # Interactividad SVG
│   └── contacto.js           # Validación de formularios
├── pages/
│   ├── locales-comerciales.html
│   ├── mapa.html
│   ├── contacto.html
│   ├── preguntas-frecuentes.html
│   ├── mapa-del-sitio.html
│   ├── terminos-condiciones.html
│   ├── gastronomia/
│   │   └── gastronomia.html
│   ├── entretenimiento.html
│   ├── ofertas/
│   │   ├── ofertas.html
│   │   └── ofertas.css
│   ├── promociones/
│   │   ├── promociones.html
│   │   └── promociones.css
│   ├── servicios/
│   │   ├── servicios.html
│   │   └── servicios.css
│   └── trabaja-con-nosotros/
│       ├── trabaja-con-nosotros.html
│       └── trabaja-con-nosotros.css
└── style/
    └── style.css             # Estilos globales (4000+ líneas)
```

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
--primary-color: #1a1a2e;      /* Azul marino profundo */
--secondary-color: #e94560;    /* Rosa coral vibrante */
--accent-color: #f4a261;       /* Dorado arena */
--white: #ffffff;
--light-gray: #f8f9fa;
--success-color: #27ae60;
--error-color: #e74c3c;
```

### Tipografía
- **Fuente principal:** Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Pesos:** 300 (Light), 400 (Normal), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Escalado responsivo:** 12px - 48px

### Componentes Reutilizables
- Navbar responsive con dropdown
- Cards con hover effects
- Botones con variantes (primary, secondary, outline)
- Formularios con validación
- Hero sections (simple y con imagen)
- Footer completo con newsletter

## 🚀 Funcionalidades Avanzadas

### Sistema de Navegación
- **localStorage Integration:** Guarda la tienda seleccionada al navegar desde el directorio al mapa
- **Auto-scroll:** Desplazamiento automático a secciones relevantes
- **Breadcrumbs:** Navegación contextual
- **Sticky Navigation:** Header fijo en scroll

### Mapa Interactivo SVG
- **3 mapas SVG personalizados** (1000x700 viewBox)
- **data-tienda-id attributes** para sincronización con JSON
- **Estados visuales:** hover, selected (con animación pulse)
- **Acceso via contentDocument** para manipulación DOM
- **Escaleras y entrada** claramente señalizadas

### Sistema de Filtrado
- **Búsqueda dinámica:** Filtrado instantáneo por texto
- **Filtros por categoría:** Toggle de múltiples categorías
- **Filtros por piso:** Navegación entre plantas
- **Combinación de filtros:** AND logic para búsqueda + categoría + piso

### Optimizaciones
- **Lazy loading** de imágenes
- **Animaciones CSS performantes** (transform, opacity)
- **Debouncing** en búsqueda
- **Sprites SVG** para iconos
- **Minificación lista** para producción

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px (1 columna)
- **Tablet:** 768px - 1200px (2 columnas)
- **Desktop:** > 1200px (3 columnas / layouts complejos)

### Adaptaciones Mobile
- Hamburger menu
- Stacked layouts
- Touch-optimized buttons (min 44x44px)
- Auto-scroll to map on local selection
- Simplified navigation

## 🔄 Flujo de Usuario

1. **Landing** → Hero con llamado a la acción
2. **Explorar Tiendas** → Filtrar por categoría/piso
3. **Ver en Mapa** → Click guarda en localStorage
4. **Navegación al Mapa** → Auto-scroll + highlight
5. **Información Detallada** → Panel con datos de la tienda
6. **Visitar Sitio** → Link externo (si disponible)

## 📊 Datos y Contenido

### Tiendas (34 totales)
- 11 en Planta Baja
- 13 en Primer Piso
- 10 en Segundo Piso

### Categorías
- Moda (Zara, H&M, Nike, Adidas)
- Tecnología (Samsung, Apple Store)
- Deportes (Nike, Adidas, Puma)
- Hogar (IKEA, Casa Shop)
- Belleza (Sephora, Farmacity)
- Accesorios (Pandora, Cartier)
- Librería (Yenny)

### Gastronomía
- McDonald's
- Le Pain Quotidien
- Luccianos
- Starbucks
- Y más...

## 📝 Notas de Desarrollo

### Convenciones de Código
- **Nomenclatura:** camelCase para JavaScript, kebab-case para CSS
- **Indentación:** 2 espacios
- **Comentarios:** Secciones claras con separadores
- **Commits:** Mensajes descriptivos en español

### Git Workflow
- Branch principal: `main`
- Features en branches separadas
- Pull requests para revisión

## 📄 Licencia

Este proyecto es un trabajo académico desarrollado para la materia Diseño y Desarrollo Web de UADE.

---

**Universidad Argentina de la Empresa (UADE)**  
Diseño y Desarrollo Web - 2025  
Viernes 18:30hs
