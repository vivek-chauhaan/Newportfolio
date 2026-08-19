import axiosInstance from './axiosInstance.js'

const uploadService = {
  upload: async (type, file, refId) => {
    const formData = new FormData()
    formData.append('file', file)
    if (refId) formData.append('refId', refId)
    const { data } = await axiosInstance.post(`/upload/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.data
  },
}

export default uploadService
