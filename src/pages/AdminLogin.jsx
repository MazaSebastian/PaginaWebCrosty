import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Credenciales simples (en producción usar autenticación real)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'crosty2024'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.username === ADMIN_CREDENTIALS.username && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      // Guardar sesión en localStorage
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUser', credentials.username);
      navigate('/admin/dashboard');
    } else {
      setError('Credenciales incorrectas');
    }
    
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>🍽️ CROSTY Admin</h1>
            <p>Panel de Administración</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <div className="input-group">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-group">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary login-btn"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-footer">
            <p>Credenciales de prueba:</p>
            <p><strong>Usuario:</strong> admin</p>
            <p><strong>Contraseña:</strong> crosty2024</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 30%, #ffd700 70%, #ff8c00 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-container {
          width: 100%;
          max-width: 400px;
        }

        .login-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-header h1 {
          font-size: 2rem;
          color: var(--dark-gray);
          margin-bottom: 0.5rem;
        }

        .login-header p {
          color: var(--text-gray);
          font-size: 1rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: var(--dark-gray);
          font-size: 0.9rem;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-group input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 2px solid var(--border-light);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--warm-orange);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--text-gray);
          z-index: 1;
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-gray);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: var(--warm-orange);
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid #fcc;
          font-size: 0.9rem;
          text-align: center;
        }

        .login-btn {
          width: 100%;
          padding: 0.875rem;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-gray);
        }

        .login-footer p {
          margin: 0.25rem 0;
        }

        .login-footer strong {
          color: var(--dark-gray);
        }

        @media (max-width: 480px) {
          .admin-login-page {
            padding: 1rem;
          }
          
          .login-card {
            padding: 1.5rem;
          }
          
          .login-header h1 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};
