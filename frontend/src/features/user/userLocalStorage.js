export function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function readUser() {
  return JSON.parse(localStorage.getItem('user'));
}