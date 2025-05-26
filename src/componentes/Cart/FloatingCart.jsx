import { Link } from 'react-router-dom';
import cartIcon from '/imagenes/carrito-de-compras.png';
import { useContext } from 'react';
import { cartContext } from './CartContext.jsx';

function FloatingCart() {
  const { totalItemsInCart } = useContext(cartContext);
  const itemCount = totalItemsInCart();

  return (
    <Link to="/cart">
      <div className="floating-cart">
        {itemCount > 0 && <div className="cart-badge">{itemCount}</div>}
        <img src={cartIcon} alt="Carrito de compras" className="cart-icon" />
      </div>
    </Link>
  );
}

export default FloatingCart;

