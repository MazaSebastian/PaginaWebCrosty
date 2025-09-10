import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X, 
  Plus, 
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { productService } from '../services/productService';
import { useToast } from '../contexts/ToastContext';

export const AdminProductForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'pollos',
    featured: false,
    prices: {
      '3': '',
      '5': '',
      '6': '',
      '9': '',
      '12': ''
    },
    image: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Scroll al inicio cuando se carga la página
    window.scrollTo(0, 0);
    
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Si estamos editando, cargar los datos del producto
    if (isEditing) {
      const product = productService.getProductById(id);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          category: product.category,
          featured: product.featured,
          prices: product.prices,
          image: product.image
        });
        setImagePreview(product.image);
      }
    }
  }, [id, isEditing, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('price_')) {
      const priceKey = name.replace('price_', '');
      setFormData(prev => ({
        ...prev,
        prices: {
          ...prev.prices,
          [priceKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }

    // Validar que al menos un precio esté definido
    const hasValidPrice = Object.values(formData.prices).some(price => 
      price && !isNaN(parseFloat(price)) && parseFloat(price) > 0
    );

    if (!hasValidPrice) {
      newErrors.prices = 'Al menos un precio debe ser definido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular delay para UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      let success = false;
      
      if (isEditing) {
        // Actualizar producto existente
        success = productService.updateProduct(id, formData);
      } else {
        // Crear nuevo producto
        const newProduct = productService.createProduct(formData);
        success = Boolean(newProduct);
      }

      if (success) {
        showSuccess(isEditing ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
        navigate('/admin/dashboard');
      } else {
        showError('Error al guardar el producto');
      }
      
    } catch (error) {
      console.error('Error al guardar:', error);
      showError('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  const getPriceFields = () => {
    if (formData.category === 'pollos') {
      return ['3', '5'];
    } else {
      return ['3', '6', '9', '12'];
    }
  };

  return (
    <div className="admin-product-form">
      <div className="container">
        {/* Header */}
        <div className="form-header">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="btn btn-outline"
          >
            <ArrowLeft size={18} />
            Volver al Dashboard
          </button>
          <h1>
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            {/* Información básica */}
            <div className="form-section">
              <h2>Información Básica</h2>
              
              <div className="form-group">
                <label htmlFor="name">Nombre del Producto *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Pollo al Limón"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe los ingredientes y características del producto..."
                  rows="4"
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoría *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="pollos">Pollos al Vacío</option>
                  <option value="tartas">Tartas Individuales</option>
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Producto destacado
                </label>
                <p className="checkbox-help">
                  Los productos destacados aparecen en la página principal
                </p>
              </div>
            </div>

            {/* Imagen */}
            <div className="form-section">
              <h2>Imagen del Producto</h2>
              
              <div className="image-upload">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button 
                      type="button"
                      onClick={removeImage}
                      className="remove-image"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="image-upload-placeholder">
                    <ImageIcon size={48} />
                    <p>Selecciona una imagen</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      id="image-upload"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="image-upload" className="upload-btn">
                      <Upload size={18} />
                      Subir Imagen
                    </label>
                  </div>
                )}
                
                {!imagePreview && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="image-upload-hidden"
                    style={{ display: 'none' }}
                  />
                )}
              </div>

              <div className="image-help">
                <p>Formatos recomendados: JPG, PNG</p>
                <p>Tamaño recomendado: 400x400px</p>
              </div>
            </div>
          </div>

          {/* Precios */}
          <div className="form-section">
            <h2>Precios</h2>
            <div className="prices-grid">
              {getPriceFields().map(quantity => (
                <div key={quantity} className="price-field">
                  <label htmlFor={`price_${quantity}`}>
                    {quantity} unidades
                  </label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      id={`price_${quantity}`}
                      name={`price_${quantity}`}
                      value={formData.prices[quantity]}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>
              ))}
            </div>
            {errors.prices && <span className="error-message">{errors.prices}</span>}
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
            <button 
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="btn btn-outline"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              <Save size={18} />
              {loading ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .admin-product-form {
          min-height: 100vh;
          background: var(--light-gray);
          padding: 2rem 0;
        }

        .form-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .form-header h1 {
          color: var(--dark-gray);
          margin: 0;
        }

        .product-form {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow-soft);
          padding: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-section h2 {
          color: var(--dark-gray);
          font-size: 1.25rem;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--border-light);
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

        .form-group input,
        .form-group textarea,
        .form-group select {
          padding: 0.75rem 1rem;
          border: 2px solid var(--border-light);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--warm-orange);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
          border-color: #ef4444;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.85rem;
        }

        .checkbox-group {
          flex-direction: row;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-weight: 500;
        }

        .checkbox-label input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-light);
          border-radius: 4px;
          position: relative;
          transition: all 0.3s ease;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: var(--warm-orange);
          border-color: var(--warm-orange);
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .checkbox-help {
          color: var(--text-gray);
          font-size: 0.85rem;
          margin: 0;
        }

        .image-upload {
          border: 2px dashed var(--border-light);
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .image-upload:hover {
          border-color: var(--warm-orange);
          background: rgba(255, 107, 53, 0.05);
        }

        .image-preview {
          position: relative;
          display: inline-block;
        }

        .image-preview img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        .remove-image {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-gray);
        }

        .upload-btn {
          background: var(--warm-orange);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .upload-btn:hover {
          background: #e55a2b;
          transform: translateY(-1px);
        }

        .image-help {
          margin-top: 1rem;
          text-align: center;
        }

        .image-help p {
          margin: 0.25rem 0;
          color: var(--text-gray);
          font-size: 0.85rem;
        }

        .prices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .price-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .price-field label {
          font-weight: 600;
          color: var(--dark-gray);
          font-size: 0.9rem;
        }

        .price-input {
          position: relative;
          display: flex;
          align-items: center;
        }

        .currency {
          position: absolute;
          left: 0.75rem;
          color: var(--text-gray);
          font-weight: 600;
          z-index: 1;
        }

        .price-input input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2rem;
          border: 2px solid var(--border-light);
          border-radius: 8px;
          font-size: 1rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 2px solid var(--border-light);
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .prices-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
