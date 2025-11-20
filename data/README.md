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
      "logoImg": "ruta/a/imagen.png",
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
- **logo** (string): Iniciales o texto corto para el logo circular (usado si `logoImg` es `null`)
- **logoImg** (string|null): Ruta a la imagen del logo. Si es `null`, se usa el campo `logo` con texto
- **badgeColor** (string): Color del badge de categoría:
  - `primary`: Color principal (rosa/coral)
  - `accent`: Color de acento (dorado)
  - `secondary`: Color secundario (morado)

## Agregar una nueva tienda

Para agregar una nueva tienda, añade un nuevo objeto al array `tiendas` siguiendo la estructura anterior:

### Con texto como logo:
```json
{
  "id": 29,
  "nombre": "Nueva Tienda",
  "categoria": "moda",
  "descripcion": "Descripción de la nueva tienda",
  "ubicacion": "Planta Baja - Local 99",
  "logo": "NT",
  "logoImg": null,
  "badgeColor": "primary"
}
```

### Con imagen como logo:
```json
{
  "id": 30,
  "nombre": "Otra Tienda",
  "categoria": "tecnologia",
  "descripcion": "Descripción de otra tienda",
  "ubicacion": "Primer Piso - Local 50",
  "logo": "OT",
  "logoImg": "../assets/img/logos/otra-tienda.png",
  "badgeColor": "accent"
}
```

**Nota:** Si `logoImg` tiene una ruta válida, se mostrará la imagen. Si es `null`, se mostrará el texto del campo `logo`.

## Uso

Los datos son cargados automáticamente por `/js/locales-comerciales.js` mediante `fetch()` y renderizados dinámicamente en la página de locales comerciales.
