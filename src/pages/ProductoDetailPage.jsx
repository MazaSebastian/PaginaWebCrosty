import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, MessageCircle, Clock, Package, Heart } from 'lucide-react';
import { getProductById } from '../data/products';
import { AddToCartButton } from '../components/AddToCartButton';

export const ProductoDetailPage = () => {
  const { id } = useParams();
  const product = getProductById(id);

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <Navigate to="/productos" replace />;
  }

  const isPollos = product.category === 'pollos';

  return (
    <div className="producto-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to="/productos">Productos</Link>
          <span>/</span>
          <Link to={`/productos/${product.category}`}>
            {isPollos ? 'Pollos' : 'Tartas'}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Imagen del producto */}
          <div className="product-image">
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
              onError={(e) => {
                // Fallback a placeholder si la imagen no carga
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="product-placeholder"
              style={{ display: 'none' }}
            >
              <span className="product-placeholder-text">{product.name}</span>
            </div>
            <div className="product-badge">
              {isPollos ? 'Pollos al Vacío' : 'Tartas Individuales'}
            </div>
          </div>

          {/* Información del producto */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>

            {/* Precios */}
            <div className="pricing-section">
              <h3>Precios</h3>
              <div className="prices-grid">
                {Object.entries(product.prices).map(([quantity, price]) => (
                  <div key={quantity} className="price-option">
                    <div className="quantity">{quantity} unidades</div>
                    <div className="price">${price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Características */}
            <div className="features-section">
              <h3>Características</h3>
              <div className="features-list">
                <div className="feature-item">
                  <Package className="feature-icon" />
                  <span>Envasado al vacío</span>
                </div>
                <div className="feature-item">
                  <Clock className="feature-icon" />
                  <span>Listo en minutos</span>
                </div>
                <div className="feature-item">
                  <Heart className="feature-icon" />
                  <span>Ingredientes frescos</span>
                </div>
                <div className="feature-item">
                  <Package className="feature-icon" />
                  <span>Porciones de ~175g</span>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="product-actions">
              <AddToCartButton product={product} />
              <a href="https://wa.me/1161518778?text=Hola! Quiero realizar un pedido en Crosty! Me gustaria confirmar mi seleccion!" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="btn btn-outline">
                <MessageCircle size={18} />
                Enviar Pedido
              </a>
              <Link to="/productos" className="btn btn-outline">
                <ArrowLeft size={18} />
                Ver Otros Productos
              </Link>
            </div>

            {/* Información adicional */}
            <div className="additional-info">
              <h4>Información Importante</h4>
              <ul>
                <li>Los productos vienen fraccionados y envasados al vacío en porciones de 175g aproximadamente</li>
                <li>Perfectos para conservar en el freezer</li>
                <li>Simplemente calienta y sirve</li>
                <li>Ingredientes frescos y de calidad</li>
                {isPollos && <li>Marinados con especias naturales</li>}
                {!isPollos && <li>Masa casera y rellenos artesanales</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="related-products">
          <h2>Otros Productos que te pueden Interesar</h2>
          <div className="related-grid">
            {/* Aquí podrías agregar productos relacionados */}
            <Link to="/productos" className="btn btn-secondary">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .producto-detail-page {
          padding: 2rem 0 4rem;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }

        .breadcrumb a {
          color: var(--warm-orange);
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .breadcrumb span {
          color: var(--text-gray);
        }

        .product-detail-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .product-image {
          position: relative;
        }

        .product-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: var(--shadow-medium);
        }

        .product-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--gradient-warm);
          color: var(--primary-white);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
        }

        .product-title {
          color: var(--reddish-brown);
          margin-bottom: 1rem;
          font-family: 'Dancing Script', cursive;
          font-size: 2.5rem;
        }

        .product-description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: var(--text-gray);
        }

        .pricing-section {
          margin-bottom: 2rem;
        }

        .pricing-section h3 {
          color: var(--reddish-brown);
          margin-bottom: 1rem;
        }

        .prices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .price-option {
          background: var(--light-gray);
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .price-option:hover {
          border-color: var(--warm-orange);
          transform: translateY(-2px);
        }

        .quantity {
          font-weight: 600;
          color: var(--text-gray);
          margin-bottom: 0.5rem;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--reddish-brown);
        }

        .features-section {
          margin-bottom: 2rem;
        }

        .features-section h3 {
          color: var(--reddish-brown);
          margin-bottom: 1rem;
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: var(--light-gray);
          border-radius: 8px;
        }

        .feature-icon {
          color: var(--warm-orange);
          width: 20px;
          height: 20px;
        }

        .product-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .product-actions .btn {
          width: 100%;
          justify-content: center;
          padding: 12px 16px;
          font-size: 0.9rem;
        }

        .additional-info {
          background: var(--light-gray);
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 4px solid var(--warm-orange);
        }

        .additional-info h4 {
          color: var(--reddish-brown);
          margin-bottom: 1rem;
        }

        .additional-info ul {
          list-style: none;
          padding: 0;
        }

        .additional-info ul li {
          padding: 0.5rem 0;
          color: var(--text-gray);
          position: relative;
          padding-left: 1.5rem;
        }

        .additional-info ul li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--warm-orange);
          font-weight: bold;
        }

        .related-products {
          text-align: center;
          padding: 2rem 0;
          border-top: 1px solid var(--border-light);
        }

        .related-products h2 {
          color: var(--reddish-brown);
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .product-detail-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .product-image img {
            height: 300px;
          }

          .product-title {
            font-size: 2rem;
          }

          .prices-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-list {
            grid-template-columns: 1fr;
          }

        .product-actions {
          flex-direction: column;
        }
      }

      .product-placeholder {
        width: 100%;
        height: 100%;
        background: var(--gradient-warm);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .product-placeholder-text {
        color: var(--primary-white);
        font-weight: 600;
        font-size: 1.1rem;
        padding: 1rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      }
    `}</style>
    </div>
  );
};
