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
    if (priceRange === 'under35') {
      result = result.filter(p => p.price < 35000)
    } else if (priceRange === '35to40') {
      result = result.filter(p => p.price >= 35000 && p.price <= 40000)
    } else if (priceRange === 'over40') {
      result = result.filter(p => p.price > 40000)
    }

    // Sort
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(result)
  }, [selectedCategory, priceRange, sortBy])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    if (category === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', category)
    }
    setSearchParams(searchParams)
  }

  const clearSearch = () => {
    searchParams.delete('q')
    setSearchParams(searchParams)
  }

  return (
    <main className="pt-32 pb-20 px-10 max-w-screen-2xl mx-auto">
      <div className="mb-16">
        <span className="text-primary font-body text-xs tracking-widest uppercase mb-4 block">
          Colección Completa
        </span>
        <h1 className="text-5xl md:text-7xl font-headline mb-4 text-on-surface">
          {queryParam ? 'Resultados de Búsqueda' : 'Tienda'}
        </h1>
        {queryParam ? (
          <div className="flex items-center gap-4 mt-4">
            <p className="text-on-surface-variant font-body text-lg">
              Mostrando resultados para: <span className="font-bold text-primary">"{queryParam}"</span>
            </p>
            <button 
              onClick={clearSearch}
              className="text-xs font-body tracking-widest uppercase underline text-on-surface-variant hover:text-error transition-colors"
            >
              Borrar Búsqueda
            </button>
          </div>
        ) : (
          <p className="text-on-surface-variant font-body text-lg max-w-2xl">
            Explora nuestra colección curada de bodys de alta calidad, diseñados para la mujer moderna que busca comodidad y elegancia.
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal size={16} />
                <h3 className="font-headline text-lg">Filtros</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-body text-xs font-bold tracking-widest uppercase mb-4">Categoría</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                        selectedCategory === 'all' 
                          ? 'bg-primary text-on-primary font-semibold' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      Todos los Productos
                    </button>
                    <button
                      onClick={() => handleCategoryChange('bodys')}
                      className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                        selectedCategory === 'bodys' 
                          ? 'bg-primary text-on-primary font-semibold' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      Bodys
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-body text-xs font-bold tracking-widest uppercase mb-4">Precio</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPriceRange('all')}
                      className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                        priceRange === 'all' 
                          ? 'bg-primary text-on-primary font-semibold' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      Todos los Precios
                    </button>
                    <button
                      onClick={() => setPriceRange('under35')}
                      className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                        priceRange === 'under35' 
                          ? 'bg-primary text-on-primary font-semibold' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      Menos de $35.000
                    </button>
                    <button
                      onClick={() => setPriceRange('35to40')}
                      className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                        priceRange === '35to40' 
                          ? 'bg-primary text-on-primary font-semibold' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      $35.000 - $40.000
                    </button>
                    <button
                      onClick={() => setPriceRange('over40')}
                      className={`block w-full text-left font-body text-sm py-2 px-3 rounded transition-colors ${
                        priceRange === 'over40' 
                          ? 'bg-primary text-on-primary font-semibold' 
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      Más de $40.000
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-body text-xs font-bold tracking-widest uppercase mb-4">Ordenar Por</p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full font-body text-sm py-2 px-3 rounded bg-surface-container border-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-low">Precio: Menor a Mayor</option>
                    <option value="price-high">Precio: Mayor a Menor</option>
                    <option value="name">Nombre A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-8 flex justify-between items-center">
            <p className="text-on-surface-variant font-body text-sm">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="font-headline text-2xl mb-2 text-on-surface">No se encontraron productos</h3>
              <p className="font-body text-on-surface-variant">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Shop
