import axios from "axios";
const API_URL = "http://localhost:3000/users/";


const register = (email, password) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};

const login =  (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if(response.data.token){
        sessionStorage.setItem("user", JSON.stringify(response.data.token))
      }
      return response.data;
    });
};

const logout = () => {
  sessionStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};
export default {
  register,
  login,
  logout,
  getCurrentUser
};
