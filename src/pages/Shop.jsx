import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, getProductsByCategory } from '../data/products'
import { SlidersHorizontal } from 'lucide-react'

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || 'all'
  const queryParam = searchParams.get('q') || ''
  
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  // Sincronizar el estado local cuando cambia el parámetro de la URL
  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  useEffect(() => {
    let result = [...products]

    // Filter by search query
    if (queryParam) {
      const q = queryParam.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.colors.some(c => c.toLowerCase().includes(q))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Filter by price
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      result = result.filter(p => p.price >= min && p.price <= (max || Infinity))
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.new === a.new ? 0 : b.new ? 1 : -1))
    }

    setFilteredProducts(result)
  }, [selectedCategory, priceRange, sortBy, queryParam])

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', category)
    }
    setSearchParams(searchParams)
  }

  return (
    <main className="pt-32 pb-20 max-w-screen-2xl mx-auto px-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-accent font-body text-xs tracking-widest uppercase mb-4 block">
            {queryParam ? `Resultados para: "${queryParam}"` : 'La Colección'}
          </span>
          <h1 className="text-5xl md:text-6xl font-headline text-on-surface">
            {queryParam ? 'Búsqueda' : (selectedCategory === 'all' ? 'Todos los Productos' : selectedCategory)}
          </h1>
        </div>
        <p className="font-body text-on-surface-variant">
          {filteredProducts.length} Productos
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-12">
            <div>
              <h3 className="font-body text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2 text-on-surface">
                <SlidersHorizontal size={16} className="text-accent" />
                Categorías
              </h3>
              <div className="space-y-3">
                {['all', 'bodys'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`block font-body text-sm capitalize transition-colors ${
                      selectedCategory === cat ? 'text-accent font-bold' : 'text-on-surface-variant hover:text-accent'
                    }`}
                  >
                    {cat === 'all' ? 'Todos' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-body text-sm font-bold tracking-widest uppercase mb-6 text-on-surface">
                Precio
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setPriceRange('all')}
                  className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                    priceRange === 'all' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  Todos los precios
                </button>
                <button
                  onClick={() => setPriceRange('under35')}
                  className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                    priceRange === 'under35' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  Menos de $35.000
                </button>
                <button
                  onClick={() => setPriceRange('35-40')}
                  className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                    priceRange === '35-40' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  $35.000 - $40.000
                </button>
                <button
                  onClick={() => setPriceRange('over40')}
                  className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                    priceRange === 'over40' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  Más de $40.000
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-body text-sm font-bold tracking-widest uppercase mb-6 text-on-surface">
                Ordenar Por
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-surface-container-low border-none font-body text-sm text-on-surface p-3 rounded focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="featured">Destacados</option>
                <option value="newest">Más Nuevos</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-container-low rounded-sm">
              <p className="font-headline text-2xl text-on-surface mb-2">No se encontraron productos</p>
              <p className="font-body text-on-surface-variant">Intenta ajustar tus filtros o término de búsqueda.</p>
              <button 
                onClick={() => {
                  setPriceRange('all')
                  setSortBy('featured')
                  handleCategoryChange('all')
                  searchParams.delete('q')
                  setSearchParams(searchParams)
                }}
                className="mt-6 text-accent underline font-body text-sm hover:text-accent-dark transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Shop
