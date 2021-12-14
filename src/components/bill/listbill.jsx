import { Button, Table } from "antd";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
import moment from "moment";

const ListBill = (props) => {
  const [bills, setBills] = useState([]);
  const billsCollectionRef = collection(db, "Bill");

  useEffect(() => {
    let data1 = [];
    const unSub = onSnapshot(billsCollectionRef, (data) => {
      data.docs.map((doc, index) => {
        let a = doc.data();
        console.log(a);
        data1?.push({
          stt: index + 1,
          name: a?.name,
          datetime: a.hasOwnProperty("datetime")
            ? moment(a?.datetime?.toDate()).format("MMM Do YY")
            : "",
          phone: a?.phone,
          dc: a?.dc,
          CartQty: a?.CartQty,
          CartPrice: a?.CartPrice,
          products: a.hasOwnProperty("products") ? a?.products : [],
        });
      });
      if (data1) {
        setBills(data1);
      }
    });
    return () => unSub();
  }, []);
  const columns = [
    { title: "STT", dataIndex: "stt" },
    {
      title: "Tên Khách Hàng",
      render: (record) => <a href={`/bill/${record.id}`}>{record.name}</a>,
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
        <> {record.products.length > 0 && record?.products?.join(",")} </>
      ),
    },
  ];
  let history = useHistory();
  return (
    <>{bills.length > 0 && <Table dataSource={bills} columns={columns} />}</>
  );
  // console.log(bills);
  // return <>{bills.length > 0 ? bills[0].name : null}</>;
};
export default ListBill;
