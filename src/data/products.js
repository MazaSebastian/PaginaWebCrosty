// Importar el servicio de productos
import { productService } from '../services/productService';

// Mantener compatibilidad con el código existente
export const products = {
  get pollos() {
    return productService.getProductsByCategory('pollos');
  },
  get tartas() {
    return productService.getProductsByCategory('tartas');
  }
};

export const getFeaturedProducts = () => {
  return productService.getFeaturedProducts();
};

export const getProductsByCategory = (category) => {
  return productService.getProductsByCategory(category);
};

export const getProductById = (id) => {
  return productService.getProductById(id);
};
