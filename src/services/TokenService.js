const LOCAL_STORAGE_TOKEN_KEY_NAME = 'token';

export default class TokenService {
  static get() {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  }

  static set(token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
  }

  static remove() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  }
}
