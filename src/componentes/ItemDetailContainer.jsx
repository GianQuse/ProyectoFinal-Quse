import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useApiDetail } from '../hooks/useApi';
import Skeleton from './Skeleton';
import Counter from './Contador';

export function ItemDetailContainer() {
    const { ID } = useParams();
    const navigate = useNavigate();

    const { items, loading } = useApiDetail(ID);

    return (
        loading ? (
            <Skeleton
                count={2}
                variants={[{ width: '85%', maxWidth: '370px', height: '500px', borderRadius: '6px' },
                { width: '30%', maxWidth: '120px', height: '32px', margin: '30px 0 0 0', borderRadius: '8px' }]}
                marginTop={20}
            />
        ) : (
            <div className='contenedor-plato'>
                <div className="plato-card">
                    <img src={items.imagen} alt={items.nombre} className="plato-img" />
                    <div className="plato-info">
                        <h3 className="plato-nombre">{items.nombre}</h3>
                        <h4 className="plato-descripcion">{items.descripcion}</h4>
                        <p className="plato-precio">${items.precio}</p>
                    </div>
                    <Counter product={items} />
                </div>
                <button className='plato-button' onClick={() => navigate(-1)}>Volver atrás</button>
            </div>
        ));
}