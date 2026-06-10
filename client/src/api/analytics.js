import api from './axios.js'

export const recordView = (userId) => api.post('/analytics/view', { userId })
export const recordClick = (linkId) => api.post(`/analytics/click/${linkId}`, {}, { withCredentials: false })
export const getAnalytics = (days = 30) => api.get(`/analytics?days=${days}`)
