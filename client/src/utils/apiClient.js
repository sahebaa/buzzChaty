import axios from 'axios';

const apiClient=axios.create({
    baseURL: 'http://localhost:3000/api', // your Express backend base URL
    withCredentials: true, // if you're using cookies or session
    headers: {
      'Content-Type': 'application/json',
    },
})

// Optional: Add interceptors for auth, logging, etc.
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API error:', error);
      return Promise.reject(error);
    }
  );
  
  export default apiClient;