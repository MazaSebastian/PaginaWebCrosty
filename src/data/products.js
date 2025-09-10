export const products = {
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

export const getFeaturedProducts = () => {
  return [...products.pollos, ...products.tartas].filter(product => product.featured);
};

export const getProductsByCategory = (category) => {
  return products[category] || [];
};

export const getProductById = (id) => {
  const allProducts = [...products.pollos, ...products.tartas];
  return allProducts.find(product => product.id === id);
};
