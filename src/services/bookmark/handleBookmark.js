import axios from "axios"
import { toast } from "sonner"

export const handleBookmark = async(userId, postId)=>{
    try {
      const res = await axios.post('/api/bookmark/addBookmark',{ userId ,postId})
      toast.success(res.data.message)

    } catch (error) {
        console.log(error)
    }
  }
