import http from "./http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/events");
};

const getOne = (id) => {
  return http.get(`/events/${id}`);
};

const create = (data) => {
  return http.post("/events", data,  {headers: authHeader()});
};

const update = (id, data) => {
  return http.put(`/events/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/events/${id}`, {headers: authHeader()});
};


export default {
  getAll,
  getOne,
  create,
  update,
  remove
};
