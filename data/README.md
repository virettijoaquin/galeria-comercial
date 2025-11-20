# Datos de Tiendas - Plaza Mayor

Este directorio contiene los datos de las tiendas del centro comercial en formato JSON.

## Estructura del archivo `tiendas.json`

```json
{
  "tiendas": [
    {
      "id": 1,
      "nombre": "Nombre de la tienda",
      "categoria": "categoria",
      "descripcion": "Descripción breve de la tienda",
      "ubicacion": "Planta/Piso - Local XX",
      "logo": "Iniciales",
      "badgeColor": "primary|accent|secondary"
    }
  ]
}
```

### Campos

- **id** (número): Identificador único de la tienda
- **nombre** (string): Nombre comercial de la tienda
- **categoria** (string): Categoría de la tienda. Valores posibles:
  - `moda`
  - `tecnologia`
  - `deportes`
  - `hogar`
  - `belleza`
  - `accesorios`
  - `libreria`
  - `otros`
- **descripcion** (string): Breve descripción de los productos/servicios
- **ubicacion** (string): Ubicación física en el centro comercial
- **logo** (string): Iniciales o texto corto para el logo circular
- **badgeColor** (string): Color del badge de categoría:
  - `primary`: Color principal (rosa/coral)
  - `accent`: Color de acento (dorado)
  - `secondary`: Color secundario (morado)

## Agregar una nueva tienda

Para agregar una nueva tienda, añade un nuevo objeto al array `tiendas` siguiendo la estructura anterior:

```json
{
  "id": 29,
  "nombre": "Nueva Tienda",
  "categoria": "moda",
  "descripcion": "Descripción de la nueva tienda",
  "ubicacion": "Planta Baja - Local 99",
  "logo": "NT",
  "badgeColor": "primary"
}
```

## Uso

Los datos son cargados automáticamente por `/js/locales-comerciales.js` mediante `fetch()` y renderizados dinámicamente en la página de locales comerciales.
