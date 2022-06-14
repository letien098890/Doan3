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

const Doanhthu = (props) => {
  const [total, setTotal] = useState(0);
  const [Users, setStaffs] = useState([]);
  const q = collection(db, "doanhthu");
  useEffect(() => {
    let data1 = [];
    const unSub = onSnapshot(q, (data) => {
      data.docs.map((doc, index) => {
        let a = doc.data();
        data1?.push({
          // Thu: a?.Thu,

          thu: a?.thu,
          Chiluong: a?.Chiluong,
          Chisp: a?.Chisp,
          Chiphikhac: a?.Chiphikhac,
          ten: a?.ten,
        });
      });
      if (data1) {
        setTotal(data1.reduce((a, b) => a + +b.thu, 0));
        // setTotal(data1.thu);
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
    {
      title: "",
      width: 50,
      // dataIndex: "ten",
      render: (record) => <a href={`/turnover/${record.id}`}>{record.ten}</a>,
    },

    {
      title: "Tổng Thu Sản Phẩm Bán Ra",
      // dataIndex: "Thu",
      width: 170,
      render: (record) => (
        <>
          {parseInt(record.thu).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
    },
    {
      title: "Chi Lương Nhân Viên",
      width: 30,
      render: (record) => (
        <>
          {parseInt(record.Chiluong).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
    },
    {
      title: "Chi Phí Vốn Sản Phẩm ",
      width: 30,
      render: (record) => (
        <>
          {parseInt(record.Chisp).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
    },
    {
      title: "Chi Phí Khác ",
      width: 30,
      render: (record) => (
        <>
          {parseInt(record.Chiphikhac).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
    },
    {
      title: "Tổng Doanh Thu",
      width: 100,
      render: (record) => (
        <>
          {" "}
          {parseInt(
            record.thu - record.Chisp - record.Chiluong - record.Chiphikhac
          ).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </>
      ),
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
            <Form.Item label="Tổng Doanh Thu:">
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
      </Form>
      {Users && <Table dataSource={Users} columns={columns} />}
    </>
  );
};
export default Doanhthu;
