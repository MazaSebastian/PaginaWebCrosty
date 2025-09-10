import { createContext, useContext, useReducer, useEffect } from 'react';

// Contexto del carrito
const CartContext = createContext();

// Tipos de acciones del carrito
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Estado inicial del carrito
const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Reducer del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity, selectedPrice } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.selectedPrice === selectedPrice
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Si el producto ya existe, actualizar cantidad
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo
        newItems = [...state.items, { product, quantity, selectedPrice }];
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter((_, index) => index !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { index, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: index });
      }

      const newItems = state.items.map((item, i) =>
        i === index ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return initialState;

    case CART_ACTIONS.LOAD_CART:
      return {
        ...action.payload,
        total: calculateTotal(action.payload.items),
        itemCount: calculateItemCount(action.payload.items)
      };

    default:
      return state;
  }
};

// Funciones auxiliares
const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    const price = item.product.prices[item.selectedPrice] || 0;
    return total + (price * item.quantity);
  }, 0);
};

const calculateItemCount = (items) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

// Provider del carrito
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito del localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('crosty_cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('crosty_cart', JSON.stringify(state));
  }, [state]);

  // Funciones del carrito
  const addToCart = (product, quantity = 1, selectedPrice) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, selectedPrice }
    });
  };

  const removeFromCart = (index) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: index });
  };

  const updateQuantity = (index, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { index, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getItemCount = () => state.itemCount;
  const getTotal = () => state.total;
  const getItems = () => state.items;
  const isEmpty = () => state.items.length === 0;

  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotal,
    getItems,
    isEmpty
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};
