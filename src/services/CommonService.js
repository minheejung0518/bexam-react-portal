import axios from 'axios';
import { BASE_API_URL } from '../common/constant';

const API_URL = `${BASE_API_URL}/api/common`;

export default class CommonService {
  static async getMyInfo(token) {
    // const response = {
    //   data: {
    //     id: 1,
    //     email: 'admin@gmail.com',
    //     firstName: 'ellen',
    //     lastName: 'lee',
    //     phone: '0101115224',
    //     nickName: 'hosik3',
    //     groupId: 1,
    //     groupName: 'ADMIN',
    //     permissions: ['USER_MANAGEMENT', 'GROUP_MANAGEMENT', 'BOARD'],
    //     created: '2022-10-26 05:41:47',
    //     updated: '2022-11-09 05:04:00',
    //   },
    // };
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async editMyInfo(token, user) {
    await axios.put(`${API_URL}/me`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async withdraw(token) {
    await axios.delete(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
