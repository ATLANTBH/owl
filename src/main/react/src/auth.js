
export function logout() {
    // Removes user from local storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
}
export function isUserLoggedIn() {
    let token = sessionStorage.getItem('token');
    return !(!token || token === null || token.length === 0);
}