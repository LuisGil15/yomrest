import axios from "axios";
const apiUrl = "http://172.17.1.153:3001/api/local";

export const getLocals = async (token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    
    return axios.get(apiUrl, config).then((response: any) => {
        return response.data;
    });
};

export const addLocal = async (local: any, token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios.post(apiUrl, local, config).then((response: any) => {
        return response.data;
    });
};

export const updateLocal = async (local: any, token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios.put(apiUrl, local, config).then((response: any) => {
        return response.data;
    });
};

export const deleteLocal = async (id: any, token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios.delete(apiUrl + '/' + id, config).then((response: any) => {
        return response.data;
    });
};
