import axios from "axios";

export const getUserInfo = async()=>{
    const res = await axios.post('/api/user/profile')
    return res.data.data
}
