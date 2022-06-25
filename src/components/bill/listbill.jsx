import {
  Button,
  Table,
  Form,
  Row,
  Col,
  Input,
  Dropdown,
  DatePicker,
  Space,
  Typography,
  // Text,
  // RangePicker,
} from "antd";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase-config";
import { useHistory } from "react-router-dom";
import moment from "moment";
// import Item from "antd/lib/list/Item";
import FormBill from "./formbill";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
// import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

// import Icon from "antd/lib/icon";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div
      style={{
        padding: 8,
      }}
    >
      <Space direction="vertical" size={12}>
        <RangePicker onChange={(e) => setSelectedKeys([e])} />
      </Space>
      <Space>
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          // onClick={() => {
          //   confirm({
          //     closeDropdown: false,
          //   });
          //   setSearchText(selectedKeys[0]);
          //   setSearchedColumn(dataIndex);
          // }}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
  onFilter: (value, record) => {
    console.log("valu", value);
    console.log("Start", moment(value[0]).format("YYYY-MM-DD"));
    console.log("ré cọt", record[dataIndex]);
    console.log("End", moment(value[1]).format("YYYY-MM-DD"));

    return (
      new Date(moment(value[0]).format("YYYY-MM-DD")) <=
        new Date(record[dataIndex]) &&
      new Date(record[dataIndex]) <=
        new Date(moment(value[1]).format("YYYY-MM-DD"))
    );
  },
});
const ListBill = (props) => {
  const [form] = Form.useForm();
  const [bills, setBills] = useState([]);
  const [total, setTotal] = useState(0);
  const [Tong, setTong] = useState(0);
  const [Tong1, setTong1] = useState(0);
  const [total1, setTotal1] = useState(0);
  const [inforProduct, setInforProduct] = useState([]);
  const billsCollectionRef = collection(db, "Bill");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const componentRef = useRef();
  // const [headerText, setheaderText] = useState("Thống Kê Hoá Đơn");

  const [printHeaderVisible, setprintHeaderVisible] = useState(true);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,

    onBeforeGetContent: () => setprintHeaderVisible(true),
  });

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  useEffect(() => {
    let data1 = [];
    // db.collection("Bill")
    //   .get()
    //   .then(function (querySnapshot) {
    //     console.log("Số", querySnapshot.size);
    //   });
    const unSub = onSnapshot(billsCollectionRef, (data) => {
      data.docs.map((doc, index) => {
        let a = doc.data();
        // console.log(a);
        data1?.push({
          id: doc?.id,
          id1: a?.id,
          stt: index + 1,
          name: a?.name,
          datetime:
            a.hasOwnProperty("datetime") && a?.datetime !== null
              ? formatDate(a?.datetime)
              : "",
          // datetime: a.hasOwnProperty("datetime")
          //   ? moment(a?.datetime?.toDate()).format("MM DD YYYY")
          //   : "",
          // datetime: a.datetime,
          phone: a?.phone,
          dc: a?.dc,
          CartQty: a?.CartQty,
          CartPrice: a?.CartPrice,
          quantity: a?.quantity,
          product: a.hasOwnProperty("product") ? a?.product : [],
        });
        console.log("test", data1);
        setTong(data.size);
        setTong1(data1.id);
      });
      if (data1) {
        setBills(data1);
        setTotal(data1.reduce((a, b) => a + +b.CartPrice, 0));
        setTotal1(data1.reduce((x, y) => x + +y.quantity, 0));
      }
      // const bien = a.id1;
    });
    return () => unSub();
  }, []);
  // console.log("to to`", Tong1);
  // const showChiTiet = (e, id1) => {
  //   // e.preventDefault();
  //   const currentProduct = bills.find((item) => item.id === id);
  //   setInforProduct(currentProduct);
  //   setIsModalVisible(true);
  //   debugger;
  // };

  const columns = [
    {
      title: "STT",
      fixed: "left",
      dataIndex: "stt",
      width: 50,
      // fixed: "right",
    },
    {
      title: "Id Khách Hàng",
      width: 20,

      render: (record) => (
        <>{record?.id1 == 1 ? "Không Tích Điểm" : record.id1}</>
      ),
      // filters: [
      //   {
      //     text: "Không Tích Điểm",
      //     value: "1",
      //   },
      // ],
      // onFilter: (value, record) => record?.id.indexOf(value) === 0,
    },

    // {
    //   title: "Tên Khách Hàng",
    //   width: 70,
    //   render: (record) => <>{record?.name ? record.name : "Chưa cập nhật"}</>,
    // },
    {
      title: "Ngày Và Giờ",
      dataIndex: "datetime",
      width: 200,
      // render: (record) => <>{record.datetime}</>,
      sorter: (a, b) => a.datetime.localeCompare(b.datetime),
      ...getColumnSearchProps("datetime"),
    },
    // {
    //   title: "Số Điện Thoại",
    //   width: 70,
    //   render: (record) => <>{record?.phone ? record.phone : "Chưa cập nhật"}</>,
    // },
    // { title: "Địa Chỉ", dataIndex: "dc" },
    {
      title: "Tổng Món",
      dataIndex: "quantity",
      width: 100,

      // render: (record) => (
      //   <> {record.product?.length > 0 && record?.product[0]?.quantity}</>
      // ),
    },
    {
      title: "Tổng Tiền",
      dataIndex: "CartPrice",
      width: 100,
      // render: (record) => (
      //   <>
      //     {" "}
      //     {record.CartPrice.toLocaleString("vi-VN", {
      //       style: "currency",
      //       currency: "VND",
      //     })}{" "}
      //   </>
      // ),

      sorter: (a, b) => a.CartPrice - b.CartPrice,
    },
    {
      title: "Sản Phẩm",
      width: 120,
      render: (record) => (
        <>
          {" "}
          {record.product?.length > 0 &&
            record?.product?.map((item) => <p>{item.name}</p>)}{" "}
        </>
      ),
    },
    {
      title: "Số Lượng Món",
      width: 100,
      render: (record) => (
        <>
          {" "}
          {record.product?.length > 0 &&
            record?.product?.map((item) => <p>{item.quantity}</p>)}{" "}
        </>
      ),
    },
    // {
    //   title: "",
    //   render: (record) => (
    //     <Button type="primary" onClick={(e) => showChiTiet(e, record.id)}>
    //       In Hoá Đơn
    //     </Button>
    //   ),
    // },
  ];
  let history = useHistory();
  return (
    <>
      <div ref={componentRef}>
        <div
          style={{
            // visibility: printHeaderVisible ? "visible" : "hidden",
            textAlign: "center",
          }}
        >
          {/* <PrintHeader headerText={"headerText"} /> */}
        </div>
        <Form {...layout}>
          <Row>
            <Col span={8}>
              <Form.Item label="Tổng Tiền Các Bill">
                <br></br>
                <h1 style={{ color: "red" }}>
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h1>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tổng Số Lượng Sản Phẩm Bán Ra:">
                <br></br>
                <h1 style={{ color: "red" }}>{total1}</h1>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tổng Số Lượng Bill">
                <br></br>
                <h1 style={{ color: "Blue" }}>{Tong}</h1>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <button
                style={{ height: "30px", border: 0 }}
                className="ant-btn-primary"
                onClick={handlePrint}
              >
                <i className="fa-solid fa-print" /> In Thống Kê Bảng Dữ Liệu
              </button>
              {/* <input
              type="button"
              value="In Bảng Thống Kê"
              onclick={() => {
                window.print();
              }}
            /> */}
            </Col>
            <Col span={8}>
              <Form.Item label="Xuất Thống File Excel">
                <CSVLink
                  data={bills}
                  className="btn btn-primary"
                  filename={"Bill Report.csv"}
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Xuất File
                </CSVLink>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row>
          <Col span={24}>
            <Form.Item label="">
             
            </Form.Item>
          </Col>
        </Row> */}
        </Form>
        {bills.length > 0 && (
          <Table
            dataSource={bills}
            columns={columns}
            // scroll={{ x: 100 }}
            summary={(pageData) => {
              let totalTien = 0;
              let totalMon = 0;
              let totalproducts = [];
              pageData.forEach(({ CartPrice, quantity, product }) => {
                totalTien += CartPrice;
                totalMon += quantity;
                totalproducts.push(...product);
              });
              // console.log("all", totalproducts);

              const counts = {};

              // console.log("pro", totalproducts);
              for (const pro of totalproducts) {
                // counts[pro.name] = counts[pro.name] ? counts[pro.name] + 1 : 1;

                if (counts.hasOwnProperty(pro.name)) {
                  counts[pro.name] += pro.quantity;
                } else {
                  counts[pro.name] = pro.quantity;
                }
                // counts[pro.quantity]

                // console.log("pro", pro.quantity);
              }

              console.log("count", counts);
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell></Table.Summary.Cell>
                    <Table.Summary.Cell></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text>{totalMon}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text type="danger">
                        <h1>
                          {totalTien.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h1>
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={2}>
                      {Object.entries(counts).map(([key, value]) => (
                        <div>
                          + <b>{key}</b> :{value}
                        </div>
                      ))}
                    </Table.Summary.Cell>
                    {/* <Table.Summary.Cell colSpan={1}>
                      {Object.entries(counts1).map(([key, value]) => (
                        <div>
                          + <b>{key}</b> :{value}
                        </div>
                      ))}
                    </Table.Summary.Cell> */}
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        )}{" "}
        <FormBill
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          inforProduct={inforProduct}
        />
      </div>
    </>
  );
  // console.log(bills);
  // return <>{bills.length > 0 ? bills[0].name : null}</>;
};
export default ListBill;
