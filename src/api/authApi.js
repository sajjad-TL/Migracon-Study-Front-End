import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/other-auth';

export const requestResetCode = (email) =>
  axios.post(`${API_BASE}/forgot-password`, { email });

export const verifyResetCode = (email, code) =>
  axios.post(`${API_BASE}/verify-code`, { email, code });

export const resetPassword = (data) =>
  axios.post(`${API_BASE}/reset-password`, data);