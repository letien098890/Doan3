/* eslint-disable react/jsx-key */
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import ListStaffs from "../components/staffs-details/list";

function App() {
  const [newName, setNewName] = useState("");
  const [newYearofbirth, setYearofbirth] = useState(0);
  const [newGioitinh, setGioitinh] = useState("");
  const [newSDT, setSDT] = useState("");
  const [newDiachi, setDiachi] = useState("");
  const [newChucvu, setChucvu] = useState("");

  // const [staffs, setStaffs] = useState([]);
  // const staffsCollectionRef = collection(db, "staffs");

  // const createStaff = async () => {
  //   await addDoc(staffsCollectionRef, {
  //     name: newName,
  //     yearofbirth: Number(newYearofbirth),
  //     gioitinh: newGioitinh,
  //     sdt: Number(newSDT),
  //     diachi: newDiachi,
  //     chucvu: newChucvu,
  //   });
  // };

  const deleteStaff = async (id) => {
    const userDoc = doc(db, "staffs", id);
    await deleteDoc(userDoc);
  };

  // useEffect(() => {
  //   const getStaffs = async () => {
  //     const data = await getDocs(staffsCollectionRef);

  //     setStaffs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getStaffs();
  // }, []);

  return (
    <div className="App">
      <ListStaffs />
      {/* <input
        placeholder="Nhập Tên..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <p />
      {""}
      <input
        type="number"
        placeholder="Nhập Năm Sinh..."
        onChange={(event) => {
          setYearofbirth(event.target.value);
        }}
      />
      <p />
      <input
        placeholder="Nhập Giới Tính..."
        onChange={(event) => {
          setGioitinh(event.target.value);
        }}
      />
      <p />
      <input
        type="number"
        placeholder="Nhập SDT..."
        onChange={(event) => {
          setSDT(event.target.value);
        }}
      />
      <p />
      <input
        placeholder="Nhập Địa Chỉ..."
        onChange={(event) => {
          setDiachi(event.target.value);
        }}
      />
      <p />
      <input
        placeholder="Nhập Chức Vụ..."
        onChange={(event) => {
          setChucvu(event.target.value);
        }}
      />
      <p />
      {""} */}

      {/* <button onClick={createStaff}> Thêm Nhân Viên</button>
      
      <button onClick={createStaff}> Create Staff</button>
      {staffs.map((staff) => {
        return (
          <div>
            {" "}
            <button
              onClick={() => {
                deleteStaff(staff.id);
              }}
            >
              {" "}
              Delete Staff
            </button>
          </div>
        );
      })} */}
    </div>
  );
}

export default App;
