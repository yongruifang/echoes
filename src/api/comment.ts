const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api/';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

const addCommentUrl = `${baseUrl}/comment/add`;
const getCommentUrl = `${baseUrl}/comment/list`;
// const updateCommentUrl = `${baseUrl}/comment/update`;
const deleteCommentUrl = `${baseUrl}/comment/delete`;

interface Comment {
    _id?: string,
    uid?: string,
    mid: string,
    time: string,
    content: string,
    user: string,
}
interface addCommentReq {
    mid: string,
    uid: string,
    time: string,
    content: string
}
export const fetchAddCommentApi = async (comment: addCommentReq) => {
    const res = await fetch(addCommentUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'authorization': userStore.token
        },
        body: JSON.stringify(comment)
    })
    return res.json();
}
export const fetchCommentListApi = async (mid: string) => {
    const res = await fetch(`${getCommentUrl}?mid=${mid}`, {
        method: 'GET',
        mode: 'cors',
    })
    return res.json();
}
export const fetchDeleteCommentApi = async (id: string) => {
    const res = await fetch(`${deleteCommentUrl}?_id=${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'authorization': userStore.token
        },
    })
    return res.json();
}



