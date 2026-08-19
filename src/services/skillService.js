import axiosInstance from './axiosInstance.js'

const skillService = {
  getAll: async (params = {}) => (await axiosInstance.get('/skills', { params })).data.data,
  getCategories: async () => (await axiosInstance.get('/skill-categories')).data.data,
  create: async (payload) => (await axiosInstance.post('/skills', payload)).data.data,
  update: async (id, payload) => (await axiosInstance.put(`/skills/${id}`, payload)).data.data,
  delete: async (id) => (await axiosInstance.delete(`/skills/${id}`)).data,
  createCategory: async (payload) => (await axiosInstance.post('/skill-categories', payload)).data.data,
  deleteCategory: async (id) => (await axiosInstance.delete(`/skill-categories/${id}`)).data,
}

export default skillService
