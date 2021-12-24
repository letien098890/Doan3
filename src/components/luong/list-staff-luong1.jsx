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

const ListSalary1 = (props) => {
  const [Users, setStaffs] = useState([]);
  const UsersCollectionRef = collection(db, "users");
  const q = query(UsersCollectionRef, where("chucvu", "==", "Customer"));
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
    { title: "STT", dataIndex: "stt" },
    {
      title: "Tên Khách Hàng",
      render: (record) => (
        <a href={`/salary/${record.id}`}>{record.FullName}</a>
      ),
    },
    // { title: "Năm sinh", dataIndex: "yearOfBirth" },
    // { title: "Giới tính", dataIndex: "gioitinh" },
    // { title: "Phone Number", dataIndex: "sdt" },
    // {
    //   title: "Số Giờ",
    //   render: (record) => <>{record.sogio}</>,
    // },
    // {
    //   title: "Luong Co Ban",
    //   render: (record) => <>{record.luongcoban ? record.luongcoban : 0}</>,
    // },
    // { title: "Vai Trò", dataIndex: "chucvu" },
    // {
    //   title: "",
    //   render: (record) => <></>,
    // },
    // {
    //   title: "Tổng Tiền",
    //   render: (record) => <> {parseInt(record.sogio * record.luongcoban)} </>,
    // },
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
export default ListSalary1;
