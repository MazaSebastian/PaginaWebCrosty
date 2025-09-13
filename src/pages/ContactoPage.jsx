import { Phone, MapPin, Clock, Mail, MessageCircle } from 'lucide-react';

export const ContactoPage = () => {
  return (
    <div className="contacto-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Contactanos</h1>
          <p>
            ¿Tienes preguntas sobre nuestros productos? ¿Quieres hacer un pedido? 
            Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="contact-content">
          {/* Información de contacto */}
          <div className="contact-info">
            <h2>Información de Contacto</h2>
            
            <div className="contact-cards">
              <div className="contact-card">
                <Phone className="contact-icon" />
                <div className="contact-details">
                  <h3>Teléfono</h3>
                  <a href="tel:+541130288564">+54 11 3028-8564</a>
                  <p>Llamanos para hacer tu pedido</p>
                </div>
              </div>

              <div className="contact-card">
                <MapPin className="contact-icon" />
                <div className="contact-details">
                  <h3>Ubicación</h3>
                  <p>Buenos Aires, Argentina</p>
                  <p>Entregas en zona metropolitana</p>
                </div>
              </div>

              <div className="contact-card">
                <Clock className="contact-icon" />
                <div className="contact-details">
                  <h3>Horarios</h3>
                  <p>Lunes a Viernes</p>
                  <p>9:00 - 18:00 hs</p>
                </div>
              </div>

              <div className="contact-card">
                <MessageCircle className="contact-icon" />
                <div className="contact-details">
                  <h3>WhatsApp</h3>
                  <a href="https://wa.me/541130288564">+54 11 3028-8564</a>
                  <p>Escríbenos por WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cómo pedir */}
          <div className="how-to-order">
            <h2>¿Cómo Hacer tu Pedido?</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Llamanos</h3>
                  <p>Contactanos al +54 11 3028-8564 para consultar disponibilidad y hacer tu pedido.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Elige tus Productos</h3>
                  <p>Selecciona entre nuestras tartas individuales y pollos al vacío. Te ayudamos a elegir las cantidades perfectas.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Coordina la Entrega</h3>
                  <p>Acordamos día, hora y lugar de entrega. Entregamos en zona metropolitana.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Disfruta</h3>
                  <p>Recibe tus productos frescos y listos para calentar. ¡Buen provecho!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="additional-info">
          <div className="info-grid">
            <div className="info-card">
              <h3>Nuestros Productos</h3>
              <ul>
                <li><strong>Tartas Individuales:</strong> Jamón y Queso, Espinaca y Hongos, Pollo y Puerro, Atún y Vegetales</li>
                <li><strong>Pollos al Vacío:</strong> Limón, Honey, Teriyaki, Spicy</li>
                <li>Todos envasados al vacío en porciones de ~175g</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Información Importante</h3>
              <ul>
                <li>✅ Productos frescos y de calidad</li>
                <li>✅ Envasado al vacío para máxima duración</li>
                <li>✅ Perfectos para el freezer</li>
                <li>✅ Listos para calentar y servir</li>
                <li>✅ Ingredientes naturales</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="contact-cta">
          <h2>¿Listo para Hacer tu Pedido?</h2>
          <p>No esperes más, contactanos ahora y disfruta de comida deliciosa sin complicaciones.</p>
          <div className="cta-actions">
            <a href="tel:+541130288564" className="btn btn-primary">
              <Phone size={18} />
              Llamar Ahora
            </a>
            <a href="https://wa.me/541130288564" className="btn btn-secondary">
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .contacto-page {
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

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .contact-info h2,
        .how-to-order h2 {
          color: var(--reddish-brown);
          margin-bottom: 2rem;
        }

        .contact-cards {
          display: grid;
          gap: 1.5rem;
        }

        .contact-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--light-gray);
          border-radius: 12px;
          border-left: 4px solid var(--warm-orange);
        }

        .contact-icon {
          color: var(--warm-orange);
          width: 24px;
          height: 24px;
          margin-top: 0.25rem;
        }

        .contact-details h3 {
          color: var(--reddish-brown);
          margin-bottom: 0.5rem;
        }

        .contact-details a {
          color: var(--warm-orange);
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .contact-details a:hover {
          text-decoration: underline;
        }

        .contact-details p {
          color: var(--text-gray);
          margin: 0.25rem 0;
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .step-number {
          background: var(--gradient-warm);
          color: var(--primary-white);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .step-content h3 {
          color: var(--reddish-brown);
          margin-bottom: 0.5rem;
        }

        .step-content p {
          color: var(--text-gray);
          margin: 0;
        }

        .additional-info {
          margin-bottom: 3rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .info-card {
          background: var(--light-gray);
          padding: 2rem;
          border-radius: 12px;
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
          position: relative;
          padding-left: 1.5rem;
        }

        .info-card ul li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--warm-orange);
          font-weight: bold;
        }

        .contact-cta {
          background: var(--gradient-brown);
          color: var(--primary-white);
          padding: 3rem 2rem;
          border-radius: 16px;
          text-align: center;
        }

        .contact-cta h2 {
          color: var(--primary-white);
          margin-bottom: 1rem;
        }

        .contact-cta p {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-actions .btn {
            width: 100%;
            max-width: 300px;
          }

          .contact-card {
            flex-direction: column;
            text-align: center;
          }

          .step {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
