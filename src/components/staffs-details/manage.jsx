/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormStaffs from "./form-staff";
import { db } from "../../firebase-config";
import { collection, getDocs, updateDoc } from "firebase/firestore";

const Manage = (props) => {
  debugger;
  const param = props.match.params.id;
  const [infoStaff, setInfoStaff] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const staffsCollectionRef = collection(db, "staffs");

  useEffect(() => {
    if (param !== "new") {
      //TODO
      const getStaffs = async () => {
        const data = await getDocs(staffsCollectionRef);
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

  const onFinish = (values) => {
    // debugger;
    console.log("Success:", values);
  };
  return (
    <>
      <FormStaffs isEdit={isEdit} infoStaff={infoStaff} onFinish={onFinish} />
    </>
  );
};
Manage.propTypes = {
  props: PropTypes.any,
};
export default Manage;
