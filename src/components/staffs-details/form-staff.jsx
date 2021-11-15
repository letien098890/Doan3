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
const FormStaffs = (props) => {
  console.log("infor", props);

  const [form] = Form.useForm();
  // const [staffs, setStaffs] = useState([]);
  // const staffsCollectionRef = collection(db, "staffs");
  // const [newName, setNewName] = useState("");
  // const [newYearofbirth, setYearofbirth] = useState(0);
  // const [newGioitinh, setGioitinh] = useState("");
  // const [newSDT, setSDT] = useState("");
  // const [newDiachi, setDiachi] = useState("");
  // const [newChucvu, setChucvu] = useState("");
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
          <Col span={12}>
            <Form.Item
              name={"name"}
              label="Name"
              // onChange={(event) => {
              //   setNewName(event.target.value);
              // }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"yearofbirth"}
              label="Year of Birth"
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
              name={"sdt"}
              label="SDT"
              // onChange={(event) => {
              //   setSDT(event.target.value);
              // }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"diachi"}
              label="Dia Chi"
              // onChange={(event) => {
              //   setDiachi(event.target.value);
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
              name={"chucvu"}
              label="Chuc Vu"
              // onChange={(event) => {
              //   setChucvu(event.target.value);
              // }}
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
              <Button type="primary" onClick={() => history.push("/staffs")}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default FormStaffs;
