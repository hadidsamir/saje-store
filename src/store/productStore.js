import { create } from 'zustand'
import Papa from 'papaparse'

const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRaEQgo6hAgYI4c2OXGgqDlUhvOWRcdFogdPE1vfRQTIn9rdD3QrcO4-zM7OjhdTFqXhIznGzxUZIVy/pub?output=csv"

const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  hasFetched: false,

  fetchProducts: async () => {
    if (get().hasFetched) return; // Prevent multiple fetches
    
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(GOOGLE_SHEETS_CSV_URL)
      const csvText = await response.text()
      
      Papa.parse(csvText, {
        header: true, // Usa la primera fila como nombres de propiedades
        skipEmptyLines: true,
        complete: (results) => {
          const parsedProducts = results.data.map(row => {
            // Manejar campos que pueden venir vacíos o en formatos diferentes
            return {
              id: row.id || `prod-${Math.random().toString(36).substr(2, 9)}`,
              name: row.name || 'Producto Sin Nombre',
              price: parseInt(row.price) || 0,
              description: row.description || '',
              // Convertir string de imágenes separadas por coma en array y transformar URLs de Google Drive
              images: row.images ? row.images.split(',').map(img => {
                let url = img.trim();
                // Extraer ID si es un enlace de Google Drive (ej: https://drive.google.com/file/d/ID/view)
                const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
                if (driveMatch && driveMatch[1]) {
                  return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
                }
                return url;
              }) : ['/placeholder.jpg'],
              category: row.category ? row.category.toLowerCase().trim() : 'bodys',
              // Convertir string separada por comas en array
              colors: row.colors ? row.colors.split(',').map(c => c.trim()) : [],
              sizes: row.sizes ? row.sizes.split(',').map(s => s.trim()) : [],
              // Convertir texto 'TRUE' o 'true' a booleano
              new: row.new && row.new.toString().toUpperCase() === 'TRUE'
            }
          })
          
          set({ 
            products: parsedProducts, 
            isLoading: false, 
            hasFetched: true 
          })
        },
        error: (error) => {
          console.error("Error parsing CSV:", error)
          set({ error: "Error al procesar los productos", isLoading: false })
        }
      })
    } catch (error) {
      console.error("Error fetching Google Sheet:", error)
      set({ error: "No se pudieron cargar los productos", isLoading: false })
    }
  },

  // Helper methods equivalent to what we had in products.js
  getProductById: (id) => {
    return get().products.find(p => p.id === id)
  },

  getProductsByCategory: (category) => {
    if (category === 'all') return get().products
    return get().products.filter(p => p.category === category)
  },

  getFeaturedProducts: () => {
    // Retornamos los productos marcados como nuevos o los 4 primeros
    const news = get().products.filter(p => p.new)
    if (news.length > 0) return news
    return get().products.slice(0, 4)
  }
}))

export default useProductStore
