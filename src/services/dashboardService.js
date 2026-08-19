import axiosInstance from './axiosInstance.js'

const dashboardService = {
  getStats: async () => (await axiosInstance.get('/admin/dashboard/stats')).data.data,
  getPublicStats: async () => (await axiosInstance.get('/stats')).data.data,
}

export default dashboardService

