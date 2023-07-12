export function isAuthenticated() {
  return localStorage.getItem('idToken') != null
}
