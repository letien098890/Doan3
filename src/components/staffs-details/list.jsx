import { Button, Table } from "antd";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";

// const columns = [
//   { title: "ID", field: "id", editable: false },
//   { title: "Tên", field: "name" },
//   { title: "Năm sinh", field: "yearofbirth" },
//   { title: "Giới tính", field: "gioitinh" },
//   { title: "Phone Number", field: "SDT" },
//   { title: "Địa Chỉ", field: "diachi" },
//   { title: "Chức Vụ", field: "chucvu" },
// ];

const ListStaffs = (props) => {
  const [Users, setStaffs] = useState([]);
  const UsersCollectionRef = collection(db, "users");
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const unSub = onSnapshot(UsersCollectionRef, (data) => {
      setStaffs(
        data.docs.map((doc, index) => ({
          ...doc.data(),
          id: doc.id,
          stt: index + 1,
        }))
      );
    });
    // const getStaffs = async () => {
    //   const data = await getDocs(staffsCollectionRef);

    //   setStaffs(
    //     data.docs.map((doc, index) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //       stt: index + 1,
    //     }))
    //   );
    // };

    // getStaffs();

    return () => unSub();
  }, []);
  const deleteStaff = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  const columns = [
    { title: "STT", dataIndex: "stt" },
    // { title: "ID", dataIndex: "id" },
    {
      title: "Tên Tài Khoản",
      render: (record) => <a href={`/staff/${record.id}`}>{record.FullName}</a>,
    },
    {
      title: "Năm sinh",
      render: (record) => (
        <>{record?.yearOfBirth ? record.yearOfBirth : "Chưa cập nhật"}</>
      ),
      // dataIndex: "yearOfBirth"
    },
    { title: "Giới tính", dataIndex: "gioitinh" },
    { title: "Phone Number", dataIndex: "sdt" },
    {
      title: "Dịa Chỉ",
      render: (record) => <>{record.diachi}</>,
    },
    // {
    //   title: "Tổng Tiền",
    //   render: (record) => (
    //     <> {parseInt(record.sogio ? record.sogio : 0 * 10000)} </>
    //   ),
    // },
    { title: "Vai Trò", dataIndex: "chucvu" },
    {
      title: "",
      render: (record) => (
        <Button
          type="primary"
          onClick={() => {
            deleteStaff(record.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  {
    /* <span>delete {record.id}</span> */
  }
  let history = useHistory();
  return (
    <>
      <Button
        onClick={() => history.push("/staff/new")}
        type="primary"
        size={"large"}
        style={{ float: "right" }}
      >
        Them Nhan Vien
      </Button>

      {Users && <Table dataSource={Users} columns={columns} />}
    </>
  );
};
export default ListStaffs;
