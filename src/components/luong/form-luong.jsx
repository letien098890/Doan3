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
const FormLuong = (props) => {
  console.log("infor", props);
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
          <Col span={8}>
            <Form.Item
              name={"FullName"}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={"sogio"}
              label="Số Giờ"
              // onChange={(event) => {
              //   setYearofbirth(event.target.value);
              // }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={"luongcoban"}
              label="Lương Căn Bản"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name={"chucvu"}
              label="Vai Trò"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={"ca"}
              label="Ca Làm Việc"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={"thu"}
              label="Lịch Trực"
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
              <Button type="primary" onClick={() => history.push("/salary")}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default FormLuong;
