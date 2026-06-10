import api from './axios.js'

export const register = (formData) => api.post('/auth/register', formData)
export const login = (data) => api.post('/auth/login', data)
export const logout = () => api.post('/auth/logout')
export const getMe = () => api.get('/auth/me')
export const verifyEmail = (token) => api.get(`/auth/verify-email?token=${token}`)
export const forgotPassword = (emailAddress) => api.post('/auth/forgot-password', { emailAddress })
export const resetPassword = (token, password) => api.post('/auth/reset-password', { token, password })
export const changePassword = (data) => api.post('/auth/change-password', data)
