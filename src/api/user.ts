const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api/v1';
const loginApi = `${baseUrl}/user/authenticate`;
const registerApi = `${baseUrl}/user/register`;


export const fetchLoginApi = async (name: string, password: string) => {
    console.log(import.meta.env, name, password);
    const response = await fetch(loginApi, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            password: password
        })
    })
    return response.json();
}
export const fetchRegisterApi = async (name: string, password: string) => {
    const response = await fetch(registerApi, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            password: password
        })
    })
    return response.json();
}