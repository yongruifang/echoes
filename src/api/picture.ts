const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api/';

const addPicUrl = `${baseUrl}/photo/add`;
const getPicUrl = `${baseUrl}/photo/list`;

export const fetchAddPicApi = async (pic: any) => {
    const res = await fetch(addPicUrl, {
        method: 'POST',
        mode: 'cors',
        body: pic
    })
    return res;
}
export const fetchPicListApi = async () => {
    const res = await fetch(`${getPicUrl}`, {
        method: 'GET',
        mode: 'cors',
    })
    return res.json();
}