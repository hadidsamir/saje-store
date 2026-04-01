import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

function Cart() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  if (items.length === 0) {
    return (
      <main className="pt-32 pb-20 px-10 min-h-screen">
        <div className="max-w-4xl mx-auto text-center py-20">
          <ShoppingBag className="mx-auto mb-6 text-on-surface-variant" size={64} />
          <h1 className="text-4xl font-headline mb-4 text-on-surface">Tu carrito está vacío</h1>
          <p className="text-on-surface-variant font-body text-lg mb-8">
            Descubre nuestra colección y encuentra tus piezas favoritas
          </p>
          <Link 
            to="/shop"
            className="inline-block bg-primary text-on-primary px-10 py-5 rounded-md text-sm font-semibold tracking-widest uppercase hover:scale-95 duration-200 ease-in-out"
          >
            Ir a la Tienda
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-20 px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-headline mb-4 text-on-surface">Carrito de Compras</h1>
          <p className="text-on-surface-variant font-body text-lg">
            {items.length} producto{items.length !== 1 ? 's' : ''} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div 
                key={`${item.id}-${item.size}-${item.color}`}
                className="bg-surface-container-low p-6 rounded-lg flex gap-6"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img 
                    src={item.images[0]} 
                    alt={item.name}
                    className="w-32 h-44 object-cover object-top rounded-sm"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-headline text-xl mb-2 hover:text-primary transition-colors text-on-surface">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-on-surface-variant text-sm mb-2">
                      Color: {item.color} | Talla: {item.size}
                    </p>
                    <p className="font-body font-bold text-lg">${item.price.toLocaleString('es-CO')}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-surface px-4 py-2 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="hover:text-primary transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-body font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="hover:text-primary transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id, item.size, item.color)}
                      className="text-error hover:opacity-70 transition-opacity flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      <span className="font-body text-sm">Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-surface-container-low p-8 rounded-lg sticky top-32">
              <h2 className="font-headline text-2xl mb-6 text-on-surface">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-outline/20">
                <div className="flex justify-between font-body">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-semibold">${total.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between font-body">
                  <span className="text-on-surface-variant">Envío</span>
                  <span className="font-semibold">
                    {total >= 100000 ? 'GRATIS' : 'Calculado en el pago'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-headline text-2xl mb-8 text-on-surface">
                <span>Total</span>
                <span>${total.toLocaleString('es-CO')}</span>
              </div>

              <button className="w-full bg-primary text-on-primary px-10 py-5 rounded-md text-sm font-semibold tracking-widest uppercase hover:scale-95 duration-200 ease-in-out mb-4">
                Proceder al Pago
              </button>

              <Link 
                to="/shop"
                className="block w-full text-center border-2 border-primary text-primary px-10 py-4 rounded-md text-sm font-semibold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all duration-300"
              >
                Continuar Comprando
              </Link>

              <button
                onClick={clearCart}
                className="w-full mt-4 text-error text-sm font-body underline hover:opacity-70 transition-opacity"
              >
                Vaciar Carrito
              </button>

              {total > 0 && total < 100000 && (
                <div className="mt-6 p-4 bg-primary-light rounded text-center">
                  <p className="text-xs font-body text-primary-dark font-semibold">
                    Agrega ${(100000 - total).toLocaleString('es-CO')} más para obtener envío gratis
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart
