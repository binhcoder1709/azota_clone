import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to={""}>Thông tin cá nhân</Link>,
  },
  {
    key: "2",
    label: <Link to={""}>Cài đặt</Link>,
    // icon: <SmileOutlined />,
  },
  {
    key: "3",
    label: <Link to={""}>Đổi mật khẩu</Link>,
  },
  {
    key: "4",
    danger: true,
    label: <Link to={""}>Đăng xuất</Link>,
  },
];

interface Props {
  itemHover: React.ReactNode;
}

const DropdownHover: React.FC<Props> = (prop) => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>{prop.itemHover}</Space>
    </a>
  </Dropdown>
);

export default DropdownHover;
