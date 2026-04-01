export const products = [
  {
    id: 1,
    name: "Body Elena",
    description: "Body hecho en polylicra doble, manga larga cuello redondo. \n\nEl Body Elena redefine la versatilidad de tu armario. Su tejido de polylicra doble actúa como un suave moldeador, abrazando tus curvas para brindarte un soporte increíble sin sacrificar la comodidad. El cuello redondo clásico aporta un aire de sofisticación sutil, ideal para combinar tanto con unos jeans de cintura alta para el fin de semana, como debajo de un blazer para ir a la oficina.",
    price: 38000,
    category: "bodys",
    colors: ["Negro", "Blanco"],
    sizes: ["Talla Única"],
    images: [
      "/Body Elena_.jpg",
      "/Body Elena_(1).jpg"
    ],
    featured: true,
    new: true
  },
  {
    id: 2,
    name: "Body Sofía",
    description: "body hecho en polylicra doble, manga larga cuello cuadrado. \n\nDiseñado para destacar tus clavículas y aportar un toque romántico, el Body Sofía es un imprescindible. El escote cuadrado es una de las tendencias más favorecedoras de la temporada, enmarcando el rostro elegantemente. Su confección en doble capa garantiza cero transparencias y un ajuste perfecto que se mantiene impecable del día a la noche.",
    price: 38000,
    category: "bodys",
    colors: ["Blanco", "Negro"],
    sizes: ["Talla Única"],
    images: [
      "/Body Sofía_.jpg",
      "/Body Sofía_(1).jpg"
    ],
    featured: true,
    new: true
  },
  {
    id: 3,
    name: "Body Atrevida",
    description: "Body hecho en polylicra doble, manga larga con escote en espalda. \n\nPrepárate para robar todas las miradas con el Body Atrevida. Mientras que por delante ofrece un look pulido y recatado, su profundo escote en la espalda añade una dosis de sensualidad inesperada. Perfecto para salidas nocturnas o eventos especiales donde quieres sentirte segura, esculpida y absolutamente deslumbrante.",
    price: 38000,
    category: "bodys",
    colors: ["Negro", "Beige"],
    sizes: ["Talla Única"],
    images: [
      "/Body Atrevida_.jpg",
      "/Body Atrevida_(1).jpg"
    ],
    featured: true,
    new: false
  },
  {
    id: 4,
    name: "Body Suprema",
    description: "Body hecho en polylicra doble. \n\nEl nombre lo dice todo. Suprema es nuestra pieza más pura y esencial, pensada como la base perfecta para cualquier atuendo. Su diseño sin distracciones resalta la calidad superior del material de polylicra doble que contornea tu figura, ofreciéndote ese codiciado efecto de \"segunda piel\" que todas buscamos en un básico de alta gama.",
    price: 33000,
    category: "bodys",
    colors: ["Blanco", "Negro"],
    sizes: ["Talla Única"],
    images: [
      "/Body Suprema_.jpg",
      "/Body Suprema_(1).jpg"
    ],
    featured: true,
    new: false
  },
  {
    id: 5,
    name: "body Luna",
    description: "Body hecho en polylicra doble, con escote en espalda y cuello. \n\nEl Body Luna combina la elegancia de un cuello estructurado con la audacia de una espalda descubierta. Es una pieza declarativa que habla por sí misma. Su diseño en polylicra doble no solo esculpe tu cuerpo, sino que te brinda la sujeción necesaria para llevar un escote posterior con total confianza y libertad de movimiento.",
    price: 33000,
    category: "bodys",
    colors: ["Negro"],
    sizes: ["Talla Única"],
    images: [
      "/body Luna_.jpg",
      "/body Luna_(1).jpg"
    ],
    featured: true,
    new: true
  },
  {
    id: 6,
    name: "Body Lia",
    description: "Body hecho en polylicra doble, manga corta cuello redondo. \n\nTu compañero ideal para los días más cálidos o para crear looks en capas. El Body Lia ofrece la frescura de la manga corta manteniendo la estructura y compresión suave de nuestra característica polylicra doble. Es la camiseta básica perfecta elevada a su máxima expresión, asegurando que nunca tendrás que preocuparte por pliegues incómodos.",
    price: 33000,
    category: "bodys",
    colors: ["Blanco", "Negro"],
    sizes: ["Talla Única"],
    images: [
      "/Body Lia_.jpg",
      "/Body Lia_(1).jpg"
    ],
    featured: true,
    new: false
  },
  {
    id: 7,
    name: "Body Eva",
    description: "Body hecho en polylicra doble, cuello cuadrado manga corta. \n\nFemenino, fresco y estructurado. El Body Eva toma el favorecedor cuello cuadrado y lo adapta a una versión de manga corta, perfecta para un look chic y desenfadado. La tela de compresión doble abraza tu silueta mientras el diseño geométrico del escote aporta un toque moderno a tus conjuntos diarios.",
    price: 33000,
    category: "bodys",
    colors: ["Negro", "Vino"],
    sizes: ["Talla Única"],
    images: [
      "/Body Eva_.jpg",
      "/Body Eva_(1).jpg"
    ],
    featured: true,
    new: true
  },
  {
    id: 8,
    name: "Body Isa",
    description: "Bodys hecho en polylicra doble manga sisa. \n\nEl esencial de verano por excelencia. El Body Isa sin mangas (sisa) te permite disfrutar del clima cálido mientras disfrutas del efecto moldeador de nuestra tela premium. Sus líneas limpias y diseño minimalista lo convierten en la prenda base definitiva, lista para brillar por sí sola o acompañarte bajo tus chaquetas ligeras favoritas.",
    price: 33000,
    category: "bodys",
    colors: ["Blanco", "Negro"],
    sizes: ["Talla Única"],
    images: [
      "/Body Suprema_.jpg",
      "/Body Suprema_(1).jpg"
    ],
    featured: false,
    new: true
  }
]

export const getProductsByCategory = (category) => {
  if (category === "all") return products
  return products.filter(p => p.category === category)
}

export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id))
}

export const getFeaturedProducts = () => {
  return products.filter(p => p.featured)
}
