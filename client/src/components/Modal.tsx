import React, { useState } from "react";
import { Modal } from "antd";

interface Props {
  handleOk: () => void;
  btnItem: React.ReactNode;
  item: React.ReactNode;
  title: string;
}

const ModalConfirm: React.FC<Props> = (prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>{prop.btnItem}</div>
      <Modal
        title={prop.title}
        open={isModalOpen}
        onOk={() => prop.handleOk()}
        onCancel={handleCancel}
      >
        {prop.item}
      </Modal>
    </>
  );
};

export default ModalConfirm;
