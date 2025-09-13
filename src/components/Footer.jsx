import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Información de la empresa */}
          <div className="footer-section">
            <h3>CROSTY</h3>
            <p>Comida envasada al vacío y congelada, lista para servir. Perfecta para tu estilo de vida ocupado.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Productos */}
          <div className="footer-section">
            <h4>Nuestros Productos</h4>
            <ul>
              <li><a href="/productos/pollos">Pollos al Vacío</a></li>
              <li><a href="/productos/tartas">Tartas Individuales</a></li>
              <li><a href="/productos">Ver Todo</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h4>Contacto</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <a href="tel:1130288564">11-3028-8564</a>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Buenos Aires, Argentina</span>
              </div>
              <div className="contact-item">
                <Clock size={16} />
                <span>Lunes a Viernes: 9:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="footer-section">
            <h4>Información</h4>
            <ul>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 CROSTY. Todos los derechos reservados.</p>
          <p className="footer-note">
            Los sobres vienen fraccionados y envasados al vacío en porciones de 175g aproximadamente.
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--dark-gray);
          color: var(--primary-white);
          padding: 3rem 0 1rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          color: var(--warm-orange);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .footer-section h4 {
          color: var(--primary-white);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .footer-section p {
          color: #cccccc;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
          color: #cccccc;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section ul li a:hover {
          color: var(--warm-orange);
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--gradient-warm);
          border-radius: 50%;
          color: var(--primary-white);
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .social-links a:hover {
          transform: translateY(-2px);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #cccccc;
        }

        .contact-item a {
          color: #cccccc;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-item a:hover {
          color: var(--warm-orange);
        }

        .footer-bottom {
          border-top: 1px solid #444;
          padding-top: 1rem;
          text-align: center;
          color: #999;
        }

        .footer-note {
          font-size: 0.9rem;
          margin-top: 0.5rem;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 2rem 0 1rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .social-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};
