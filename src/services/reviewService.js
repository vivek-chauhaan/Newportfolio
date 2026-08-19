import axiosInstance from './axiosInstance.js'

const reviewService = {
  getApproved: async () => (await axiosInstance.get('/reviews')).data.data,
  getAllForAdmin: async () => (await axiosInstance.get('/reviews/admin/all')).data.data,
  create: async (payload) => (await axiosInstance.post('/reviews', payload)).data.data,
  update: async (id, payload) => (await axiosInstance.put(`/reviews/${id}`, payload)).data.data,
  delete: async (id) => (await axiosInstance.delete(`/reviews/${id}`)).data,
}

export default reviewService
