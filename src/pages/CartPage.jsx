import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

export const CartPage = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart, isEmpty } = useCart();
  const { showConfirm } = useToast();

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(index);
    } else {
      updateQuantity(index, newQuantity);
    }
  };

  const handleRemoveItem = async (index) => {
    const confirmed = await showConfirm({
      title: 'Eliminar producto',
      message: '¿Estás seguro de que quieres eliminar este producto del carrito?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'danger'
    });
    
    if (confirmed) {
      removeFromCart(index);
    }
  };

  const handleClearCart = async () => {
    const confirmed = await showConfirm({
      title: 'Vaciar carrito',
      message: '¿Estás seguro de que quieres vaciar todo el carrito?',
      confirmText: 'Vaciar',
      cancelText: 'Cancelar',
      type: 'danger'
    });
    
    if (confirmed) {
      clearCart();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const generateWhatsAppMessage = () => {
    const baseMessage = "Hola! Quiero realizar un pedido en Crosty! Me gustaria confirmar mi seleccion!";
    
    const itemsList = items.map(item => {
      const price = item.product.prices[item.selectedPrice] || 0;
      const subtotal = price * item.quantity;
      return `• ${item.quantity}x ${item.product.name} (${item.selectedPrice} unidades) - ${formatPrice(subtotal)}`;
    }).join('\n');
    
    const totalMessage = `\n\nTotal: ${formatPrice(total)}`;
    
    return `${baseMessage}\n\nMi pedido:\n${itemsList}${totalMessage}`;
  };

  const handleSendOrder = () => {
    const message = generateWhatsAppMessage();
    const whatsappNumber = '1130288564';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (isEmpty()) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <Link to="/productos" className="btn btn-outline">
              <ArrowLeft size={18} />
              Seguir Comprando
            </Link>
            <h1>Mi Carrito</h1>
          </div>

          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={64} />
            </div>
            <h2>Tu carrito está vacío</h2>
            <p>Agrega algunos productos deliciosos de CROSTY</p>
            <Link to="/productos" className="btn btn-primary">
              Ver Productos
            </Link>
          </div>
        </div>

        <style jsx>{`
          .cart-page {
            min-height: 100vh;
            background: var(--light-gray);
            padding: 2rem 0;
          }

          .cart-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .cart-header h1 {
            color: var(--dark-gray);
            margin: 0;
          }

          .empty-cart {
            background: white;
            border-radius: 12px;
            box-shadow: var(--shadow-soft);
            padding: 4rem 2rem;
            text-align: center;
          }

          .empty-cart-icon {
            color: var(--text-gray);
            margin-bottom: 1.5rem;
          }

          .empty-cart h2 {
            color: var(--dark-gray);
            margin-bottom: 1rem;
          }

          .empty-cart p {
            color: var(--text-gray);
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <Link to="/productos" className="btn btn-outline">
            <ArrowLeft size={18} />
            Seguir Comprando
          </Link>
          <h1>Mi Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})</h1>
          {!isEmpty() && (
            <button onClick={handleClearCart} className="btn btn-outline clear-cart-btn">
              <Trash2 size={18} />
              Vaciar Carrito
            </button>
          )}
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item, index) => {
              const price = item.product.prices[item.selectedPrice] || 0;
              const subtotal = price * item.quantity;

              return (
                <div key={`${item.product.id}-${item.selectedPrice}`} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-placeholder" style={{ display: 'none' }}>
                      <ShoppingBag size={24} />
                    </div>
                  </div>

                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p className="item-description">{item.product.description}</p>
                    <div className="item-price-info">
                      <span className="price-option">{item.selectedPrice} unidades</span>
                      <span className="unit-price">{formatPrice(price)} c/u</span>
                    </div>
                  </div>

                  <div className="item-quantity">
                    <button 
                      onClick={() => handleQuantityChange(index, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(index, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="item-subtotal">
                    <span className="subtotal">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="item-actions">
                    <button 
                      onClick={() => handleRemoveItem(index)}
                      className="remove-btn"
                      title="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Resumen del Pedido</h3>
              
              <div className="summary-row">
                <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} productos)</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="checkout-actions">
                <button 
                  onClick={handleSendOrder}
                  className="btn btn-primary checkout-btn"
                >
                  <MessageCircle size={18} />
                  Enviar Pedido
                </button>
                <p className="checkout-note">
                  Se abrirá WhatsApp para confirmar tu pedido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
          background: var(--light-gray);
          padding: 2rem 0;
        }

        .cart-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .cart-header h1 {
          color: var(--dark-gray);
          margin: 0;
          flex: 1;
        }

        .clear-cart-btn {
          color: #ef4444;
          border-color: #ef4444;
        }

        .clear-cart-btn:hover {
          background: #ef4444;
          color: white;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-soft);
          padding: 1.5rem;
          display: grid;
          grid-template-columns: 80px 1fr auto auto auto;
          gap: 1rem;
          align-items: center;
        }

        .item-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: var(--light-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-gray);
        }

        .item-details h3 {
          margin: 0 0 0.5rem 0;
          color: var(--dark-gray);
          font-size: 1.1rem;
        }

        .item-description {
          margin: 0 0 0.5rem 0;
          color: var(--text-gray);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .item-price-info {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
        }

        .price-option {
          color: var(--warm-orange);
          font-weight: 600;
        }

        .unit-price {
          color: var(--text-gray);
        }

        .item-quantity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-gray);
          border-radius: 8px;
          padding: 0.5rem;
        }

        .quantity-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          background: white;
          color: var(--dark-gray);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .quantity-btn:hover {
          background: var(--warm-orange);
          color: white;
        }

        .quantity {
          min-width: 30px;
          text-align: center;
          font-weight: 600;
          color: var(--dark-gray);
        }

        .item-subtotal {
          text-align: right;
        }

        .subtotal {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--dark-gray);
        }

        .item-actions {
          display: flex;
          justify-content: center;
        }

        .remove-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: #ef4444;
          color: white;
        }

        .cart-summary {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .summary-card {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-soft);
          padding: 2rem;
        }

        .summary-card h3 {
          margin: 0 0 1.5rem 0;
          color: var(--dark-gray);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: var(--text-gray);
        }

        .summary-row.total {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--dark-gray);
        }

        .summary-divider {
          height: 1px;
          background: var(--border-light);
          margin: 1rem 0;
        }

        .checkout-actions {
          margin-top: 2rem;
        }

        .checkout-btn {
          width: 100%;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .checkout-note {
          text-align: center;
          color: var(--text-gray);
          font-size: 0.9rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .cart-content {
            grid-template-columns: 1fr;
          }

          .cart-item {
            grid-template-columns: 60px 1fr;
            grid-template-rows: auto auto auto;
            gap: 1rem;
          }

          .item-image {
            width: 60px;
            height: 60px;
          }

          .item-quantity,
          .item-subtotal,
          .item-actions {
            grid-column: 1 / -1;
            justify-self: start;
          }

          .item-quantity {
            justify-self: center;
          }

          .item-subtotal {
            justify-self: end;
          }

          .cart-header {
            flex-direction: column;
            align-items: stretch;
          }

          .cart-header h1 {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
