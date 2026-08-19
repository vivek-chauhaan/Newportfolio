import axiosInstance from './axiosInstance.js'

const projectService = {
  getAll: async (params = {}) => (await axiosInstance.get('/projects', { params })).data.data,
  getBySlug: async (slug) => (await axiosInstance.get(`/projects/${slug}`)).data.data,
  create: async (payload) => (await axiosInstance.post('/projects', payload)).data.data,
  update: async (id, payload) => (await axiosInstance.put(`/projects/${id}`, payload)).data.data,
  delete: async (id) => (await axiosInstance.delete(`/projects/${id}`)).data,
  addImages: async (id, urls) => (await axiosInstance.post(`/projects/${id}/images`, urls)).data.data,
}

export default projectService
