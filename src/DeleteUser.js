import axios from "axios";

const deleteUser = (user) => {
  return axios.delete(`/api/users/${user.id}`);
};

export default deleteUser;
