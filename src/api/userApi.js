import axios from 'axios';

// Use environment variable for API base URL
const registerUser = async (userData) => {
    try {
        const response = await axios.post('https://localhost:7213/api/User/request-otp', userData, {
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
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Validation Errors:', error.response.data.errors);
            console.error('Full error response:', error.response);
        } else {
            console.error(error.message);
        }
        throw error;
    }
};


const getUser = async (id) => {
    try {
        const response = await axios.get(`https://localhost:7213/api/User/${id}`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        throw error;
    }
};

const userApi = {
    registerUser,
    updateUser,
    getUser
}


export default userApi;
