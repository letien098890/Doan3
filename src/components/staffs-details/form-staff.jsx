/* eslint-disable react/prop-types */
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
const FormStaffs = (props) => {
  console.log("infor", props);

  const [form] = Form.useForm();
  const [staffs, setStaffs] = useState([]);
  const staffsCollectionRef = collection(db, "staffs");
  const [newName, setNewName] = useState("");
  const [newYearofbirth, setYearofbirth] = useState(0);
  const [newGioitinh, setGioitinh] = useState("");
  const [newSDT, setSDT] = useState("");
  const [newDiachi, setDiachi] = useState("");
  const [newChucvu, setChucvu] = useState("");
  const history = useHistory();

  useEffect(() => {
    form.resetFields();
  }, [props.infoStaff]);

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={props.infoStaff}
        form={form}
        onFinish={props.onFinish}
      >
        <Form.Item
          name={"name"}
          label="Name"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"yearofbirth"}
          label="Year of Birth"
          onChange={(event) => {
            setYearofbirth(event.target.value);
          }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"gioitinh"}
          label="Gioi Tinh"
          onChange={(event) => {
            setGioitinh(event.target.value);
          }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"sdt"}
          label="SDT"
          onChange={(event) => {
            setSDT(event.target.value);
          }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"diachi"}
          label="Dia Chi"
          onChange={(event) => {
            setDiachi(event.target.value);
          }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"chucvu"}
          label="Chuc Vu"
          onChange={(event) => {
            setChucvu(event.target.value);
          }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{}}
            // onClick={props.isEdit ? updateStaff : createStaff}
          >
            {props.isEdit ? "Cập nhật" : "Thêm"}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => history.push("/staffs")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormStaffs;
