import axios from 'axios';
const apiUrl = "http://localhost:3001/api/login";

const login = async (credentials: any) => {
    return axios.post(apiUrl, credentials).then((response: any) => {
        return response.data;
    });
}

export default {login};