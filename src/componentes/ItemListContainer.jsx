import { useParams, Link } from 'react-router-dom';
import { useApiList } from '../hooks/useApi';
import Skeleton from './Skeleton';

export function ItemListContainer() {
    const { categoria } = useParams();

    const { items, loading } = useApiList(categoria);

    const skeletonVariants = {
        width: '90%',
        height: '55px',
        borderRadius: '12px',
        marginBottom: '20px',
    }

    return (
        <div className="todos-platos-lista">
            {loading ? (
                <Skeleton
                    count={8}
                    variants={[
                        { width: '35%', height: '32px', borderRadius: '12px', marginBottom: '30px' },
                        ...Array(7).fill(skeletonVariants)
                    ]}
                    marginTop={15}
                />
            ) : (
                <>
                    <h2 className="menu-title">{categoria}</h2>
                    {items.map((plato, index) => (
                        <Link to={`/detail/${plato.ID}`} key={index} className="menu-principal-link">
                            <div className="plato-detalle">
                                <div className='plato-detalle-texto'>
                                    <span className="nombre-plato">{plato.nombre}</span>
                                    <span className="descripcion-plato">{plato.descripcion}</span>
                                </div>
                                <span className="precio-plato">${plato.precio}</span>
                            </div>
                        </Link>
                    ))}
                </>
            )}
        </div>
    );
}