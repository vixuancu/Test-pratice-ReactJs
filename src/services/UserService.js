import axios from "../services/axios";
const fetAllUser = () => {
  return axios.get("/api/users?page=2");
};
export { fetAllUser };
