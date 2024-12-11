import axios from "../services/axios";
const fetAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const postCreateUser = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};
export { fetAllUser, postCreateUser };
