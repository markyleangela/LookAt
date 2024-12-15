import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

const verifyUser = async (id, values) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/User/${id}`, values, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const userVerify = {
    verifyUser,
}

export default userVerify;