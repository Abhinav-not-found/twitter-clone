import axios from "axios";

export const markAllAsRead = async (userId) => {
  const res = await axios.put(`/api/notification/mark-all-read`, { userId });
  return res.data;
};
