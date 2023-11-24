import axios from 'axios';
import { BASE_API_URL } from '../common/constant';

const API_URL = `${BASE_API_URL}/api/auth`;

export default class AuthService {
  static async login(loginInfo) {
    const response = await axios.post(`${API_URL}/login`, loginInfo);
    return response.data;
  }

  static async logout(token) {
    await axios.delete(`${API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async signup(user) {
    const response = await axios.post(`${API_URL}/signup`, user);
    return response.data;
  }

  static async refreshToken(token, auth) {
    const response = await axios.post(`${API_URL}/refreshToken`, auth);
    return response.data;
  }
}
