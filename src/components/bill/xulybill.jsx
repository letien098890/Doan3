/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import FormBill from "./formbill";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const XulyBill = (props) => {
  // debugger;
  const param = props.match.params.id;
  const [bills, setBills] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const billsCollectionRef = collection(db, "Bill");
  const history = useHistory();

  useEffect(() => {
    if (param !== "new") {
      //TODO
      const getBills = async () => {
        const data = await getDocs(billsCollectionRef);
        const dataInit = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBills(dataInit.find((item) => item.id === param));
        setIsEdit(true);
      };

      getBills();
      //setbills
    }
  }, [props.match.params.id]);

  const updatebill = async (values) => {
    await updateDoc(doc(db, "Bill", bills.id), values);
  };

  // const createStaff = async (values) => {
  //   await addDoc(billsCollectionRef, values);
  // };

  const onFinish = async (values) => {
    // debugger;
    if (isEdit) {
      await updatebill(values);
    } else {
      // // create
      // await createStaff(values);
    }

    history.push("/bill");
  };
  return (
    <>
      <FormBill isEdit={isEdit} bills={bills} onFinish={onFinish} />
    </>
  );
};
XulyBill.propTypes = {
  props: PropTypes.any,
};
export default XulyBill;
