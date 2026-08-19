import axiosInstance from './axiosInstance.js'

const educationService = {
  getAll: async () => (await axiosInstance.get('/education')).data.data,
  create: async (payload) => (await axiosInstance.post('/education', payload)).data.data,
  update: async (id, payload) => (await axiosInstance.put(`/education/${id}`, payload)).data.data,
  delete: async (id) => (await axiosInstance.delete(`/education/${id}`)).data,
}

export default educationService
