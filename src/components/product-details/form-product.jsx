/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
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
const FormProducts = (props) => {
  console.log("infor", props);

  const [formptoduct] = Form.useForm();

  const history = useHistory();

  useEffect(() => {
    formptoduct.resetFields();
  }, [props.infoProduct]);

  return (
    <>
      <Form
        {...layout}
        initialValues={props.infoProduct}
        form={formptoduct}
        onFinish={props.onFinish}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name={"name"}
              label="Tên Sản Phẩm"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"loai"} label="Loại" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name={"gia"} label="Giá" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"hinhanh"}
              label="Hình Ảnh"
              rules={[{ required: true }]}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name={"mota"} label="Mô Tả" rules={[{ required: true }]}>
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
              <Button type="primary" onClick={() => history.push("/products")}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default FormProducts;
