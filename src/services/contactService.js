import axiosInstance from './axiosInstance.js'

const contactService = {
  submit: async (payload) => (await axiosInstance.post('/contact', payload)).data,
  getAll: async (params = {}) => (await axiosInstance.get('/admin/contact-messages', { params })).data.data,
  markRead: async (id) => (await axiosInstance.patch(`/admin/contact-messages/${id}/read`)).data,
  delete: async (id) => (await axiosInstance.delete(`/admin/contact-messages/${id}`)).data,
}

export default contactService
