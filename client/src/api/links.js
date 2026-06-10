import api from './axios.js'

export const getLinks = () => api.get('/links')
export const addLink = (data) => api.post('/links', data)
export const updateLink = (id, data) => api.put(`/links/${id}`, data)
export const deleteLink = (id) => api.delete(`/links/${id}`)
export const reorderLinks = (order) => api.put('/links/reorder', { order })
export const toggleLink = (id) => api.post(`/links/${id}/toggle`)
