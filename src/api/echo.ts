const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api/';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const addMessageUrl = `${baseUrl}/message/add`;
const getMessageUrl = `${baseUrl}/message/list`
const updateMessageUrl = `${baseUrl}/message/update`;
const deleteMessageUrl = `${baseUrl}/message/delete`;
const likeMessageUrl = `${baseUrl}/message/like`;
interface Message {
    _id?: string,
    color: string,
    time: string,
    content: string,
    from: string,
    tag: string,
}
export const fetchAddMessageApi = async (message: Message) => {
    const res = await fetch(addMessageUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'authorization': userStore.token
        },
        body: JSON.stringify(message)
    })
    return res.json();
}
export const fetchUpdateMessageApi = async (message: Message) => {
    const res = await fetch(updateMessageUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'authorization': userStore.token
        },
        body: JSON.stringify(message)
    })
    return res.json();
}

interface getListQuery {
    limit?: number,
    offset?: number
}
/**
 * limit: 条数，默认是20条。
 * offset: 偏移量
 */
export const fetchMessageListApi = async (query: getListQuery) => {
    const { limit, offset } = query;
    const res = await fetch(`${getMessageUrl}?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        mode: 'cors',
    })
    return res.json();
}

export const fetchDeleteMessageApi = async (id: string) => {
    const res = await fetch(`${deleteMessageUrl}?_id=${id}`, {
        method: 'GET',
        mode: 'cors',
    })
    return res.json();
}

export const fetchLikeMessageApi = async (id: string) => {
    const mid = id;
    const uid = userStore._id;
    const res = await fetch(`${likeMessageUrl}?mid=${mid}&uid=${uid}`, {
        method: 'GET',
        mode: 'cors',
    })
    return res.json();
}
