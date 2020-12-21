import http from "./http-common";

const getAll = () => {
  return http.get("/events");
};

const getOne = (id) => {
  return http.get(`/events/${id}`);
};

const create = (data) => {
  return http.post("/events", data);
};

const update = (id, data) => {
  return http.put(`/events/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/events/${id}`);
};


export default {
  getAll,
  getOne,
  create,
  update,
  remove
};
