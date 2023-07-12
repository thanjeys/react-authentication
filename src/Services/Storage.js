export function storeUserData(data) {
  localStorage.setItem('idToken', data)
}

export function removeUserData() {
  localStorage.removeItem('idToken')
}

export function getUserData() {
  return localStorage.getItem('idToken');
}
