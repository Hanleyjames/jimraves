export default function authHeader() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (user) {
    //Reminder to remove this console log later
    console.log('Bearer ' + user);
    return { Authorization: 'Bearer ' + user };
  } else {
    console.log("Bearer fetch failed");
    return {};
  }
}
