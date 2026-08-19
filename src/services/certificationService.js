import axiosInstance from './axiosInstance.js'

const certificationService = {
  getAll: async () => (await axiosInstance.get('/certifications')).data.data,
  create: async (payload) => (await axiosInstance.post('/certifications', payload)).data.data,
  update: async (id, payload) => (await axiosInstance.put(`/certifications/${id}`, payload)).data.data,
  delete: async (id) => (await axiosInstance.delete(`/certifications/${id}`)).data,
}

export default certificationService
