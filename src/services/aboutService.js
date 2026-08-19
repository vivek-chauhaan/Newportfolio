import axiosInstance from './axiosInstance.js'

const aboutService = {
  get: async () => (await axiosInstance.get('/about')).data.data,
  update: async (payload) => (await axiosInstance.put('/about', payload)).data.data,
}

export default aboutService
