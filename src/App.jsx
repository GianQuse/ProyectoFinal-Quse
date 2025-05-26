import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CartProvider from './componentes/Cart/CartContext.jsx';
import { ItemMenuContainer } from './componentes/ItemMenuContainer.jsx';
import { ItemListContainer } from './componentes/ItemListContainer.jsx';
import { ItemDetailContainer } from './componentes/ItemDetailContainer.jsx';
import { NavBar } from './componentes/NavBar.jsx';
import { BotonPrincipal } from './componentes/BotonPrincipal.jsx';
import { Cart } from './componentes/Cart/Cart.jsx';
import { Footer } from './componentes/Footer.jsx';
import FloatingCart from './componentes/Cart/FloatingCart.jsx';
import { createFirebaseApp } from './utils/configFirebase.js';
import { CheckCart } from './componentes/Cart/CheckCart.jsx';
import './style.css';

function App() {
  createFirebaseApp();

  return (
    <Router>
      <div className='contenedorPrincipal'>
        <CartProvider>
          <NavBar />
          <BotonPrincipal />
          <Routes>
            <Route path="/" element={<ItemMenuContainer />} />
            <Route path="/categoria/:categoria" element={<ItemListContainer />} />
            <Route path="/detail/:ID" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkcart" element={<CheckCart />} />
          </Routes>
          <FloatingCart/>
        </CartProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;