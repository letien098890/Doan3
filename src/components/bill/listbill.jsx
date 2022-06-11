import { Button, Table } from "antd";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Item from "antd/lib/list/Item";
import FormBill from "./formbill";

const ListBill = (props) => {
  const [bills, setBills] = useState([]);
  const [inforProduct, setInforProduct] = useState([]);
  const billsCollectionRef = collection(db, "Bill");
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          datetime: a.hasOwnProperty("datetime")
            ? moment(a?.datetime?.toDate()).format("MM DD YYYY")
            : "",
          // datetime: a.datetime,
          phone: a?.phone,
          dc: a?.dc,
          CartQty: a?.CartQty,
          CartPrice: a?.CartPrice,
          product: a.hasOwnProperty("product") ? a?.product : [],
        });
      });
      if (data1) {
        setBills(data1);
      }
    });
    return () => unSub();
  }, []);
  const showChiTiet = (e, id) => {
    // e.preventDefault();
    const currentProduct = bills.find((item) => item.id === id);
    setInforProduct(currentProduct);
    setIsModalVisible(true);
    debugger;
  };

  const columns = [
    { title: "STT", dataIndex: "stt" },
    {
      title: "Tên Khách Hàng",
      render: (record) => <>{record.name}</>,
    },
    {
      title: "Ngày Và Giờ",
      render: (record) => <>{record.datetime}</>,
    },
    {
      title: "Số Điện Thoại",
      render: (record) => <>{record.phone}</>,
    },
    { title: "Địa Chỉ", dataIndex: "dc" },
    {
      title: "Tổng Món",
      render: (record) => <>{record.CartQty}</>,
    },
    {
      title: "Tổng Tiền",
      render: (record) => <> {parseInt(record.CartPrice)} </>,
    },
    {
      title: "Sản Phẩm",
      render: (record) => (
        <>
          {" "}
          {record.product?.length > 0 &&
            record?.product?.map((item) => item.name)?.join(",")}{" "}
        </>
      ),
    },
    {
      title: "",
      render: (record) => (
        <Button type="primary" onClick={(e) => showChiTiet(e, record.id)}>
          In Hoá Đơn
        </Button>
      ),
    },
  ];
  let history = useHistory();
  return (
    <>
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
