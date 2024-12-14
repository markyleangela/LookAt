import axios from 'axios';

// Use process.env to get the base URL
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

const createBarangay = async (barangayData) => {
    try {
        const response = await axios.post(`${API_URL}/Barangay`, barangayData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getBarangayById = async (id) => {
    if (!id) {
        throw new Error('Barangay ID is required.');
    }

    try {
        const response = await axios.get(`${API_URL}/Barangay/${id}`, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};

const login = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, loginData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        console.log('Login Response:', response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        console.error('Error in login request:', error);
        throw error;
    }
};

const barangayService = {
    createBarangay,
    getBarangayById,
    login,
};

export default barangayService;
