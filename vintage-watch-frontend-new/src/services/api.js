import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User API
export const userAPI = {
  getAll: () => api.get('/users/all'),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post('/users/', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
};

// Watch API
export const watchAPI = {
  getAll: (params = {}) => api.get('/watches/all', { params }),
  getById: (id) => api.get(`/watches/${id}`),
  getBySeller: (sellerId) => api.get(`/watches/seller/${sellerId}`),
  create: (watchData) => api.post('/watches/', watchData),
  update: (id, watchData) => api.put(`/watches/${id}`, watchData),
  delete: (id) => api.delete(`/watches/${id}`),
};

// Appraisal API
export const appraisalAPI = {
  getAll: () => api.get('/appraisals/all'),
  getById: (id) => api.get(`/appraisals/${id}`),
  getByWatch: (watchId) => api.get(`/appraisals/watch/${watchId}`),
  getByAppraiser: (appraiserId) => api.get(`/appraisals/appraiser/${appraiserId}`),
  create: (appraisalData) => api.post('/appraisals/', appraisalData),
  update: (id, appraisalData) => api.put(`/appraisals/${id}`, appraisalData),
  updateByWatch: (appraiserId, watchId, appraisalData) => 
    api.put(`/appraisals/appraiser/${appraiserId}/watch/${watchId}`, appraisalData),
  delete: (id) => api.delete(`/appraisals/${id}`),
};

// Order API
export const orderAPI = {
  getAll: () => api.get('/orders/all'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders/', orderData),
  update: (id, orderData) => api.put(`/orders/${id}`, orderData),
  delete: (id) => api.delete(`/orders/${id}`),
};

// Order Detail API
export const orderDetailAPI = {
  getAll: () => api.get('/order-details/all'),
  getById: (id) => api.get(`/order-details/${id}`),
  create: (orderDetailData) => api.post('/order-details/', orderDetailData),
  update: (id, orderDetailData) => api.put(`/order-details/${id}`, orderDetailData),
  delete: (id) => api.delete(`/order-details/${id}`),
};

// Transaction API
export const transactionAPI = {
  getAll: () => api.get('/transactions/all'),
  getById: (id) => api.get(`/transactions/${id}`),
  create: (transactionData) => api.post('/transactions/create', transactionData),
  createEscrow: (escrowData) => api.post('/transactions/escrow/create', escrowData),
  releaseEscrowByTransaction: (transactionId) => api.put(`/transactions/escrow/bytransaction/release/${transactionId}`),
  updateEscrowStatus: (payload) => api.put('/transactions/escrow/status', payload),
};

// Feedback API
export const feedbackAPI = {
  getAll: () => api.get('/feedbacks/all'),
  getById: (id) => api.get(`/feedbacks/${id}`),
  getByAgent: () => api.get('/feedbacks/agent'),
  create: (feedbackData) => api.post('/feedbacks/', feedbackData),
  update: (id, feedbackData) => api.put(`/feedbacks/${id}`, feedbackData),
  delete: (id) => api.delete(`/feedbacks/${id}`),
};

export default api;
