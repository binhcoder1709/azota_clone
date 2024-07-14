import axios from "axios";
import store from "../redux/store";
import { refreshAccessToken, removeTokens } from "../redux/useSlice/tokenSlice";

// Tạo instance của axios
const baseUrl = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho các yêu cầu
baseUrl.interceptors.request.use((config) => {
  const token = store.getState().token.accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor cho các phản hồi lỗi
// baseUrl.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Kiểm tra nếu lỗi là 401 và yêu cầu chưa được retry
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = store.getState().token.refreshToken;

//       // Gọi API để làm mới token
//       try {
//         const response = await baseUrl.post(
//           "/auth/refresh",
//           {},
//           {
//             headers: {
//               "Authorization": `Bearer ${refreshToken}`,
//             },
//           }
//         );

//         // Cập nhật access token trong Redux store
//         store.dispatch(refreshAccessToken(response.data.AT));

//         // Cập nhật header Authorization với access token mới
//         baseUrl.defaults.headers.common['Authorization'] = `Bearer ${response.data.AT}`;

//         // Retry yêu cầu gốc với token mới
//         return baseUrl(originalRequest);
//       } catch (refreshError) {
//         // Xử lý lỗi khi làm mới token (đăng xuất hoặc thông báo lỗi)
//         console.error("Refresh token error", refreshError);
//         store.dispatch(removeTokens()); // Xóa token và đăng xuất
//         window.location.href = "/login"; // Redirect đến trang đăng nhập
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default baseUrl;
