import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getProductsByCategory, products } from '../data/products';
import { AddToCartButton } from '../components/AddToCartButton';

export const ProductosPage = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  // Actualizar selectedCategory cuando cambie la URL
  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);

  const getProductsToShow = () => {
    if (selectedCategory === 'all') {
      return [...products.pollos, ...products.tartas];
    }
    const categoryProducts = getProductsByCategory(selectedCategory);
    return categoryProducts || [];
  };

  const productsToShow = getProductsToShow();

  return (
    <div className="productos-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Nuestros Productos</h1>
          <p>
            Comida envasada al vacío y congelada, lista para servir. 
            Los sobres vienen fraccionados en porciones de 175g aproximadamente.
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Todos los Productos
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'pollos' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('pollos')}
          >
            Pollos al Vacío
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'tartas' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('tartas')}
          >
            Tartas Individuales
          </button>
        </div>

        {/* Grid de productos */}
        <div className="products-grid">
          {productsToShow.map((product) => (
            <div key={product.id} className="product-card fade-in-up">
              <div className="product-card-image">
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0'
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
                  {product.category === 'pollos' ? 'Pollos' : 'Tartas'}
                </div>
              </div>
              <div className="product-card-content">
                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-description">{product.description}</p>
                

                <div className="product-actions">
                  <Link to={`/producto/${product.id}`} className="btn btn-secondary">
                    Ver Detalles
                    <ArrowRight size={16} />
                  </Link>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="product-info">
          <div className="info-card">
            <h3>Información Importante</h3>
            <ul>
              <li>✅ Productos envasados al vacío para máxima frescura</li>
              <li>✅ Porciones de aproximadamente 175g cada una</li>
              <li>✅ Listos para calentar y servir</li>
              <li>✅ Ingredientes frescos y de calidad</li>
              <li>✅ Perfectos para el freezer</li>
            </ul>
          </div>
          
          <div className="info-card">
            <h3>¿Cómo Pedir?</h3>
            <p>
              Simplemente llámanos al <strong>+54 11 3028-8564</strong> y te ayudaremos 
              a elegir los productos perfectos para ti. También puedes contactarnos 
              para consultas sobre ingredientes o preparación.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .productos-page {
          padding: 2rem 0 4rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          color: var(--reddish-brown);
          margin-bottom: 1rem;
        }

        .page-header p {
          font-size: 1.1rem;
          color: var(--text-gray);
          max-width: 600px;
          margin: 0 auto;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 24px;
          border: 2px solid var(--reddish-brown);
          background: transparent;
          color: var(--reddish-brown);
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--reddish-brown);
          color: var(--primary-white);
        }

        .product-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--gradient-warm);
          color: var(--primary-white);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .product-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .product-actions .btn {
          width: 100%;
          font-size: 0.9rem;
          padding: 12px 16px;
          justify-content: center;
        }

        .product-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .info-card {
          background: var(--light-gray);
          padding: 2rem;
          border-radius: 16px;
          border-left: 4px solid var(--warm-orange);
        }

        .info-card h3 {
          color: var(--reddish-brown);
          margin-bottom: 1rem;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
        }

        .info-card ul li {
          padding: 0.5rem 0;
          color: var(--text-gray);
        }

        @media (max-width: 768px) {
          .category-filters {
            flex-direction: column;
            align-items: center;
          }

          .filter-btn {
            width: 100%;
            max-width: 300px;
          }

          .product-actions {
            flex-direction: column;
          }

        .product-info {
          grid-template-columns: 1fr;
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
