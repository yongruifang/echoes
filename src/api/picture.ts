const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api/';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const addPicUrl = `${baseUrl}/photo/add`;
const getPicUrl = `${baseUrl}/photo/list`;

export const fetchAddPicApi = async (pic: any) => {
    const res = await fetch(addPicUrl, {
        method: 'POST',
        mode: 'cors',
        body: pic,
        headers: {
            'Accept': 'application/json',
            'authorization': userStore.token
        },
    })
    return res.json();
}
export const fetchPicListApi = async (query: {
    limit: number,
    offset: number
}) => {
    const { limit, offset } = query;
    const res = await fetch(`${getPicUrl}?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        mode: 'cors',
    })
    return res.json();
}