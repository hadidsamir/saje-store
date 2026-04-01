import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import useCartStore from '../store/cartStore'
import ProductCard from '../components/ProductCard'
import { Check, ShoppingBag, Truck, RotateCcw, Shield } from 'lucide-react'

function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const addItem = useCartStore(state => state.addItem)
  
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-10 text-center">
        <h1 className="text-4xl font-headline mb-4">Producto no encontrado</h1>
        <Link to="/shop" className="text-secondary underline">Volver a la tienda</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor selecciona una talla y un color')
      return
    }
    
    addItem(product, selectedSize, selectedColor)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div className="flex flex-col md:flex-row gap-4 h-fit">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 order-2 md:order-1 flex-shrink-0 hide-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative aspect-[3/4] w-20 md:w-full flex-shrink-0 overflow-hidden rounded-sm border-2 transition-all ${
                    currentImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
            
            <div className="flex-1 relative aspect-[3/4] bg-surface-container-low rounded-sm overflow-hidden order-1 md:order-2">
              <img 
                src={product.images[currentImage]} 
                alt={product.name}
                className="w-full h-full object-cover object-top transition-opacity duration-300"
              />
            </div>
          </div>

          <div className="lg:pl-12">
            <div className="mb-8">
              <span className="text-primary font-body text-xs tracking-widest uppercase mb-4 block">
                Body
              </span>
              <h1 className="text-4xl md:text-5xl font-headline mb-4 text-on-surface">{product.name}</h1>
              <p className="text-3xl font-body font-bold text-primary">${product.price.toLocaleString('es-CO')}</p>
            </div>

            <div className="text-on-surface-variant font-body text-lg leading-relaxed mb-8 space-y-4">
              {product.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <p className="font-body text-sm font-bold tracking-widest uppercase mb-4">
                  Selecciona Color
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 font-body text-sm border-2 rounded transition-all ${
                        selectedColor === color
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-outline hover:border-primary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-body text-sm font-bold tracking-widest uppercase mb-4">
                  Selecciona Talla
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 font-body text-sm border-2 rounded transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-outline hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-on-primary px-10 py-5 rounded-md text-sm font-semibold tracking-widest uppercase hover:scale-95 duration-200 ease-in-out flex items-center justify-center gap-3 mb-4"
            >
              <ShoppingBag size={20} />
              Agregar al Carrito
            </button>

            {showSuccess && (
              <div className="bg-primary-light text-primary-dark px-6 py-4 rounded-md flex items-center gap-3 mb-4">
                <Check size={20} />
                <span className="font-body text-sm font-semibold">¡Producto agregado al carrito!</span>
              </div>
            )}

            <Link 
              to="/cart"
              className="block w-full text-center border-2 border-primary text-primary px-10 py-5 rounded-md text-sm font-semibold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all duration-300"
            >
              Ver Carrito
            </Link>

            <div className="mt-12 space-y-4 border-t border-outline/20 pt-8">
              <div className="flex items-start gap-4">
                <Truck className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-body font-semibold mb-1">Envío Gratis</p>
                  <p className="text-on-surface-variant text-sm">En pedidos superiores a $150</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <RotateCcw className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-body font-semibold mb-1">Devoluciones Fáciles</p>
                  <p className="text-on-surface-variant text-sm">30 días para devoluciones</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-body font-semibold mb-1">Calidad Premium</p>
                  <p className="text-on-surface-variant text-sm">Materiales de la más alta calidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-4xl font-headline mb-12 text-on-surface">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default ProductDetail
