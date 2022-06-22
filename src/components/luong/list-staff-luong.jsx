import { Button, Table, Form, Row, Col, Input } from "antd";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const ListSalary = (props) => {
  const [total, setTotal] = useState(0);
  const [Users, setStaffs] = useState([]);
  const UsersCollectionRef = collection(db, "users");
  const q = query(UsersCollectionRef, where("chucvu", "==", "Staff"));
  useEffect(() => {
    let data1 = [];
    const unSub = onSnapshot(q, (data) => {
      console.log(data);
      data.docs.map((doc, index) => {
        let a = doc.data();
        console.log("a", a);

        data1?.push({
          id: doc?.id,
          sogio: a?.sogio,
          luongcoban: a?.luongcoban,
        });
      });
      if (data1) {
        setTotal(data1.reduce((a, b) => a + +(b.sogio * b.luongcoban), 0));
      }

      setStaffs(
        data.docs.map((doc, index) => ({
          ...doc.data(),
          id: doc.id,
          stt: index + 1,
        }))
      );
    });
    return () => unSub();
  }, []);

  const columns = [
    { title: "STT", width: 50, dataIndex: "stt" },
    {
      title: "Tên Nhân Viên",
      width: 150,
      render: (record) => (
        <a href={`/salary/${record.id}`}>{record.FullName}</a>
      ),
    },
    // { title: "Năm sinh", dataIndex: "yearOfBirth" },
    // { title: "Giới tính", dataIndex: "gioitinh" },
    // { title: "Phone Number", dataIndex: "sdt" },
    {
      title: "Số Giờ",
      width: 30,
      render: (record) => <>{record.sogio}</>,
    },
    {
      title: "Lương Cơ Bản",
      width: 170,

      render: (record) => (
        <>
          {" "}
          {parseInt(record.luongcoban).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
    },
    { title: "Vai Trò", width: 50, dataIndex: "chucvu" },
    {
      title: "Tổng Tiền",
      width: 100,
      render: (record) => (
        <>
          {" "}
          {parseInt(record.sogio * record.luongcoban).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
    },
    {
      title: "Ca",
      width: 100,
      dataIndex: "ca",
    },
    {
      title: "Lịch Trực (Thứ)",
      width: 200,
      dataIndex: "thu",
    },
    {
      title: "Xe( Cửa Hàng Con) Số:",
      width: 100,
      dataIndex: "xe",
    },
  ];
  {
    /* <span>delete {record.id}</span> */
  }
  let history = useHistory();

  return (
    <>
      <Form {...layout}>
        <Row>
          <Col span={24}>
            <Form.Item label="Tổng Tiền Lương Chi Nhân Viên:">
              <br></br>
              <h1 style={{ color: "red" }}>
                {total.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h1>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Thời Gian Làm Việc Của Ca"></Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Ca Làm Việc 1: 7h-12 / CA 5 Giờ"> </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Ca Làm Việc 1: 7h-12 / CA 5 Giờ"></Form.Item>
          </Col>
        </Row>
      </Form>
      {/* <Button
        onClick={() => history.push("/staff/new")}
        type="primary"
        size={"large"}
        style={{ float: "right" }}
      >
        Them Nhan Vien
      </Button> */}

      {Users && <Table dataSource={Users} columns={columns} />}
    </>
  );
};
export default ListSalary;
