import axios from "axios"

export const getSpecificPost = async(id)=>{
  try {
    const res = await axios.get(`/api/post/${id}`)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
