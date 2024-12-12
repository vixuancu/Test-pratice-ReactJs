import axios from "../services/axios";
const fetAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const postCreateUser = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};
const updateUser = (id, name, job) => {
  return axios.put(`/api/users/${id}`, { name, job });
};
const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};

export { fetAllUser, postCreateUser, updateUser, deleteUser };
