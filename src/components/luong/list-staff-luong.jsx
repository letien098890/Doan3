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

const ListSalary = (props) => {
  const [Users, setStaffs] = useState([]);
  const UsersCollectionRef = collection(db, "users");
  const q = query(UsersCollectionRef, where("chucvu", "==", "Staff"));
  useEffect(() => {
    const unSub = onSnapshot(q, (data) => {
      console.log(data);
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
      title: "Luong Co Ban",
      width: 170,

      render: (record) => <>{record.luongcoban ? record.luongcoban : 0} VNĐ</>,
    },
    { title: "Vai Trò", width: 50, dataIndex: "chucvu" },
    {
      title: "Tổng Tiền",
      width: 100,
      render: (record) => (
        <> {parseInt(record.sogio * record.luongcoban)} VNĐ</>
      ),
    },
    {
      title: "Ca Làm Việc (1: 7h-12 và 2: 13h-17h)",
      width: 100,
      dataIndex: "ca",
    },
    {
      title: "Lịch Trực (Thứ)",
      width: 200,
      dataIndex: "thu",
    },
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
export default ListSalary;
