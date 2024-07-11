import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';

interface Props
{
    btn:React.ReactNode
}

const AddClassForm: React.FC<Props> = ({btn}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>
        {btn}
      </div>
      <Modal title="Tham gia lớp học" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder='Mã lớp học'/>
      </Modal>
    </>
  );
};

export default AddClassForm;