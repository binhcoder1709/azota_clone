import React from "react";
import { Dropdown, Space, Menu } from "antd";

interface DropdownItem {
  key: string;
  label: React.ReactNode;
  danger?: boolean;
}

interface Props {
  itemHover: React.ReactNode;
  items: DropdownItem[];
}

const DropdownHover: React.FC<Props> = ({ itemHover, items }) => {
  const menuItems = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key} danger={item.danger}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menuItems} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space className="cursor-pointer">{itemHover}</Space>
      </a>
    </Dropdown>
  );
};

export default DropdownHover;