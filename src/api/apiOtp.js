import axios from 'axios';

const OTP_API_BASE_URL = process.env.REACT_APP_OTP_API_BASE_URL; 

const apiOtp = axios.create({
  baseURL: OTP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiOtp.interceptors.request.use((config) => {

  console.log('Request sent to OTP API:', config);
  return config;
}, (error) => {
  // Handle request error
  console.error('Error in OTP API request:', error);
  return Promise.reject(error);
});


apiOtp.interceptors.response.use((response) => {

  console.log('Response received from OTP API:', response);
  return response;
}, (error) => {
  // Handle response error
  console.error('Error in OTP API response:', error);
  return Promise.reject(error);
});

export default apiOtp;
