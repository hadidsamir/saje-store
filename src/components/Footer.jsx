import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 bg-surface-container text-on-surface">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-10 max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="SAJE Logo" className="h-10 w-10" />
            <span className="font-headline text-xl text-primary font-bold">SAJE STORE</span>
          </div>
          <p className="font-body text-sm tracking-wide text-on-surface-variant max-w-xs leading-relaxed">
            Un atelier digital curado para la mujer moderna. Redefiniendo el lujo a través de siluetas esenciales y calidad sin compromisos.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="font-body text-xs font-bold tracking-widest uppercase mb-6 text-primary">Servicio al Cliente</p>
            <Link className="block font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors" to="#">
              Soporte
            </Link>
            <Link className="block font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors" to="#">
              Envíos
            </Link>
            <Link className="block font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors" to="#">
              Devoluciones
            </Link>
          </div>
          
          <div className="space-y-4">
            <p className="font-body text-xs font-bold tracking-widest uppercase mb-6 text-primary">Redes Sociales</p>
            <a className="block font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors" href="https://www.instagram.com/sajestore23/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a className="block font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors" href="https://wa.me/573116275089" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a className="block font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors" href="#" target="_blank" rel="noopener noreferrer">
              Pinterest
            </a>
          </div>
        </div>
        
        <div>
          <p className="font-body text-xs font-bold tracking-widest uppercase mb-6 text-primary">Newsletter</p>
          <div className="flex border-b-2 border-primary-light pb-2 focus-within:border-primary transition-colors">
            <input 
              className="bg-transparent border-none w-full text-sm outline-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant" 
              placeholder="Email" 
              type="email"
            />
            <button className="text-primary hover:text-primary-dark transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
          <p className="mt-4 text-[10px] text-on-surface-variant uppercase tracking-tighter">
            Únete a nuestro atelier para acceso anticipado a nuevos lanzamientos.
          </p>
        </div>
      </div>
      
      <div className="mt-20 px-10 max-w-7xl mx-auto border-t border-primary-light pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-sm tracking-wide text-on-surface-variant flex flex-wrap items-center gap-1 justify-center md:justify-start">
          <span>© 2026 SAJE STORE. TODOS LOS DERECHOS RESERVADOS.</span>
          <span className="hidden md:inline">|</span>
          <span>
            Creado por <a href="https://1012studiocreativo.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark font-semibold transition-colors underline decoration-primary/30 hover:decoration-primary">1012studio</a>
          </span>
        </p>
        <div className="flex gap-8">
          <Link className="text-[10px] tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors" to="#">
            Política de Privacidad
          </Link>
          <Link className="text-[10px] tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors" to="#">
            Términos de Uso
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
