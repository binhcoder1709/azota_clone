import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import DropdownHover from "../../../components/DropdownHover";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { removeTokens } from "../../../redux/useSlice/tokenSlice";
import ModalConfirm from "../../../components/Modal";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = (): void => {
    dispatch(removeTokens());
  };
  const dropdownItems = [
    {
      key: "1",
      label: <Link to={"#"}>Thông tin cá nhân</Link>,
    },
    {
      key: "2",
      label: <Link to={"#"}>Cài đặt</Link>,
    },
    {
      key: "3",
      label: <Link to={"#"}>Đổi mật khẩu</Link>,
    },
    {
      key: "4",
      danger: true,
      label: (
        <ModalConfirm
          handleOk={handleLogout}
          btnItem={<button>Đăng xuất</button>}
          item={<p>Bạn có thực sự muốn đăng xuất không?</p>}
          title="Đăng xuất"
        />
      ),
    },
  ];

  return (
    <div className="top-bar">
      <div className="flex w-full space-b">
        <div />
        <div className="flex item-center">
          <div className="dropdows header-account mr-4">
            <DropdownHover
              itemHover={<Avatar size={"large"} icon={<UserOutlined />} />}
              items={dropdownItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
