/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Modal } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./formbill.css";
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
        <h1>Lamon Coffee</h1>
        <h3>Ngày Tháng Năm : {props.inforProduct.datetime}</h3>
        <h3>Tên Khách Hàng : {props.inforProduct.name} </h3>
        <h3>Địa Chỉ Khách Hàng : {props.inforProduct.dc} </h3>
        <div class="grid-container">
          <div class="grid-item">
            <b>Tên Món</b>
          </div>
          <div class="grid-item">
            <b>Số Lượng</b>
          </div>
          <div class="grid-item">
            <b>Đơn Giá</b>{" "}
          </div>
        </div>
        <div class="grid-container">
          <div class="grid-item">
            {props.inforProduct.product?.map((item) => (
              <p>{item.name}</p>
            ))}
          </div>
          <div class="grid-item">
            {props.inforProduct.product?.map((item) => (
              <p>{item.qty}</p>
            ))}
          </div>
          <div class="grid-item">
            {props.inforProduct.product?.map((item) => (
              <p>{item.gia} VND</p>
            ))}
          </div>
        </div>
        <div class="grid-container">
          <div class="grid-item">
            <b>Tổng Món</b>
          </div>
          <div class="grid-item">{props.inforProduct.CartQty}</div>
          <div class="grid-item"> </div>
        </div>
        <div class="grid-container">
          <div class="grid-item">
            <b>Thành Tiền</b>
          </div>
          <div class="grid-item"></div>
          <div class="grid-item"> {props.inforProduct.CartPrice} VND</div>
        </div>
        <p></p>
        <h2>Cám Ơn Nhiều Nhe Bạn Đã Uống Nước Tại Lamon Coffee</h2>
      </Modal>
    </>
  );
};
export default FormBill;
