import axios from 'axios';

const API_URL = 'http://localhost:5000/file'; 

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(`${API_URL}/upfile`, formData);
};

export const getAllFiles = (page = 1, limit = 10) => {
    return axios.get(`${API_URL}/getfiles`, {
        params: { page, limit }
    });
};

export const getFileById = (id) => {
    return axios.get(`${API_URL}/fileById/${id}`);
};

export const editFile = (id, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.put(`${API_URL}/editfile/${id}`, formData);
};

export const deleteFile = (id) => {
    return axios.delete(`${API_URL}/deletefile/${id}`);
};
