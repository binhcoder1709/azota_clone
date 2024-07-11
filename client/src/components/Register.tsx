import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

// tạo interface cho form validation
interface FormValue {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// tạo interface cho dữ liệu gửi về api register
export interface IRegister {
  userName: string;
  email: string;
  password: string;
  role: number;
}

// Xác định schema xác thực
const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Tên người dùng là bắt buộc")
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
    .max(20, "Tên người dùng không được quá 20 ký tự"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const Register: FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<FormValue>({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const data: IRegister = {
        userName: values.userName,
        email: values.email,
        password: values.password,
        role: 1,
      };
    },
  });

  return (
    <div className="font-[sans-serif] text-[#333] bg-gray-50 flex items-center md:h-screen p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white grid md:grid-cols-2 lg:gap-24 gap-16 w-full sm:p-8 p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded overflow-hidden">
          {/* Bên trái */}
          <div className="max-md:order-1 space-y-6">
            <div className="md:mb-16 mb-8">
              <h3 className="text-2xl font-bold">Hoặc đăng ký bằng</h3>
            </div>
            <div className="space-y-6">
              {/* Nút đăng ký bằng Facebook */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-center rounded text-white text-base tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0 mr-4"
                  viewBox="0 0 167.657 167.657"
                >
                  <path
                    d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                    data-original="#010002"
                  />
                </svg>
                Đăng ký bằng Facebook
              </button>
              {/* Nút đăng ký bằng Google */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-center rounded text-[#333] text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0 mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
                Đăng ký bằng Google
              </button>
              {/* Nút đăng ký bằng GitHub */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-center rounded text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0 mr-4"
                  viewBox="0 0 22.773 22.773"
                >
                  <path
                    d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.649.927h-.432c-1.405-.222-2.177-1.332-3.036-2.361-1.017-1.161-1.654-2.484-2.106-3.894-.586-1.875-.796-3.815-.398-5.795.346-1.706 1.1-3.156 2.198-4.475.563-.681 1.072-.892 1.952-.465.757.352 1.458.818 2.159 1.259 1.22.744 2.475.795 3.768.211.572-.261 1.073-.65 1.635-.927 1.559-.742 3.116-.721 4.671.053 1.574.789 2.499 2.063 3.06 3.701.8 2.358.771 4.704-.021 7.034zm-9.89-1.129c-.018-1.174-.34-2.178-.861-3.123-.245-.446-.529-.874-.84-1.275-.165-.211-.505-.573-.514-.497-.048.414.214.718.395 1.041.399.732.826 1.455 1.111 2.236.287.786.459 1.623.317 2.47-.09.544-.438 1.015-.337 1.552.326-.011.632-.241.937-.377.188-.086.368-.19.532-.308.221-.16.384-.361.46-.613.095-.307.136-.629.138-.963z"
                    data-original="#231f20"
                  />
                </svg>
                Đăng ký bằng GitHub
              </button>
            </div>
          </div>

          {/* Bên phải */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Đăng ký tài khoản</h2>
            <form onSubmit={formik.handleSubmit}>
              {/* Trường tên người dùng */}
              <div className="mb-6">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên người dùng
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.userName}
                  </div>
                ) : null}
              </div>
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
                  type="email"
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
              {/* Trường xác nhận mật khẩu */}
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              {/* Nút gửi form */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded focus:outline-none focus:shadow-outline"
              >
                Đăng ký
              </button>
              <span className="text-black">
                Đã có tài khoản?{" "}
                <Link to={"/login"} className="text-blue-700">
                  Đăng nhập ngay
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
