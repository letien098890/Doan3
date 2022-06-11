import { Button, Table } from "antd";
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

const Doanhthu = (props) => {
  const [Users, setStaffs] = useState([]);
  const UsersCollectionRef = collection(db, "QRCode");
  //   const q = query(UsersCollectionRef, where("chucvu", "==", "Staff"));
  useEffect(() => {
    const unSub = onSnapshot(UsersCollectionRef, (data) => {
      console.log(data);
      setStaffs(
        data.docs.map((doc, index) => ({
          ...doc.data(),
          id: doc.id,
          //   stt: index + 1,
        }))
      );
    });
    return () => unSub();
  }, []);
  const columns = [
    { title: "Id QR code", dataIndex: "id" },
    {
      title: "Thời gian tạo QR",
      dataIndex: "datetime",
      //   render: (record) => (
      //     <a href={`/salary/${record.id}`}>{record.FullName}</a>
      //   ),
    },
    { title: "Tên Khách Hàng", dataIndex: "name" },
    // { title: "Giới tính", dataIndex: "gioitinh" },
    { title: "Số Điện Thoại Khách", dataIndex: "phone" },
    { title: "Ly đã thanh toán", dataIndex: "quantity" },
    { title: "Ly đã khuyến mãi", dataIndex: "lyKhuyenMai" },
  ];
  {
    /* <span>delete {record.id}</span> */
  }
  let history = useHistory();
  return (
    <>
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
export default Doanhthu;
