export default function authHeader() {
  const token = JSON.parse(sessionStorage.getItem('token'));

  if (token) {
    return { 'x-access-token': token };
  } else {
    return {};
  }
