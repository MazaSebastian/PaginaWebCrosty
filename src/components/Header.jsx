import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Settings } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();

  useEffect(() => {
    // Verificar si el usuario está autenticado como admin
    const adminAuth = localStorage.getItem('adminAuth');
    setIsAdmin(Boolean(adminAuth));
  }, [location]);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Pollos', href: '/productos/pollos' },
    { name: 'Tartas', href: '/productos/tartas' },
    { name: 'Contacto', href: '/contacto' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>CROSTY</h1>
            <div className="logo-underline"></div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="nav-desktop">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="header-actions">
            {isAdmin && (
              <Link to="/admin/dashboard" className="btn btn-outline admin-btn">
                <Settings size={18} />
                <span>Admin</span>
              </Link>
            )}
            <Link to="/carrito" className="btn btn-primary cart-btn">
              <ShoppingCart size={18} />
              <span>Carrito</span>
              {getItemCount() > 0 && (
                <span className="cart-badge">{getItemCount()}</span>
              )}
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navegación Móvil */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="nav-mobile-actions">
              {isAdmin && (
                <Link 
                  to="/admin/dashboard" 
                  className="btn btn-outline admin-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={18} />
                  <span>Admin</span>
                </Link>
              )}
              <Link 
                to="/carrito" 
                className="btn btn-primary cart-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={18} />
                <span>Carrito</span>
                {getItemCount() > 0 && (
                  <span className="cart-badge">{getItemCount()}</span>
                )}
              </Link>
            </div>
          </nav>
        )}
      </div>

      <style>{`
        .header {
          background: var(--primary-white);
          box-shadow: var(--shadow-soft);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 3px solid var(--warm-orange);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .logo {
          text-decoration: none;
          color: var(--dark-gray);
          position: relative;
        }

        .logo h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: var(--dark-gray);
          letter-spacing: -0.5px;
        }

        .logo-underline {
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--gradient-warm);
          border-radius: 2px;
        }

        .nav-desktop {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-gray);
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--reddish-brown);
          background: rgba(139, 69, 19, 0.1);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--reddish-brown);
          border-radius: 1px;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .admin-btn {
          background: linear-gradient(135deg, #8b4513, #a0522d);
          color: white;
          border: none;
        }

        .admin-btn:hover {
          background: linear-gradient(135deg, #a0522d, #8b4513);
          transform: translateY(-1px);
        }

        .cart-btn {
          position: relative;
          padding-right: 8px;
          overflow: visible;
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          border: 2px solid white;
          padding: 0 4px;
          box-sizing: border-box;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--dark-gray);
          cursor: pointer;
          padding: 0.5rem;
        }

        .nav-mobile {
          display: none;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-light);
        }

        .nav-mobile-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        @media (max-width: 768px) {
          .nav-desktop,
          .header-actions {
            display: none;
          }

          .menu-toggle {
            display: block;
          }

          .nav-mobile {
            display: flex;
          }

          .logo h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </header>
  );
};
