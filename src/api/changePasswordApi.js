import axios from 'axios';

// Use environment variable for API base URL
const changePassword = async (userData) => {
    try {
        const response = await axios.put(`https://localhost:7213/api/User/change-password`, userData, {
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

export default changePassword;
