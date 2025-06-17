import axios from "axios"

export const handleLikeDecrease = async(postId, userId)=>{
  try {
    const res = await axios.put(`/api/post/like/${postId}`,{userId})
    return res.data
  } catch (error) {
    console.log(error)
  }
}
