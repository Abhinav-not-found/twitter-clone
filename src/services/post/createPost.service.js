import axios from "axios"
import { toast } from "sonner"
export const handleCreatePost = async (input, setOpen, setInput, queryClient) => {

  setOpen(true)
  const userId = localStorage.getItem('userId')
  try {
    const res = await axios.post('/api/post/create', { content: input, userId })
    toast.success(res.data.message)
    setInput('')
    await queryClient.invalidateQueries({ queryKey: ['getAllPosts'] }) 
  } catch (error) {
    console.log(error)
  } finally {
    setOpen(false)
  }
}
