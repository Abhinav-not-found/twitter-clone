import axios from "axios"

 export const getAllPosts = async()=>{
    try {
      const res = await axios.get('/api/post/getAllPosts')
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  }
