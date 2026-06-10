import api from './axios.js'

export const getSocials = () => api.get('/socials')
export const addSocial = (data) => api.post('/socials', data)
export const updateSocial = (id, data) => api.put(`/socials/${id}`, data)
export const deleteSocial = (id) => api.delete(`/socials/${id}`)
export const reorderSocials = (order) => api.put('/socials/reorder', { order })
