import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductosPage } from './pages/ProductosPage';
import { ProductoDetailPage } from './pages/ProductoDetailPage';
import { ContactoPage } from './pages/ContactoPage';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productos/:category" element={<ProductosPage />} />
            <Route path="/producto/:id" element={<ProductoDetailPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;