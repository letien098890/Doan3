import { Button, Table } from "antd";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Item from "antd/lib/list/Item";
import FormBill from "./formbill";
import TrangThai from "./trangthai";
import { string } from "prop-types";

const ListBill1 = (props) => {
  const [bills, setBills] = useState([]); //getset
  const [inforProduct, setInforProduct] = useState([]);
  const billsCollectionRef = collection(db, "Bill");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState();
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
          // datetime: a.hasOwnProperty("datetime")
          //   ? CovertDate(a?.datetime.toString())
          //   : "",
          phone: a?.phone,
          dc: a?.dc,
          CartQty: a?.CartQty,
          trangthai: a?.trangthai,
          CartPrice: a?.CartPrice,
          product: a.hasOwnProperty("product") ? a?.product : [],
        });
      });
      if (data1) {
        console.log("data", data);
        setBills(data1);
      }
    });

    return () => unSub();
  }, []);
  const CovertDate = (date) => {
    if (date.toString().includes("Timestamp")) {
      console.log("a", a);
      return moment(a?.datetime?.toDate()).format("MM/DD/YYYY");
    } else {
      return moment(a?.datetime).format("MM/DD/YYYY");
    }
  };
  const updatetrangthai = async (a1) => {
    debugger;
    console.log("a1", a1);
    a1.trangthai = value;
    a1.datetime = new Date();
    debugger;
    await updateDoc(doc(db, "Bill", a1.id), a1);
    window.location.pathname = "/";
  };
  const showChiTiet = (e, id) => {
    // e.preventDefault();
    const currentProduct = bills.find((item) => item.id === id);
    setInforProduct(currentProduct);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "STT", dataIndex: "stt" },
    {
      title: "Tên Khách Hàng",
      render: (record) => <>{record.name}</>,
    },
    {
      title: "Ngày Và Giờ",
      render: (record) => <>{record?.datetime}</>,
    },
    {
      title: "Số Điện Thoại",
      render: (record) => <>{record.phone}</>,
    },
    // { title: "Địa Chỉ", dataIndex: "dc" },
    {
      title: "Tổng Món",
      render: (record) => <>{record.CartQty}</>,
    },
    {
      title: "Tổng Tiền",
      render: (record) => <> {parseInt(record.CartPrice)} VNĐ</>,
    },
    {
      title: "Trạng Thái",
      // render: (record) => <> {record.trangthai} </>,
      render: (record) => (
        <a href={`/trangthai/${record.id}`}>{record.trangthai}</a>
      ),
    },
    // {
    //   title: "Sản Phẩm",
    //   render: (record) => (
    //     <>
    //       {" "}
    //       {record.product?.length > 0 &&
    //         record?.product?.map((item) => item.name)?.join(",")}{" "}
    //     </>
    //   ),
    // },
    {
      title: "",
      render: (record) => (
        <Button type="primary" onClick={(e) => showChiTiet(e, record.id)}>
          Cập Nhật Trạng Thái
        </Button>
      ),
    },
  ];
  let history = useHistory();
  return (
    <>
      {bills.length > 0 && <Table dataSource={bills} columns={columns} />}{" "}
      <TrangThai
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        inforProduct={inforProduct}
        updatetrangthai={updatetrangthai}
        value={value}
        setValue={setValue}
      />
    </>
  );
  // console.log(bills);
  // return <>{bills.length > 0 ? bills[0].name : null}</>;
};
export default ListBill1;
