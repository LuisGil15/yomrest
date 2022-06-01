import axios from 'axios';
const apiUrl = "https://secret-river-21821.herokuapp.com/api/login";

const login = async (credentials: any) => {
    return axios.post(apiUrl, credentials).then((response: any) => {
        return response.data;
    });
}

export default {login};