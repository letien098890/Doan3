/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Modal } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Select } from "antd";

const TrangThai = (props) => {
  const showModal = () => {
    props.setIsModalVisible(true);
  };

  const handleOk = () => {
    props.updatetrangthai(props.inforProduct);
    props.setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
    props.setValue(value);
  }

  // const menu = (
  //   <Menu>
  //     <Menu.Item key="0">
  //       <a>Đã Giao Hàng</a>
  //     </Menu.Item>
  //     <Menu.Item key="1">
  //       <a>Đang Giao Hàng</a>
  //     </Menu.Item>
  //     <Menu.Item key="3">
  //       <a>Đã Huỷ Đơn</a>
  //     </Menu.Item>
  //   </Menu>
  // );
  console.log(props.inforProduct);
  return (
    <>
      <Modal
        title="Cập Nhật Trạng Thái Đơn Hàng"
        visible={props.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Trạng Thái hiện Tại: {props.inforProduct.trangthai}</h3>
        {/* <Dropdown overlay={menu} trigger={["click"]}>
          <a
            className="ant-dropdown-link"
          >
            Cập Nhật <DownOutlined />
          </a>
        </Dropdown> */}
        <Select
          defaultValue="Chọn"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="Đã Giao Hàng">Đã Giao Hàng</Option>
          <Option value="Đang Giao Hàng">Đang Giao Hàng</Option>
          <Option value="Đã Huỷ Đơn">Đã Huỷ Đơn</Option>
        </Select>
      </Modal>
    </>
  );
};
export default TrangThai;
