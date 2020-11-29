export default function authHeader() {
  const token = JSON.parse(sessionStorage.getItem('token'));

  if (token) {
    // for Node.js Express back-end
    return { 'x-access-token': token };
  } else {
    return {};
  }
