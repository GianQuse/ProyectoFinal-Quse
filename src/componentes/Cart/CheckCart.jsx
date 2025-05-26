import styles from './CheckCart.module.css';
import { getFirestore, collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { cartContext } from './CartContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const CheckCart = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const { totalPrice, cart, clearCart } = useContext(cartContext);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
    });

    function onChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value, });
    };

    const handleCreateOrder = () => {
        const db = getFirestore();
        const collectionRef = collection(db, "orders");
        const orderData = {
            comprador: {
                nombre: values.nombre,
                apellido: values.apellido,
                direccion: values.direccion,
                telefono: values.telefono,
            },
            total: totalPrice(),
            productos: cart,
            fecha: serverTimestamp(),
        };

        addDoc(collectionRef, orderData).then((response) => {
            MySwal.fire({
                title: "Pedido creado con éxito",
                html: `Su orden: <strong>${response.id}</strong>`,
                icon: "success",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
            });
            clearCart();
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }).catch((error) => {
            MySwal.fire({
                title: "Error al crear el pedido",
                text: error.message,
                icon: "error",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
            });
        }).finally(() => {
            setIsSubmitting(false);
        })
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        handleCreateOrder();
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Finalizar Compra</h2>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    className={styles.input}
                    onChange={onChange}
                    required
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    className={styles.input}
                    onChange={onChange}
                    required
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    className={styles.input}
                    onChange={onChange}
                    required
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    className={styles.input}
                    onChange={onChange}
                    required
                    pattern="^\d{3}\d{7}$|^\d{4}\d{6}$"
                    title="Ingresa un número válido"
                />
                <button type="submit" className={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </div>
    );
};
