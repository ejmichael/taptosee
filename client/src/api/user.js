import api from './axios.js'

export const getPublicProfile = (username) => api.get(`/users/${username}`)
export const updateProfile = (formData) => api.put('/users/profile', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const updateUsername = (username) => api.put('/users/username', { username })
export const deleteAccount = (password) => api.delete('/users/account', { data: { password } })
