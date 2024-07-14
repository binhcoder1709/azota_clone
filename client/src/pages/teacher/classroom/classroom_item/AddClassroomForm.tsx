import React, { useState } from "react";
import { Button, Input, Modal, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import baseUrl from "../../../../apis/axios";

const AddClassroomForm: React.FC<{ fetchData: () => void }> = ({
  fetchData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classroomName, setClassroomName] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const formattedClassroomName = classroomName.trim().toUpperCase();

    if (formattedClassroomName) {
      try {
        await baseUrl.post("/classroom/create", {
          name: formattedClassroomName,
        });
        message.success("Lớp học đã được tạo thành công!");
        setClassroomName("");
        fetchData(); // Gọi hàm fetchData để cập nhật danh sách lớp học
      } catch (error) {
        console.error(error);
        message.error("Đã xảy ra lỗi khi tạo lớp học!");
      } finally {
        setIsModalOpen(false);
      }
    } else {
      message.warning("Vui lòng nhập tên lớp học.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassroomName(e.target.value);
  };

  return (
    <>
      <Button onClick={showModal}>Tạo lớp học</Button>
      <Modal
        title="Tạo lớp học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Input
          placeholder="Nhập tên lớp học"
          value={classroomName}
          onChange={handleChange}
        />
      </Modal>
    </>
  );
};

export default AddClassroomForm;
