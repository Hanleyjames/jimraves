import http from "./http-common";

const getAll = () => {
  return http.get("/events");
};

export default {
  getAll
};
