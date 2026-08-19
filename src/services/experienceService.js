import axiosInstance from './axiosInstance.js'

const experienceService = {
  getAll: async () => (await axiosInstance.get('/experience')).data.data,
  create: async (payload) => (await axiosInstance.post('/experience', payload)).data.data,
  update: async (id, payload) => (await axiosInstance.put(`/experience/${id}`, payload)).data.data,
  delete: async (id) => (await axiosInstance.delete(`/experience/${id}`)).data,
}

export default experienceService
