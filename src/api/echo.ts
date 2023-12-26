const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api/v1';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const addMessageApi = `${baseUrl}/message/add`;
const getMessageListApi = `${baseUrl}/message/list`

interface Message {
    _id?: string,
    color: string,
    time: string,
    content: string,
    from: string,
    tag: string,
}
export const fetchAddMessageApi = async (message: Message) => {
    const res = await fetch(addMessageApi, {
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
interface getListQuery{
    limit?: number,
    offset?: number   
}
/**
 * limit: 条数，默认是20条。
 * offset: 偏移量
 */
export const fetchMessageListApi = async (query:getListQuery) => {
    const {limit, offset} = query;
    const res = await fetch(`${getMessageListApi}?limit=${limit}&offset=${offset}`,{
        method: 'GET',
        mode: 'cors',
    })
    return res.json();
}