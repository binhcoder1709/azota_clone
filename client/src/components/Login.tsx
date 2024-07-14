import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import baseUrl from "../apis/axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setTokens } from "../redux/useSlice/tokenSlice";

// Định nghĩa giao diện FormValue
interface FormValue {
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}
// Xác định schema xác thực
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const formik = useFormik<FormValue>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data: ILogin = {
        email: values.email,
        password: values.password,
      };

      try {
        const response = await baseUrl.post("/auth/login", data);
        dispatch(
          setTokens({
            refreshToken: response.data.RT,
            accessToken: response.data.AT,
          })
        );
        notification.success({ message: "Đăng nhập thành công" });
        if (response.data.role === 2) {
          setTimeout(() => {
            navigate("/teacher");
          }, 2000);
        }
      } catch (error) {
        notification.error({ message: "Đăng nhập thất bại" });
      }
    },
  });

  return (
    <div className="font-[sans-serif] text-[#333] bg-gray-50 flex items-center md:h-screen p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white w-full sm:p-8 p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded overflow-hidden flex flex-col md:flex-row">
          {/* Phần đăng nhập bằng các phương thức khác */}
          <div className="w-full md:w-1/2 pr-0 md:pr-4">
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold">Hoặc đăng nhập bằng</h3>
              <div className="mt-4 space-y-4">
                <button
                  type="button"
                  className="w-full px-4 py-3 flex items-center justify-center rounded text-white text-base tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700"
                >
                  Đăng nhập bằng Facebook
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 flex items-center justify-center rounded text-[#333] text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200"
                >
                  Đăng nhập bằng Google
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 flex items-center justify-center rounded text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]"
                >
                  Đăng nhập bằng GitHub
                </button>
              </div>
            </div>
          </div>

          {/* Phần đăng nhập bằng email và mật khẩu */}
          <div className="w-full md:w-1/2 pl-0 md:pl-4">
            <div>
              <h2 className="text-3xl font-bold mb-6">Đăng nhập</h2>
              <form onSubmit={formik.handleSubmit}>
                {/* Trường email */}
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                {/* Trường mật khẩu */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                {/* Nút gửi form */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded focus:outline-none focus:shadow-outline"
                >
                  Đăng nhập
                </button>
                <span className="text-black">
                  Chưa có tài khoản?{" "}
                  <Link to={"/register"} className="text-blue-700">
                    Đăng ký ngay
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
