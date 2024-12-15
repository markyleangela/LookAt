import axios from 'axios';

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
}

const getRequestsByBarangayId = async (id) => {

    try {
        const response = await axios.get(`${API_URL}/Request/by/${id}`, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error)
    }
}

const updateRequest = async (id, values) => {

    try {
        const response = await axios.put(`${API_URL}/Request/${id}` , values, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const requestService = {
    getRequestsByBarangayId,
    updateRequest
};

export default requestService;