// Servicio para manejar productos con localStorage
const STORAGE_KEY = 'crosty_products';

// Productos por defecto
const defaultProducts = {
  pollos: [
    {
      id: 'pollo-limon',
      name: 'Pollo al Limón',
      description: 'Clásico sabor mediterráneo, con un toque de pimentón y finas hierbas.',
      category: 'pollos',
      prices: {
        '3': 16000,
        '5': 25000
      },
      image: '/images/pollo-limon.png',
      featured: true
    },
    {
      id: 'pollo-honey',
      name: 'Pollo Honey',
      description: 'Pollo marinado en salsa de soja, miel, jengibre azúcar mascabo y sésamo tostado.',
      category: 'pollos',
      prices: {
        '3': 18000,
        '5': 28500
      },
      image: '/images/pollo-honey.png',
      featured: true
    },
    {
      id: 'pollo-teriyaki',
      name: 'Pollo Teriyaki',
      description: 'Pollo marinado en salsa de soja, miel, mirin, miel y azúcar mascabo.',
      category: 'pollos',
      prices: {
        '3': 18500,
        '5': 29000
      },
      image: '/images/pollo-teriyaki.png',
      featured: false
    },
    {
      id: 'pollo-spicy',
      name: 'Pollo Spicy',
      description: 'Pollo marinado y cocinado con salsa de ají picante, soja, mirin y azúcar mascabo.',
      category: 'pollos',
      prices: {
        '3': 18000,
        '5': 28500
      },
      image: '/images/pollo-spicy.png',
      featured: false
    }
  ],
  tartas: [
    {
      id: 'jamon-queso',
      name: 'Tarta Individual de Jamón y Queso',
      description: 'Queso muzzarella, Queso Filadelphia y Jamón picado.',
      category: 'tartas',
      prices: {
        '3': 20000,
        '6': 38000,
        '9': 54000,
        '12': 70000
      },
      image: '/images/jamon-queso.png',
      featured: true
    },
    {
      id: 'espinaca-hongos',
      name: 'Tarta Individual de Espinaca y Hongos',
      description: 'Espinaca, zanahoria rallada, hongos portobello y cebolla salteada.',
      category: 'tartas',
      prices: {
        '3': 20000,
        '6': 38000,
        '9': 54000,
        '12': 70000
      },
      image: '/images/espinaca-hongos.png',
      featured: true
    },
    {
      id: 'pollo-puerro',
      name: 'Tarta Individual de Pollo y Puerro',
      description: 'Pollo, puerro, zanahoria rallada, queso philadelphia y cebolla salteada.',
      category: 'tartas',
      prices: {
        '3': 20000,
        '6': 38000,
        '9': 54000,
        '12': 70000
      },
      image: '/images/pollo-puerro.png',
      featured: false
    },
    {
      id: 'atun-vegetales',
      name: 'Tarta Individual de Atún y Vegetales',
      description: 'Lomitos de atún, zanahoria rallada, zucchini rallado, morrón rojo quinoa y cebolla salteada.',
      category: 'tartas',
      prices: {
        '3': 20000,
        '6': 38000,
        '9': 54000,
        '12': 70000
      },
      image: '/images/atun-vegetales.png',
      featured: false
    }
  ]
};

// Función para obtener productos del localStorage o usar los por defecto
const getProducts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('Datos almacenados:', stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('Productos parseados:', parsed);
      return parsed;
    }
    // Si no hay datos guardados, usar los por defecto y guardarlos
    console.log('No hay datos guardados, usando productos por defecto');
    saveProducts(defaultProducts);
    return defaultProducts;
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return defaultProducts;
  }
};

// Función para guardar productos en localStorage
const saveProducts = (products) => {
  try {
    console.log('Guardando productos:', products);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    console.log('Productos guardados exitosamente');
  } catch (error) {
    console.error('Error al guardar productos:', error);
  }
};

// Función para generar ID único
const generateId = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

// Función para limpiar precios (remover valores vacíos)
const cleanPrices = (prices) => {
  const cleaned = {};
  Object.entries(prices).forEach(([key, value]) => {
    if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      cleaned[key] = parseFloat(value);
    }
  });
  return cleaned;
};

// Servicio de productos
export const productService = {
  // Obtener todos los productos
  getAllProducts: () => {
    const products = getProducts();
    return [...products.pollos, ...products.tartas];
  },

  // Obtener productos por categoría
  getProductsByCategory: (category) => {
    const products = getProducts();
    return products[category] || [];
  },

  // Obtener producto por ID
  getProductById: (id) => {
    const allProducts = productService.getAllProducts();
    return allProducts.find(product => product.id === id);
  },

  // Obtener productos destacados
  getFeaturedProducts: () => {
    const allProducts = productService.getAllProducts();
    return allProducts.filter(product => product.featured);
  },

  // Crear nuevo producto
  createProduct: (productData) => {
    console.log('Creando producto con datos:', productData);
    const products = getProducts();
    const newProduct = {
      id: generateId(productData.name),
      name: productData.name,
      description: productData.description,
      category: productData.category,
      featured: productData.featured || false,
      prices: cleanPrices(productData.prices),
      image: productData.image || '/images/placeholder.png'
    };

    console.log('Producto creado:', newProduct);
    console.log('Productos antes de agregar:', products);

    // Agregar a la categoría correspondiente
    products[newProduct.category].push(newProduct);
    
    console.log('Productos después de agregar:', products);
    
    // Guardar en localStorage
    saveProducts(products);
    
    return newProduct;
  },

  // Actualizar producto existente
  updateProduct: (id, productData) => {
    const products = getProducts();
    let productFound = false;

    // Buscar y actualizar en pollos
    const polloIndex = products.pollos.findIndex(p => p.id === id);
    if (polloIndex !== -1) {
      products.pollos[polloIndex] = {
        ...products.pollos[polloIndex],
        name: productData.name,
        description: productData.description,
        category: productData.category,
        featured: productData.featured || false,
        prices: cleanPrices(productData.prices),
        image: productData.image || products.pollos[polloIndex].image
      };
      productFound = true;
    }

    // Buscar y actualizar en tartas
    const tartaIndex = products.tartas.findIndex(p => p.id === id);
    if (tartaIndex !== -1) {
      products.tartas[tartaIndex] = {
        ...products.tartas[tartaIndex],
        name: productData.name,
        description: productData.description,
        category: productData.category,
        featured: productData.featured || false,
        prices: cleanPrices(productData.prices),
        image: productData.image || products.tartas[tartaIndex].image
      };
      productFound = true;
    }

    if (productFound) {
      saveProducts(products);
      return true;
    }
    
    return false;
  },

  // Eliminar producto
  deleteProduct: (id) => {
    const products = getProducts();
    let productFound = false;

    // Buscar y eliminar en pollos
    const polloIndex = products.pollos.findIndex(p => p.id === id);
    if (polloIndex !== -1) {
      products.pollos.splice(polloIndex, 1);
      productFound = true;
    }

    // Buscar y eliminar en tartas
    const tartaIndex = products.tartas.findIndex(p => p.id === id);
    if (tartaIndex !== -1) {
      products.tartas.splice(tartaIndex, 1);
      productFound = true;
    }

    if (productFound) {
      saveProducts(products);
      return true;
    }
    
    return false;
  },

  // Resetear a productos por defecto
  resetToDefault: () => {
    saveProducts(defaultProducts);
    return defaultProducts;
  }
};
