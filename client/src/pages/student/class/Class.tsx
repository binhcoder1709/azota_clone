import { Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import AddClassForm from "./class_items/AddClassForm";

export default function Class() {
  return (
    <>
      <div className="w-full p-2">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Danh sách lớp học</h1>
          <div>
            <AddClassForm btn={<Button>Tham gia lớp học</Button>} />
          </div>
        </div>
        <div className="flex gap-2 class-list">
          <Link to={""} className="bg-gray-200 p-2">
            <h2>Lớp học: IT7 - K13</h2>
            <h3>Số thành viên: 50</h3>
            <h3>Giáo viên: Tạ Văn Bình</h3>
          </Link>
          <Link to={""} className="bg-gray-200 p-2">
            <h2>Lớp học: IT7 - K13</h2>
            <h3>Số thành viên: 50</h3>
            <h3>Giáo viên: Tạ Văn Bình</h3>
          </Link>
        </div>
      </div>
    </>
  );
}
