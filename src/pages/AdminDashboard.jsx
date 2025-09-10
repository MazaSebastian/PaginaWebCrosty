import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  LogOut, 
  Package, 
  Users, 
  TrendingUp,
  Image as ImageIcon,
  DollarSign
} from 'lucide-react';
import { productService } from '../services/productService';
import { useToast } from '../contexts/ToastContext';

export const AdminDashboard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { showConfirm, showSuccess, showError } = useToast();

  useEffect(() => {
    // Scroll al inicio cuando se carga la página
    window.scrollTo(0, 0);
    
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Cargar todos los productos
    loadProducts();
  }, [navigate]);

  const loadProducts = () => {
    const allProductsList = productService.getAllProducts();
    setAllProducts(allProductsList);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    const confirmed = await showConfirm({
      title: 'Eliminar producto',
      message: '¿Estás seguro de que quieres eliminar este producto?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'danger'
    });
    
    if (confirmed) {
      const success = productService.deleteProduct(productId);
      if (success) {
        loadProducts(); // Recargar la lista
        showSuccess('Producto eliminado exitosamente');
      } else {
        showError('Error al eliminar el producto');
      }
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = {
    totalProducts: allProducts.length,
    pollos: allProducts.filter(p => p.category === 'pollos').length,
    tartas: allProducts.filter(p => p.category === 'tartas').length,
    featured: allProducts.filter(p => p.featured).length
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1>🍽️ CROSTY Admin</h1>
              <span className="admin-badge">Panel de Administración</span>
            </div>
            <div className="header-actions">
              <button 
                onClick={() => navigate('/admin/products/new')}
                className="btn btn-primary"
              >
                <Plus size={18} />
                Nuevo Producto
              </button>
              <button 
                onClick={handleLogout}
                className="btn btn-outline"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Package size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalProducts}</h3>
              <p>Total Productos</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pollos">
              <Package size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.pollos}</h3>
              <p>Pollos</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon tartas">
              <Package size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.tartas}</h3>
              <p>Tartas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon featured">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.featured}</h3>
              <p>Destacados</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-left">
            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="category-filter">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Todas las categorías</option>
                <option value="pollos">Pollos</option>
                <option value="tartas">Tartas</option>
              </select>
            </div>
          </div>
          <div className="filters-right">
            <span className="results-count">
              {filteredProducts.length} productos encontrados
            </span>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precios</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-image-cell">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="image-placeholder" style={{ display: 'none' }}>
                        <ImageIcon size={20} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                    </div>
                  </td>
                  <td>
                    <span className={`category-badge ${product.category}`}>
                      {product.category === 'pollos' ? 'Pollos' : 'Tartas'}
                    </span>
                  </td>
                  <td>
                    <div className="prices-cell">
                      {Object.entries(product.prices).map(([qty, price]) => (
                        <span key={qty} className="price-item">
                          {qty}: ${price.toLocaleString()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${product.featured ? 'featured' : 'normal'}`}>
                      {product.featured ? 'Destacado' : 'Normal'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleViewProduct(product.id)}
                        className="btn-icon view"
                        title="Ver producto"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditProduct(product.id)}
                        className="btn-icon edit"
                        title="Editar producto"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="btn-icon delete"
                        title="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: var(--light-gray);
        }

        .admin-header {
          background: white;
          border-bottom: 3px solid var(--warm-orange);
          box-shadow: var(--shadow-soft);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .header-left h1 {
          font-size: 1.75rem;
          color: var(--dark-gray);
          margin: 0;
        }

        .admin-badge {
          background: var(--gradient-warm);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: 1rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: var(--shadow-soft);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: var(--gradient-warm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon.pollos {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
        }

        .stat-icon.tartas {
          background: linear-gradient(135deg, #8b4513, #a0522d);
        }

        .stat-icon.featured {
          background: linear-gradient(135deg, #ffd700, #ff8c00);
        }

        .stat-content h3 {
          font-size: 2rem;
          color: var(--dark-gray);
          margin: 0;
        }

        .stat-content p {
          color: var(--text-gray);
          margin: 0;
          font-size: 0.9rem;
        }

        .filters-section {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: var(--shadow-soft);
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .filters-left {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-box input {
          padding: 0.75rem 1rem;
          border: 2px solid var(--border-light);
          border-radius: 8px;
          font-size: 1rem;
          min-width: 250px;
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--warm-orange);
        }

        .category-filter select {
          padding: 0.75rem 1rem;
          border: 2px solid var(--border-light);
          border-radius: 8px;
          font-size: 1rem;
          background: white;
        }

        .results-count {
          color: var(--text-gray);
          font-size: 0.9rem;
        }

        .products-table-container {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-soft);
          overflow: hidden;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
        }

        .products-table th {
          background: var(--light-gray);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--dark-gray);
          border-bottom: 2px solid var(--border-light);
        }

        .products-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-light);
          vertical-align: top;
        }

        .product-image-cell {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .product-image-cell img {
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

        .product-info h4 {
          margin: 0 0 0.5rem 0;
          color: var(--dark-gray);
          font-size: 1rem;
        }

        .product-info p {
          margin: 0;
          color: var(--text-gray);
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .category-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .category-badge.pollos {
          background: rgba(255, 107, 53, 0.1);
          color: #ff6b35;
        }

        .category-badge.tartas {
          background: rgba(139, 69, 19, 0.1);
          color: #8b4513;
        }

        .prices-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .price-item {
          font-size: 0.85rem;
          color: var(--text-gray);
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-badge.featured {
          background: rgba(255, 215, 0, 0.1);
          color: #b8860b;
        }

        .status-badge.normal {
          background: rgba(102, 102, 102, 0.1);
          color: #666;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-icon {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-icon.view {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .btn-icon.edit {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .btn-icon.delete {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .btn-icon:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .header-actions {
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .filters-left {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box input {
            min-width: auto;
          }

          .products-table-container {
            overflow-x: auto;
          }

          .products-table {
            min-width: 600px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .admin-badge {
            margin-left: 0;
            margin-top: 0.5rem;
            display: inline-block;
          }
        }
      `}</style>
    </div>
  );
};
