import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import useCartStore from '../store/cartStore'
import { products } from '../data/products'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const searchRef = useRef(null)
  
  const itemCount = useCartStore(state => state.getItemCount())
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim().length > 0) {
      const q = query.toLowerCase()
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.colors.some(c => c.toLowerCase().includes(q))
      ).slice(0, 4) // Show max 4 suggestions
      
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSuggestions(false)
      setIsMenuOpen(false)
    }
  }

  const isActive = (path, cat) => {
    if (path === '/' && location.pathname === '/') return true
    if (path === '/shop') {
      if (cat) {
        return location.pathname === '/shop' && category === cat
      }
      return location.pathname === '/shop' && !category
    }
    return false
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3" to="/">
            <img src="/logo.png" alt="SAJE Logo" className="h-12 w-12" />
            <span className="text-2xl font-headline tracking-tighter text-primary font-bold">SAJE</span>
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link 
              className={`font-body text-xs tracking-widest uppercase transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                isActive('/') 
                  ? 'text-primary after:w-full' 
                  : 'text-on-surface hover:text-primary after:w-0 hover:after:w-full'
              }`} 
              to="/"
            >
              Inicio
            </Link>
            <Link 
              className={`font-body text-xs tracking-widest uppercase transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                isActive('/shop', null) 
                  ? 'text-primary after:w-full' 
                  : 'text-on-surface hover:text-primary after:w-0 hover:after:w-full'
              }`} 
              to="/shop"
            >
              Tienda
            </Link>
            <Link 
              className={`font-body text-xs tracking-widest uppercase transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                isActive('/shop', 'bodys') 
                  ? 'text-primary after:w-full' 
                  : 'text-on-surface hover:text-primary after:w-0 hover:after:w-full'
              }`} 
              to="/shop?category=bodys"
            >
              Bodys
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div ref={searchRef} className="relative hidden lg:block">
            <form onSubmit={handleSearch} className="flex items-center bg-surface-container-low px-4 py-2 rounded-full">
              <button type="submit" className="text-on-surface-variant mr-2 hover:text-primary transition-colors">
                <Search size={16} />
              </button>
              <input 
                className="bg-transparent border-none text-xs focus:ring-0 w-40 outline-none" 
                placeholder="Buscar bodys..." 
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setShowSuggestions(false)
                  }}
                  className="text-on-surface-variant hover:text-error transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {/* Suggestions Dropdown (Desktop) */}
            {showSuggestions && (
              <div className="absolute top-full mt-2 right-0 w-72 bg-surface shadow-xl rounded-md border border-surface-container overflow-hidden z-50">
                {suggestions.length > 0 ? (
                  <div className="py-2">
                    <p className="px-4 py-2 text-[10px] font-body tracking-widest uppercase text-on-surface-variant border-b border-surface-container-low">
                      Sugerencias
                    </p>
                    {suggestions.map(product => (
                      <Link 
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setShowSuggestions(false)
                          setSearchQuery('')
                        }}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors"
                      >
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-10 h-14 object-cover object-top rounded-sm"
                        />
                        <div>
                          <p className="font-headline text-sm text-on-surface">{product.name}</p>
                          <p className="font-body font-bold text-xs text-primary">${product.price.toLocaleString('es-CO')}</p>
                        </div>
                      </Link>
                    ))}
                    <button 
                      onClick={handleSearch}
                      className="w-full text-center py-3 text-xs font-body tracking-widest uppercase text-primary hover:bg-primary-light transition-colors mt-1"
                    >
                      Ver todos los resultados
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="font-body text-sm text-on-surface-variant">No se encontraron productos</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-on-surface">
            <button className="hover:opacity-80 transition-all duration-300 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Search size={20} />
            </button>
            <Link to="/cart" className="relative hover:opacity-80 transition-all duration-300 text-on-surface">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <button 
              className="md:hidden text-on-surface hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface border-t border-surface-container shadow-lg py-4 px-8">
          <div className="relative">
            <form onSubmit={handleSearch} className="flex items-center bg-surface-container-low px-4 py-3 rounded-full mb-6">
              <button type="submit" className="text-on-surface-variant mr-2">
                <Search size={16} />
              </button>
              <input 
                className="bg-transparent border-none text-sm focus:ring-0 w-full outline-none" 
                placeholder="Buscar bodys..." 
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setShowSuggestions(false)
                  }}
                  className="text-on-surface-variant hover:text-error transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {/* Mobile Suggestions */}
            {showSuggestions && (
              <div className="absolute top-14 left-0 w-full bg-surface shadow-xl rounded-md border border-surface-container overflow-hidden z-50 mb-4">
                {suggestions.length > 0 ? (
                  <div className="py-2">
                    <p className="px-4 py-2 text-[10px] font-body tracking-widest uppercase text-on-surface-variant border-b border-surface-container-low">
                      Sugerencias
                    </p>
                    {suggestions.map(product => (
                      <Link 
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setShowSuggestions(false)
                          setSearchQuery('')
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors"
                      >
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-10 h-14 object-cover object-top rounded-sm"
                        />
                        <div>
                          <p className="font-headline text-sm text-on-surface">{product.name}</p>
                          <p className="font-body font-bold text-xs text-primary">${product.price.toLocaleString('es-CO')}</p>
                        </div>
                      </Link>
                    ))}
                    <button 
                      onClick={handleSearch}
                      className="w-full text-center py-3 text-xs font-body tracking-widest uppercase text-primary hover:bg-primary-light transition-colors mt-1 border-t border-surface-container-low"
                    >
                      Ver todos los resultados
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="font-body text-sm text-on-surface-variant">No se encontraron productos</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <Link 
              className={`font-body text-xs tracking-widest uppercase transition-all duration-300 relative w-fit after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                isActive('/') ? 'text-primary after:w-full' : 'text-on-surface hover:text-primary after:w-0 hover:after:w-full'
              }`} 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              className={`font-body text-xs tracking-widest uppercase transition-all duration-300 relative w-fit after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                isActive('/shop', null) ? 'text-primary after:w-full' : 'text-on-surface hover:text-primary after:w-0 hover:after:w-full'
              }`} 
              to="/shop" 
              onClick={() => setIsMenuOpen(false)}
            >
              Tienda
            </Link>
            <Link 
              className={`font-body text-xs tracking-widest uppercase transition-all duration-300 relative w-fit after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                isActive('/shop', 'bodys') ? 'text-primary after:w-full' : 'text-on-surface hover:text-primary after:w-0 hover:after:w-full'
              }`} 
              to="/shop?category=bodys" 
              onClick={() => setIsMenuOpen(false)}
            >
              Bodys
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
