// use localStorage to store the authority info, which might be sent from server in actual project.
const authorityK = 'loshi-authority';
export function getAuthority() {
  return localStorage.getItem(authorityK) || 'admin';
}

export function setAuthority(authority) {
  return authority && localStorage.setItem(authorityK, authority);
}

export function clearAuthority() {
  return localStorage.removeItem(authorityK);
}
