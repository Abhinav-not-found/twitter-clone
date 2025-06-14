import axios from "axios"
import { toast } from "sonner"

export const deleteBookmark = async(userId, postId)=>{
    try {
      const res = await axios.post('/api/bookmark/deleteBookmark',{ userId ,postId})
      toast.success(res.data.message)

    } catch (error) {
        console.log(error)
    }
  }
