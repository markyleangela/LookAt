import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const handleError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data.message || error.response.statusText);
    } else if (error.request) {
        console.error('No Response Received:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    throw error;
};

const createDocument = async (documentData) => {
    try {
        const response = await axios.post(`${API_URL}/DocumentType`, documentData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error)
    }
};

const getDocument = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/DocumentType/by/${id}`, {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw(error);
    }
};

const getDocumentsByBarangay = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/DocumentType/by/${id}`, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw(error);
    }
}

const  updateDocument = async (id, values) => {
    try {
        const response = await axios.put(`${API_URL}/DocumentType/${id}` , values, {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw(error);
    }
}

const documentService = {
    createDocument,
    getDocument,
    updateDocument,
    getDocumentsByBarangay
};

export default documentService;