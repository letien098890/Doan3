import { Button, Table, Form, Row, Col, Input } from "antd";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Item from "antd/lib/list/Item";
import FormBill from "./formbill";

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

const ListBill = (props) => {
  const [form] = Form.useForm();

  const [bills, setBills] = useState([]);
  const [total, setTotal] = useState(0);
  const [total1, setTotal1] = useState(0);
  const [inforProduct, setInforProduct] = useState([]);
  const billsCollectionRef = collection(db, "Bill");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  useEffect(() => {
    let data1 = [];
    const unSub = onSnapshot(billsCollectionRef, (data) => {
      data.docs.map((doc, index) => {
        let a = doc.data();
        console.log(a);
        data1?.push({
          id: doc?.id,
          stt: index + 1,
          name: a?.name,
          datetime:
            a.hasOwnProperty("datetime") && a?.datetime !== null
              ? formatDate(a?.datetime)
              : "",
          // datetime: a.hasOwnProperty("datetime")
          //   ? moment(a?.datetime?.toDate()).format("MM DD YYYY")
          //   : "",
          // datetime: a.datetime,
          phone: a?.phone,
          dc: a?.dc,
          CartQty: a?.CartQty,
          CartPrice: a?.CartPrice,
          quantity: a?.quantity,
          product: a.hasOwnProperty("product") ? a?.product : [],
        });
      });
      if (data1) {
        setBills(data1);
        setTotal(data1.reduce((a, b) => a + +b.CartPrice, 0));
        setTotal1(data1.reduce((x, y) => x + +y.quantity, 0));
      }
    });
    return () => unSub();
  }, []);
  console.log("to to`", total);
  console.log("to to`", total1);
  const showChiTiet = (e, id) => {
    // e.preventDefault();
    const currentProduct = bills.find((item) => item.id === id);
    setInforProduct(currentProduct);
    setIsModalVisible(true);
    debugger;
  };

  const columns = [
    { title: "STT", dataIndex: "stt", width: 50 },
    {
      title: "Tên Khách Hàng",
      width: 100,
      render: (record) => <>{record?.name ? record.name : "Chưa cập nhật"}</>,
    },
    {
      title: "Ngày Và Giờ",
      width: 70,
      render: (record) => <>{record.datetime}</>,
    },
    {
      title: "Số Điện Thoại",
      width: 70,
      render: (record) => <>{record?.phone ? record.phone : "Chưa cập nhật"}</>,
    },
    // { title: "Địa Chỉ", dataIndex: "dc" },
    {
      title: "Tổng Món",
      width: 50,
      render: (record) => (
        <> {record.product?.length > 0 && record?.product[0]?.quantity}</>
      ),
    },
    {
      title: "Tổng Tiền",
      width: 100,
      render: (record) => (
        <>
          {" "}
          {record.CartPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}{" "}
        </>
      ),
    },
    {
      title: "Sản Phẩm",
      width: 100,
      render: (record) => (
        <>
          {" "}
          {record.product?.length > 0 &&
            record?.product?.map((item) => item.name)?.join(",")}{" "}
        </>
      ),
    },
    // {
    //   title: "",
    //   render: (record) => (
    //     <Button type="primary" onClick={(e) => showChiTiet(e, record.id)}>
    //       In Hoá Đơn
    //     </Button>
    //   ),
    // },
  ];
  let history = useHistory();
  return (
    <>
      <Form {...layout}>
        <Row>
          <Col span={12}>
            <Form.Item label="Tổng Tiền Các Bill">
              <br></br>
              <h1 style={{ color: "red" }}>
                {total.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h1>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tổng Số Lượng Sản Phẩm Bán Ra:">
              <br></br>
              <h1 style={{ color: "red" }}>{total1}</h1>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {bills.length > 0 && <Table dataSource={bills} columns={columns} />}{" "}
      <FormBill
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        inforProduct={inforProduct}
      />
    </>
  );
  // console.log(bills);
  // return <>{bills.length > 0 ? bills[0].name : null}</>;
};
export default ListBill;
