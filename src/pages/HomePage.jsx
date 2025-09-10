import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Package, Heart } from 'lucide-react';
import { getFeaturedProducts } from '../data/products';
import { AddToCartButton } from '../components/AddToCartButton';

export const HomePage = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-video">
          {/* Video de fondo */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -3
            }}
            onError={(e) => console.log('Error con video:', e.target.error)}
            onCanPlay={() => console.log('Video listo para reproducir')}
            onLoadedData={() => console.log('Video cargado completamente')}
          >
            <source src="/video-landing.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          
          {/* Overlay de gradiente sobre el video */}
          <div 
            className="hero-background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.6) 0%, rgba(247, 147, 30, 0.5) 30%, rgba(255, 215, 0, 0.4) 70%, rgba(255, 140, 0, 0.6) 100%)',
              zIndex: -2
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }}
            ></div>
            <div 
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '10%',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                filter: 'blur(30px)'
              }}
            ></div>
            <div 
              style={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '50%',
                filter: 'blur(20px)'
              }}
            ></div>
          </div>
        </div>
        <div className="hero-content" style={{ position: 'relative', zIndex: 10 }}>
          <h1>🍽️ Comida Lista para Servir 🍽️</h1>
          <p>
            Platos envasados al vacío y congelados, perfectos para tu estilo de vida ocupado. 
            Deliciosos, nutritivos y listos en minutos.
          </p>
          <div className="hero-actions">
            <Link to="/productos" className="btn btn-primary">
              Ver Productos
              <ArrowRight size={18} />
            </Link>
            <a href="tel:1161518778" className="btn btn-outline">
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3>Listo en Minutos</h3>
              <p>Calienta y sirve. Perfecto para cuando no tienes tiempo de cocinar.</p>
            </div>
            <div className="feature-card">
              <Package className="feature-icon" />
              <h3>Envasado al Vacío</h3>
              <p>Máxima frescura y duración. Conserva todo el sabor y nutrientes.</p>
            </div>
            <div className="feature-card">
              <Heart className="feature-icon" />
              <h3>Hecho con Amor</h3>
              <p>Recetas caseras preparadas con ingredientes frescos y de calidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Nuestros Productos Destacados</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
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
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">{product.name}</h3>
                  <p className="product-card-description">{product.description}</p>
                  <div className="product-card-prices">
                    {Object.entries(product.prices).map(([quantity, price]) => (
                      <span key={quantity} className="price-tag">
                        {quantity} unidades: ${price.toLocaleString()}
                      </span>
                    ))}
                  </div>
                  <div className="product-actions">
                    <Link to={`/producto/${product.id}`} className="btn btn-secondary">
                      Ver Detalles
                    </Link>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-primary">
              Ver Todos los Productos
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para Simplificar tu Cocina?</h2>
            <p>
              Únete a cientos de personas que ya disfrutan de comidas deliciosas 
              sin la complicación de cocinar.
            </p>
            <div className="cta-actions">
              <a href="tel:1161518778" className="btn btn-primary">
                Llamar: 11-6151-8778
              </a>
              <Link to="/contacto" className="btn btn-outline">
                Más Información
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .features {
          padding: 4rem 0;
          background: var(--light-gray);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
          background: var(--primary-white);
          border-radius: 16px;
          box-shadow: var(--shadow-soft);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          color: var(--warm-orange);
          margin: 0 auto 1rem;
        }

        .feature-card h3 {
          color: var(--reddish-brown);
          margin-bottom: 1rem;
        }

        .featured-products {
          padding: 4rem 0;
        }

        .cta-section {
          background: var(--gradient-brown);
          color: var(--primary-white);
          padding: 4rem 0;
          text-align: center;
        }

        .cta-content h2 {
          color: var(--primary-white);
          margin-bottom: 1rem;
        }

        .cta-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          overflow: hidden;
        }

        .hero-video video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: -2;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg, 
            rgba(255, 140, 66, 0.8) 0%, 
            rgba(255, 210, 63, 0.7) 50%,
            rgba(139, 69, 19, 0.6) 100%
          );
          z-index: -1;
        }

        /* Imagen de fondo del hero */
        .hero-background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(
              135deg, 
              rgba(255, 140, 66, 0.8) 0%, 
              rgba(255, 210, 63, 0.7) 50%,
              rgba(139, 69, 19, 0.6) 100%
            ),
            url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -2;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-actions,
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-actions .btn,
          .hero-actions .btn {
            width: 100%;
            max-width: 300px;
          }

          .hero {
            min-height: 70vh;
            padding: 4rem 0;
          }

          .hero-video video {
            object-position: center center;
          }
        }

        @media (max-width: 480px) {
          .hero {
            min-height: 60vh;
            padding: 3rem 0;
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

        /* Estilos para tarjetas de productos */
        .product-card {
          background: white;
          border-radius: 16px;
          box-shadow: var(--shadow-soft);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium);
        }

        .product-card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .product-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-card-content {
          padding: 1.5rem;
        }

        .product-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--dark-gray);
          margin-bottom: 0.5rem;
        }

        .product-card-description {
          color: var(--text-gray);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .product-card-prices {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .price-tag {
          background: var(--light-gray);
          padding: 0.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--dark-gray);
          text-align: center;
        }

        .product-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .product-actions .btn {
          width: 100%;
          justify-content: center;
          padding: 12px 16px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};
