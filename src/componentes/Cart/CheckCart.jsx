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
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState(0);

    const handleCreateOrder = () => {
        const db = getFirestore();
        const collectionRef = collection(db, "orders");
        const orderData = {
            comprador: {
                nombre: nombre,
                apellido: apellido,
                direccion: direccion,
                telefono: telefono,
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

    const handleChangeNombre = (e) => {
        setNombre(e.target.value)
    }
    const handleChangeApellido = (e) => {
        setApellido(e.target.value)
    }
    const handleChangeDireccion = (e) => {
        setDireccion(e.target.value)
    }
    const handleChangeTelefono = (e) => {
        setTelefono(e.target.value)
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Finalizar Compra</h2>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    className={styles.input}
                    onChange={handleChangeNombre}
                    required
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    className={styles.input}
                    onChange={handleChangeApellido}
                    required
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    className={styles.input}
                    onChange={handleChangeDireccion}
                    required
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    className={styles.input}
                    onChange={handleChangeTelefono}
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
