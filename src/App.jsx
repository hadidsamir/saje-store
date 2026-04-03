import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import useProductStore from './store/productStore'

function App() {
  const { fetchProducts, isLoading, error } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="font-body text-sm tracking-widest uppercase text-accent">Cargando colección...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <p className="font-headline text-2xl text-error mb-2">Oops!</p>
          <p className="font-body text-on-surface-variant mb-6">{error}</p>
          <button 
            onClick={() => fetchProducts()}
            className="px-6 py-2 bg-accent text-on-primary rounded text-sm font-body uppercase tracking-widest"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col selection:bg-primary-light selection:text-primary-dark">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  )
}

export default App
