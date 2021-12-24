/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import FromLuong from "./form-luong";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const Manageluong = (props) => {
  // debugger;
  const param = props.match.params.id;
  const [infoStaff, setInfoStaff] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const UsersCollectionRef = collection(db, "users");
  const history = useHistory();

  useEffect(() => {
    if (param !== "new") {
      //TODO
      const getStaffs = async () => {
        const data = await getDocs(UsersCollectionRef);
        const dataInit = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setInfoStaff(dataInit.find((item) => item.id === param));
        setIsEdit(true);
      };

      getStaffs();
      //setInfoStaff
    }
  }, [props.match.params.id]);

  const updateStaff = async (values) => {
    debugger;
    // console.log(values);
    await updateDoc(doc(db, "users", infoStaff.id), values);
  };

  const createStaff = async (values) => {
    await addDoc(UsersCollectionRef, values);
  };

  const onFinish = async (values) => {
    // debugger;
    if (isEdit) {
      await updateStaff(values);
    } else {
      // create
      await createStaff(values);
    }

    history.push("/salary");
  };
  return (
    <>
      <FromLuong isEdit={isEdit} infoStaff={infoStaff} onFinish={onFinish} />
    </>
  );
};
Manageluong.propTypes = {
  props: PropTypes.any,
};
export default Manageluong;
