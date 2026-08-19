import axiosInstance from './axiosInstance.js'

const blogService = {
  getAll: async (params = {}) => (await axiosInstance.get('/blogs', { params })).data.data,
  getBySlug: async (slug) => (await axiosInstance.get(`/blogs/${slug}`)).data.data,
  create: async (payload) => (await axiosInstance.post('/blogs', payload)).data.data,
  update: async (id, payload) => (await axiosInstance.put(`/blogs/${id}`, payload)).data.data,
  delete: async (id) => (await axiosInstance.delete(`/blogs/${id}`)).data,
  getCategories: async () => (await axiosInstance.get('/blogs/categories/all')).data.data,
}

export default blogService
