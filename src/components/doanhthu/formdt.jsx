/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 24 },
};
const FormDT = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    form.resetFields();
  }, [props.infoStaff]);

  return (
    <>
      <Form
        {...layout}
        initialValues={props.infoStaff}
        form={form}
        onFinish={props.onFinish}
      >
        <Row>
          <Col span={16}>
            <Form.Item
              name={"thu"}
              label="Tổng Thu Sản Phẩm Bán Ra"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item
              name={"Chiluong"}
              label="Chi Lương Nhân Viên"
              // onChange={(event) => {
              //   setYearofbirth(event.target.value);
              // }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              name={"Chisp"}
              label="Chi Phí Vốn Sản Phẩm "
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"Chiphikhac"}
              label="Chi Phí Khác"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "5px" }}
              >
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
              <Button type="primary" onClick={() => history.push("/turnover")}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default FormDT;
