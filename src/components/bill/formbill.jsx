/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Modal } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const FormBill = (props) => {
  const showModal = () => {
    props.setIsModalVisible(true);
  };

  const handleOk = () => {
    window.print();
    props.setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };
  console.log(props.inforProduct);
  return (
    <>
      <Modal
        title="Phiếu Thanh Toán"
        visible={props.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{props.inforProduct.product.map((item) => item.name)}</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default FormBill;
