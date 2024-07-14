import React, { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import type { TabsProps } from "antd";
import ExcelUpload from "./Tab2";
import Tab1 from "./Tab1";

const CreateExamForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tạo thủ công",
      children: <><Tab1/></>,
    },
    {
      key: "2",
      label: "Tải lên tệp",
      disabled:true,
      children: <><ExcelUpload/></>,
    },
    {
      key: "3",
      label: "Mẫu đề thi",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <>
      <Button onClick={showModal}>Tạo bài thi</Button>
      <Modal
        title="Tạo bài thi"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Modal>
    </>
  );
};

export default CreateExamForm;
