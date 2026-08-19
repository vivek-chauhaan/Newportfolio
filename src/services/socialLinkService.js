import axiosInstance from './axiosInstance.js'

const socialLinkService = {
  getAll: async () => (await axiosInstance.get('/social-links')).data.data,
  create: async (payload) => (await axiosInstance.post('/social-links', payload)).data.data,
  update: async (id, payload) => (await axiosInstance.put(`/social-links/${id}`, payload)).data.data,
  delete: async (id) => (await axiosInstance.delete(`/social-links/${id}`)).data,
}

export default socialLinkService
