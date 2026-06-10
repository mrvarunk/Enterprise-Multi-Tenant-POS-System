import axios from 'axios';

// 1. Create the base Axios instance pointing to your Spring Boot gateway
const api = axios.create({
    baseURL: 'http://localhost:5000', // Matches your Spring Boot server port configuration
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// 2. Request Interceptor: Automatically injects the JWT token before the request leaves
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('JWT');

        if (token) {
            // Attaches the token in the strict 'Bearer <token>' format expected by Spring Security
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor: Catches global security exceptions (like expired sessions)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If the server returns a 401 (Unauthorized) or 403 (Forbidden), the token is likely invalid or expired
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn("Security Token invalid or expired. Purging session context...");

            // Clean up the dead session
            localStorage.removeItem('JWT');

            // Force boot the user back to the login screen securely if they aren't already there
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;