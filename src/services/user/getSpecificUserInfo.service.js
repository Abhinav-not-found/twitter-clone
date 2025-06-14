import axios from "axios"

  export const getSpecificUserInfo = async(id)=>{
    try {
      const res = await axios.get(`/api/user/getSpecificUser/${id}`)
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  }
