import axios from "axios"

export const getAllNotifications = async(id)=>{
    try {
      const res = await axios.get(`/api/notification/${id}`)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  }
