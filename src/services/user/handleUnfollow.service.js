import axios from "axios"

 export const handleUnfollow = async(id,userId)=>{
    try {
      const res = await axios.post('/api/user/unfollow',{ userId:id, currentUserId:userId })
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  }
