import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Set your base URL here
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_TOKEN_HERE' // If you need to pass a token
    }
});

export default axiosInstance;
