import axios from 'axios';

// Use environment variable for API base URL
const loginUser = async (userData) => {
    try {
        const response = await axios.post(`https://localhost:7213/api/User/login`, userData, {
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

export default loginUser;
