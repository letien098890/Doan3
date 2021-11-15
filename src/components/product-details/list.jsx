import { Button, Table } from "antd";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";

const ListProducts = (props) => {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const unSub = onSnapshot(productsCollectionRef, (data) => {
      setProducts(
        data.docs.map((doc, index) => ({
          ...doc.data(),
          id: doc.id,
          stt: index + 1,
        }))
      );
    });

    return () => unSub();
  }, []);
  const deleteProduct = async (id) => {
    const userDoc = doc(db, "products", id);
    await deleteDoc(userDoc);
  };
  const columns = [
    { title: "STT", dataIndex: "stt" },
    {
      title: "Tên Sản Phẩm",
      render: (record) => <a href={`/product/${record.id}`}>{record.name}</a>,
    },
    { title: "Loại", dataIndex: "loai" },
    { title: "Giá", dataIndex: "gia" },
    { title: "Hình Ảnh", dataIndex: "hinhanh" },
    { title: "Mô Tả", dataIndex: "mota" },
    {
      title: "",
      render: (record) => (
        <Button
          type="primary"
          onClick={() => {
            deleteProduct(record.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  let history = useHistory();
  return (
    <>
      <Button
        onClick={() => history.push("/product/new")}
        type="primary"
        size={"large"}
        style={{ float: "right" }}
      >
        Thêm Sản Phẩm
      </Button>

      {products && <Table dataSource={products} columns={columns} />}
    </>
  );
};
export default ListProducts;
