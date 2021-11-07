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
  const [staffs, setStaffs] = useState([]);
  const staffsCollectionRef = collection(db, "staffs");
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const unSub = onSnapshot(staffsCollectionRef, (data) => {
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
    const userDoc = doc(db, "staffs", id);
    await deleteDoc(userDoc);
  };
  const columns = [
    { title: "STT", dataIndex: "stt" },
    // { title: "ID", dataIndex: "id" },
    {
      title: "Tên",
      render: (record) => <a href={`/staff/${record.id}`}>{record.name}</a>,
    },
    { title: "Năm sinh", dataIndex: "yearofbirth" },
    { title: "Giới tính", dataIndex: "gioitinh" },
    { title: "Phone Number", dataIndex: "sdt" },
    { title: "Địa Chỉ", dataIndex: "diachi" },
    { title: "Chức Vụ", dataIndex: "chucvu" },
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

      {staffs && <Table dataSource={staffs} columns={columns} />}
    </>
  );
};
export default ListStaffs;
