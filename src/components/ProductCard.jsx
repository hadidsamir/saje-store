import { Link } from 'react-router-dom'
import { useState } from 'react'

function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)
  const [img2Error, setImg2Error] = useState(false)

  const handleImageError = (e) => {
    console.error('Error loading image:', e.target.src)
    setImgError(true)
  }

  const handleImage2Error = (e) => {
    console.error('Error loading second image:', e.target.src)
    setImg2Error(true)
  }

  return (
    <Link to={`/product/${product.id}`} className="group block cursor-pointer">
      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-surface-container-low rounded-sm">
        <img 
          src={imgError ? 'https://via.placeholder.com/400x600/DA819F/FFFFFF?text=Imagen+No+Disponible' : product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          onError={handleImageError}
        />
        {product.images[1] && !img2Error && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            onError={handleImage2Error}
          />
        )}
        {product.new && (
          <div className="absolute top-4 right-4">
            <span className="bg-surface px-3 py-1 text-[10px] tracking-widest uppercase font-bold">
              Nuevo
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-headline text-lg group-hover:text-primary transition-colors text-on-surface">
            {product.name}
          </h3>
          <p className="text-on-surface-variant text-xs font-body uppercase tracking-tighter mt-1">
            {product.colors[0]} / Body
          </p>
        </div>
        <p className="font-body font-bold text-sm">${product.price.toLocaleString('es-CO')}</p>
      </div>
    </Link>
  )
}

export default ProductCard
