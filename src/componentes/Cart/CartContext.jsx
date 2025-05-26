import { createContext } from "react";
import { useState, useEffect } from "react";

export const cartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const onAdd = (product, quantity) => {
        setCart((prev) => {
            const existingProduct = prev.findIndex((item) => item.product.ID === product.ID);

            if (existingProduct !== -1) {
                return prev.map((item) =>
                    item.product.ID === product.ID
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prev, { product, quantity }];
            }
        });
    };

    const clearCart = () => {
        setCart([])
    }

    const removeItem = (productNombre, productDescripcion) => {
        setCart(cart.filter((item) => {
            const nombreMatch = item.product.nombre.trim().toLowerCase() === productNombre.trim().toLowerCase();
            const descMatch = item.product.descripcion.trim().toLowerCase() === productDescripcion.trim().toLowerCase();
            return !(nombreMatch && descMatch);
        }));
    };

    const totalItemsInCart = () => {
        return cart.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
    }

    const totalPrice = () => {
        return cart.reduce((acc, item) => {
            return acc + (item.product.precio * item.quantity);
        }, 0);
    }

    // Formatear el precio a pesos argentinos
    const formatAsPesoArgentino = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(amount).replace(/\s/g, '');
    };

    return <cartContext.Provider
        value={{
            cart,
            onAdd,
            clearCart,
            removeItem,
            totalPrice,
            totalItemsInCart,
            formatAsPesoArgentino,
        }}
    > {children}
    </cartContext.Provider>
}

export default CartProvider;