import axios from "axios"

 export const handleFollow = async(id,userId)=>{
    try {
      const res = await axios.post('/api/user/follow',{ userId:id, currentUserId:userId })
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  }
