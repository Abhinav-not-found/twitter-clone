import { toast } from "sonner"

const { default: axios } = require("axios")

export const handleDeletePost = async (id,queryClient) => {
  try {
    const res = await axios.delete(`/api/post/delete/${id}`)
    toast.success(res.data.message)
    await queryClient.invalidateQueries({ queryKey: ['getAllPosts'] })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
