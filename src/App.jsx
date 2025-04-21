import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundaries';
import Collections from './pages/Collections';
import { products } from './data/products';

function App() {
  return (
    <ErrorBoundary>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/collections' element={<Collections products={products}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
    </ErrorBoundary>
  );
}

export default App;