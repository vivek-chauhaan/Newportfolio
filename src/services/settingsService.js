import axiosInstance from './axiosInstance.js'

const settingsService = {
  get: async () => (await axiosInstance.get('/settings')).data.data,
  update: async (payload) => (await axiosInstance.put('/settings', payload)).data.data,
}

export default settingsService
