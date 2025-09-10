import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const AddToCartButton = ({ product }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedPrice) {
      alert('Por favor selecciona una opción de cantidad');
      return;
    }

    addToCart(product, quantity, selectedPrice);
    setShowOptions(false);
    setQuantity(1);
    setSelectedPrice('');
    
    // Mostrar confirmación
    alert(`${product.name} agregado al carrito`);
  };

  const handleQuickAdd = (priceKey) => {
    addToCart(product, 1, priceKey);
    alert(`${product.name} agregado al carrito`);
  };

  const getPriceFields = () => {
    if (product.category === 'pollos') {
      return ['3', '5'];
    } else {
      return ['3', '6', '9', '12'];
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="add-to-cart-container">
      {!showOptions ? (
        <div className="quick-actions">
          <button 
            onClick={() => setShowOptions(true)}
            className="btn btn-primary add-to-cart-btn"
          >
            <ShoppingCart size={18} />
            Agregar al Carrito
          </button>
          
          <div className="quick-options">
            {getPriceFields().map(priceKey => (
              <button
                key={priceKey}
                onClick={() => handleQuickAdd(priceKey)}
                className="quick-add-btn"
                title={`Agregar ${priceKey} unidades`}
              >
                {priceKey} unidades
                <br />
                <span className="price">{formatPrice(product.prices[priceKey])}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="cart-options">
          <div className="price-selection">
            <label>Selecciona la cantidad:</label>
            <div className="price-options">
              {getPriceFields().map(priceKey => (
                <button
                  key={priceKey}
                  onClick={() => setSelectedPrice(priceKey)}
                  className={`price-option ${selectedPrice === priceKey ? 'selected' : ''}`}
                >
                  {priceKey} unidades
                  <span className="price">{formatPrice(product.prices[priceKey])}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selection">
            <label>Cantidad:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                <Minus size={16} />
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="cart-actions">
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary"
              disabled={!selectedPrice}
            >
              <ShoppingCart size={18} />
              Agregar al Carrito
            </button>
            <button 
              onClick={() => setShowOptions(false)}
              className="btn btn-outline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .add-to-cart-container {
          width: 100%;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .add-to-cart-btn {
          width: 100%;
          justify-content: center;
        }

        .quick-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
        }

        .quick-add-btn {
          padding: 0.75rem;
          border: 2px solid var(--border-light);
          border-radius: 8px;
          background: white;
          color: var(--dark-gray);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          text-align: center;
        }

        .quick-add-btn:hover {
          border-color: var(--warm-orange);
          background: rgba(255, 107, 53, 0.05);
        }

        .quick-add-btn .price {
          font-weight: 600;
          color: var(--warm-orange);
        }

        .cart-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem;
          background: var(--light-gray);
          border-radius: 12px;
        }

        .price-selection label,
        .quantity-selection label {
          display: block;
          font-weight: 600;
          color: var(--dark-gray);
          margin-bottom: 0.5rem;
        }

        .price-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
        }

        .price-option {
          padding: 1rem;
          border: 2px solid var(--border-light);
          border-radius: 8px;
          background: white;
          color: var(--dark-gray);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .price-option:hover {
          border-color: var(--warm-orange);
        }

        .price-option.selected {
          border-color: var(--warm-orange);
          background: rgba(255, 107, 53, 0.1);
        }

        .price-option .price {
          display: block;
          font-weight: 600;
          color: var(--warm-orange);
          margin-top: 0.25rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          border: 2px solid var(--border-light);
          border-radius: 8px;
          padding: 0.5rem;
          width: fit-content;
        }

        .quantity-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          background: var(--warm-orange);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .quantity-btn:hover {
          background: #e55a2b;
        }

        .quantity {
          min-width: 40px;
          text-align: center;
          font-weight: 600;
          color: var(--dark-gray);
          font-size: 1.1rem;
        }

        .cart-actions {
          display: flex;
          gap: 1rem;
        }

        .cart-actions .btn {
          flex: 1;
          justify-content: center;
        }

        @media (max-width: 480px) {
          .quick-options,
          .price-options {
            grid-template-columns: 1fr;
          }

          .cart-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
