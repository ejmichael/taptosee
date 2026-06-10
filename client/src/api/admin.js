import api from './axios.js'

export const getAllUsers = (params) => api.get('/admin/users', { params })
export const deactivateUser = (id) => api.put(`/admin/users/${id}/deactivate`)
export const reactivateUser = (id) => api.put(`/admin/users/${id}/reactivate`)
export const getPlatformStats = () => api.get('/admin/stats')
