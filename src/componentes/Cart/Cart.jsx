import { useContext, useEffect, useState } from "react";
import { cartContext } from "./CartContext";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";
import styles from './Cart.module.css';

export const Cart = () => {
    const { cart, clearCart, removeItem, totalPrice, formatAsPesoArgentino } = useContext(cartContext);
    const [loading, setLoading] = useState(true);

    const skeletonVariants = {
        general: {
            width: '90%',
            maxWidth: '400px',
            height: '120px',
            borderRadius: '8px',
            marginBottom: '25px',
        },
        button: {
            width: '45%',
            maxWidth: '220px',
            height: '40px',
            borderRadius: '8px',
            marginBottom: '20px',
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    if (cart.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h3>Ups...!!</h3>
                <p>Tu carrito está vacío<br />😢</p>
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <Skeleton
                    count={5}
                    variants={[
                        ...Array(2).fill(skeletonVariants.general),
                        { width: '55%', height: '30px', maxWidth: '280px', borderRadius: '8px', marginBottom: '25px' },
                        ...Array(2).fill(skeletonVariants.button)]}
                    marginTop={20}
                />
            ) : (
                <div className={styles.cartContainer}>
                    {cart.map((cartItem, index) => (
                        <div key={index} className={styles.cartItem}>
                            <img
                                src={cartItem.product.imagen}
                                alt={cartItem.product.nombre}
                                className={styles.cartItemImg}
                            />
                            <div className={styles.cartItemContent}>
                                <div className={styles.cartItemInfo}>
                                    <h3 className={styles.cartItemNombre}>{cartItem.product.nombre}</h3>
                                    <p className={styles.cartItemPrecio}>
                                        {formatAsPesoArgentino(cartItem.product.precio * cartItem.quantity)}
                                    </p>
                                    <p className={styles.cartItemCantidad}>
                                        Cantidad: {cartItem.quantity}
                                    </p>
                                </div>
                                <button
                                    className={styles.removeFromCartButton}
                                    onClick={() => removeItem(cartItem.product.nombre, cartItem.product.descripcion)}
                                >
                                    Quitar
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3 className={styles.cartTotalPrice}>PRECIO TOTAL: {formatAsPesoArgentino(totalPrice())}</h3>
                    <div className={styles.cartActions}>
                        <button onClick={clearCart} className={styles.clearCartButton}>
                            Vaciar Carrito
                        </button>
                        <Link to="/checkcart" className={styles.checkoutLink}>
                            <button className={styles.checkoutButton}>
                                Finalizar Compra
                            </button>
                        </Link>
                    </div>
                </div>)}
        </>
    );
};
