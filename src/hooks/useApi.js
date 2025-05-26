import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useApiState() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    return { items, setItems, loading, setLoading };
}

export function useApiMenu() {
    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {
        const db = getFirestore()
        const menuCollection = collection(db, 'menu');
        getDocs(menuCollection).then((response) => {
            const responseMapped = response.docs.map((doc) => ({ ...doc.data() }));
            setItems(responseMapped);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return { items, loading };
}

export function useApiList(categoria) {
    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {
        const db = getFirestore()
        const menuCollection = collection(db, 'menu');
        const queryCollection = query(menuCollection, where('tipo', '==', categoria));

        getDocs(queryCollection).then((response) => {
            const responseMapped = response.docs[0].data().platos || [];
            setItems(responseMapped);
        }).finally(() => {
            setLoading(false);
        });
    }, [categoria]);

    return { items, loading };
}

export function useApiDetail(ID) {
    const { items, setItems, loading, setLoading } = useApiState();

    useEffect(() => {
        const db = getFirestore()
        const menuCollection = collection(db, 'menu');
        getDocs(menuCollection).then((response) => {
            const responseMapped = response.docs.map((doc) => ({ ...doc.data() }));
            const plato = responseMapped
                .flatMap(item => item.platos)
                .find(plato => plato.ID === ID);
            setItems(plato);
        }).finally(() => {
            setLoading(false);
            window.scrollTo({
                top: 160,
                behavior: 'smooth'
            });
        });
    }, []);

    return { items, loading };
}
