import axiosInstance from './axiosInstance.js'

const authService = {
  login: async (email, password) => {
    const { data } = await axiosInstance.post('/auth/login', { email, password })
    return data.data
  },
}

export default authService
