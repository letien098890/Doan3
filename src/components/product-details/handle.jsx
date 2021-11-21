/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import FormProducts from "./form-product";
import { db, storage } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
const convertToSlug = (text) => {
  if (text === "" || text === undefined) return "";
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
const Handle = (props) => {
  const param = props.match.params.id;
  const [infoProduct, setInfoProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const productsCollectionRef = collection(db, "products");
  const history = useHistory();

  useEffect(() => {
    if (param !== "new") {
      //TODO
      const getProducts = async () => {
        const data = await getDocs(productsCollectionRef);
        const dataInit = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setInfoProduct(dataInit.find((item) => item.id === param));
        setIsEdit(true);
      };

      getProducts();
      //setinfoProduct
    }
  }, [props.match.params.id]);

  const updateProduct = async (values) => {
    const image = await storage.uploadAndGetUrl(
      values.hinhanh.file,
      convertToSlug(values.hinhanh.file.name)
    );
    values.hinhanh = image;
    await updateDoc(doc(db, "products", infoProduct.id), values);
    history.push("/products");

    // console.log(values);
  };

  const createProduct = async (values) => {
    const a = convertToSlug(values.hinhanh.file.name);
    const image = await storage.uploadAndGetUrl(
      values.hinhanh.file,
      convertToSlug(values.hinhanh.file.name)
    );
    values.hinhanh = image;
    await addDoc(productsCollectionRef, values);
  };

  const onFinish = async (values) => {
    if (isEdit) {
      await updateProduct(values);
    } else {
      // create
      await createProduct(values);
    }

    history.push("/products");
  };
  return (
    <>
      <FormProducts
        isEdit={isEdit}
        infoProduct={infoProduct}
        onFinish={onFinish}
      />
    </>
  );
};
Handle.propTypes = {
  props: PropTypes.any,
};
export default Handle;
