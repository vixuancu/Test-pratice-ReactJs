import axios from "../services/axios";
const fetAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
export { fetAllUser };
