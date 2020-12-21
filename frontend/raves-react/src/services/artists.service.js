import http from "./http-common";

const getAll = () => {
  return http.get("/artists");
};

const getOne = (id) => {
  return http.get(`/artists/${id}`);
};

const create = (data) => {
  return http.post("/artists", data);
};

const update = (id, data) => {
  return http.put(`/artists/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/artists/${id}`);
};


export default {
  getAll,
  getOne,
  create,
  update,
  remove
};
