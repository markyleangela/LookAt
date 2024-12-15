import axios from 'axios';

// Use environment variable for API base URL
const registerUser = async (userData) => {
    try {
        const response = await axios.post('https://localhost:7213/api/User', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        throw error;
    }
};

const updateUser = async (userId, updateData) => {
    try {
        const response = await axios.put(`https://localhost:7213/api/User/${userId}`, updateData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        throw error;
    }
};

const getUser = async () => {
    try {
        const response = await axios.get('https://localhost:7213/api/User/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        throw error;
    }
};


export default {registerUser, updateUser, getUser};
