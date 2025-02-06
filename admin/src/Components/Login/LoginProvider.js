import axios from "axios";
import config from "../../api/config";

const loginProvider = {
  // Kiểm tra thông tin đăng nhập
  login: async ({ username, password }) => {
    try {
      const response = await axios.post(config.LOGIN_URL, { username, password });
      const { token } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem('auth_token', token);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject('Invalid username or password');
    }
  },

  // Kiểm tra trạng thái đăng nhập
  checkAuth: () => {
    return localStorage.getItem('auth_token') ? Promise.resolve() : Promise.reject();
  },

  // Kiểm tra quyền truy cập
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth_token');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Lấy thông tin người dùng
  getPermissions: () => Promise.resolve(),

  // Xử lý đăng xuất
  logout: () => {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  },
};

export default loginProvider;