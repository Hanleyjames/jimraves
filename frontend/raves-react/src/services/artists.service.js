import http from "./http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/artists");
};

const getOne = (id) => {
  return http.get(`/artists/${id}`);
};

const create = (data) => {
  return http.post("/artists", data, {headers: authHeader()});
};

const update = (id, data) => {
  return http.put(`/artists/${id}`, data, {headers: authHeader()});
};

const remove = (id) => {
  return http.delete(`/artists/${id}`, {headers: authHeader()});
};


export default {
  getAll,
  getOne,
  create,
  update,
  remove
};
