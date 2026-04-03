import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import useProductStore from '../store/productStore'
import { Quote } from 'lucide-react'

function Home() {
  const getFeaturedProducts = useProductStore(state => state.getFeaturedProducts)
  const featuredProducts = getFeaturedProducts()

  return (
    <main className="pt-0">
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover object-top" 
            src="/body Luna_.jpg"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/50 to-transparent"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center px-10 md:px-24 max-w-7xl mx-auto">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-surface mb-4">
            Colección Bodys 2026
          </span>
          <h1 className="text-6xl md:text-8xl text-surface leading-tight mb-8 max-w-2xl font-headline tracking-tighter">
            Bodys que <br/><i className="font-normal">realzan tu figura</i>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop"
              className="bg-primary text-on-primary px-10 py-5 rounded-md text-sm font-semibold tracking-widest uppercase hover:scale-95 duration-200 ease-in-out text-center"
            >
              Ver Nuevos Productos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 px-10 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <img 
                className="w-full h-[700px] object-cover object-top rounded-sm" 
                src="/Body Eva_(1).jpg"
                alt="Collection"
              />
              <div className="absolute -bottom-10 -right-10 bg-accent-light p-12 hidden md:block shadow-lg">
                <h3 className="font-headline text-4xl text-accent-dark">01</h3>
                <p className="font-body text-xs tracking-widest uppercase mt-2 text-on-surface">Nuevos Bodys</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-20">
            <span className="text-accent font-body text-xs tracking-widest uppercase mb-6 block">
              Selección Curada
            </span>
            <h2 className="text-5xl md:text-7xl font-headline mb-8 leading-tight text-on-surface">
              Sofisticación <br/>Sin Esfuerzo
            </h2>
            <p className="text-on-surface-variant font-body text-lg max-w-lg mb-12 leading-relaxed">
              Nuestra última colección de blusas y bodys se enfoca en la intersección de la innovación textil y el diseño atemporal. Cada pieza es una conversación entre forma y función.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4 group cursor-pointer">
                <Link to="/shop?category=bodys" className="block overflow-hidden">
                  <img 
                    src="/Body Suprema_.jpg" 
                    alt="Category 1"
                    className="w-full aspect-[3/4] object-cover object-top rounded-sm transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <Link to="/shop?category=bodys" className="font-body text-sm tracking-widest uppercase hover:text-accent transition-colors inline-block">Bodys</Link>
              </div>
              <div className="space-y-4 group cursor-pointer mt-16">
                <Link to="/shop?category=bodys" className="block overflow-hidden">
                  <img 
                    src="/Body Atrevida_.jpg" 
                    alt="Category 2"
                    className="w-full aspect-[3/4] object-cover object-top rounded-sm transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <Link to="/shop?category=bodys" className="font-body text-sm tracking-widest uppercase hover:text-accent transition-colors inline-block">Nuevos Estilos</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-accent font-body text-xs tracking-widest uppercase mb-4 block">
                Edición de Temporada
              </span>
              <h2 className="text-5xl font-headline text-on-surface">Los Esenciales</h2>
            </div>
            <Link 
              to="/shop"
              className="font-body text-xs tracking-widest uppercase border-b-2 border-accent pb-1 hover:text-accent-dark transition-colors text-accent"
            >
              Ver todos los productos
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-10 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 flex justify-center">
            <Quote className="text-accent" size={48} />
          </div>
          <h2 className="text-4xl md:text-6xl font-headline leading-tight italic mb-12">
            "La calidad y el ajuste de la colección Bodys es incomparable. Es raro encontrar piezas que se sientan como una segunda piel mientras mantienen tal integridad de alta moda."
          </h2>
          <div className="flex flex-col items-center">
            <p className="font-body text-sm tracking-[0.2em] uppercase font-bold">Elena Moretti</p>
            <p className="font-body text-xs text-on-surface-variant mt-1">Directora Creativa, VOGUE Italia</p>
          </div>
        </div>
      </section>

      <section className="pb-32 px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATq3xupZ7YqfwGmBXlDgXQThsVm5P6W3M9pJpz3y-xHAq04bvCHZw7wsjEF-cZ6P0iq34Y0l13WDKJRBtX1He3fHf7dtziWIAjH2V7d8cjYkzwHWUlyfQbq8wQZ27qkXfjFrT1sv1rJRj6LrBzmScm2VCwMlJlbJLdbFNJ0UUCoVLXJT7MBy4jcBadSM69QRlth88of_o45S-DecxI7Zx7jHIEy3e4cmjXye61dYY_rwJev0dczmCKe0x51vbYcx5yimCI99-Am8x5"
              alt="Atelier"
            />
            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-surface font-body text-xs tracking-widest uppercase">Dentro del Atelier</span>
            </div>
          </div>
          
          <div className="relative group overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsRFKap9-hckz7E4I1ERMylDLSdJkJ4FMNEqiUbnIhHw2RjF3f2uUdiVcqoGsQdz5dq0HeqqRv3CO0ULT1gnyL4p8fmTgFuxhUTOfBCVGs-GxEQnmIkGjYCSXMuLVrRkewP1KEjC1Gd6IbqfbSyVDjncE4s5dXQUEb1e8yd6yzEp_nqg6ZitIl369z5hR0a4Mqfe6WOx9IYUHvrm9q6gA_UdD3kr_47g_Cp9ByOeltZ0h3pTRdS6jri9Mi150xgIg3uHuN2nMMCkjt"
              alt="Detail"
            />
          </div>
          
          <div className="relative group overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjRcNwnPvf9ZdY3DiXt8TFm0R0AeYeJmlGidDYRVNDGuT3e0cT4bmneOA5ow65uZO324KRzNJISWFnPIMQRvapDmQjm6F1U1QVtGKY-txpnaKVffcpvRhMd-lTci4jG5r53JgLoBJiTLIEJFN20R2PQrpOd8oZQKiAxxsfcdQPZK0NP89bVHrTJzlvUaPDv0SOPmzt_oEsH4RkXmm4_8-iXLuQTE3EhJukpF0xI2pB9mNQgjs3XVyCbBKfluuywAMONmIQgA4lTjoD"
              alt="Logo"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
