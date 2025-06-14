const { default: axios } = require("axios")

export const getBookmarks = async(id)=>{
  try {
    const res = await axios.get(`/api/bookmark/get/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
