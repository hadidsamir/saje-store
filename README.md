# SAJE Store - Tienda Online de Bodys para Mujer

Tienda online elegante y moderna para vender bodys y blusas de mujer, con diseño minimalista y sofisticado.

## 🚀 Características

- **Página Principal (Home)**: Hero section con carrusel, productos destacados, testimonios y galería
- **Tienda (Shop)**: Catálogo completo con filtros por categoría, precio y ordenamiento
- **Detalle de Producto**: Información completa, selector de talla/color, y productos relacionados
- **Carrito de Compras**: Gestión de productos, cantidades y resumen de compra
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Persistencia**: El carrito se guarda en localStorage

## 🎨 Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **Zustand** - Estado global (carrito)
- **Lucide React** - Iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🎯 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProductCard.jsx
├── pages/            # Páginas de la aplicación
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   └── Cart.jsx
├── store/            # Estado global
│   └── cartStore.js
├── data/             # Datos de productos
│   └── products.js
├── App.jsx           # Componente principal
├── main.jsx          # Punto de entrada
└── index.css         # Estilos globales
```

## 🛍️ Funcionalidades del Carrito

- Agregar productos con talla y color específicos
- Actualizar cantidades
- Eliminar productos
- Cálculo automático de totales
- Envío gratis en compras superiores a $150
- Persistencia en localStorage

## 🎨 Paleta de Colores

- **Primary**: #16191c (Negro suave)
- **Secondary**: #735c00 (Dorado)
- **Surface**: #fcf9f4 (Crema)
- **Secondary Container**: #fed65b (Amarillo dorado)

## 📱 Páginas

1. **/** - Página principal con hero, colecciones y productos destacados
2. **/shop** - Catálogo completo con filtros
3. **/product/:id** - Detalle de producto individual
4. **/cart** - Carrito de compras

## 🚀 Despliegue

El proyecto está listo para ser desplegado en plataformas como:
- Vercel
- Netlify
- GitHub Pages

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

## 📝 Notas

- Las imágenes son de alta calidad y están optimizadas
- El diseño sigue principios de UX modernos
- Totalmente responsive y accesible
- Preparado para SEO

---

Desarrollado con ❤️ para SAJE Store
