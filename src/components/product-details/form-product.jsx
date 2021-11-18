/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Upload, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { UploadOutlined } from "@ant-design/icons";
// import { storage } from "../../firebase-config";
// import { PlusOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 24 },
// };

const FormProducts = (props) => {
  console.log("infor", props);

  const [formptoduct] = Form.useForm();

  const history = useHistory();

  useEffect(() => {
    formptoduct.resetFields();
  }, [formptoduct, props.infoProduct]);

  // const [fileList, setFileList] = useState([]);

  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  // const props2 = {
  //   name: "file",
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <>
      <Form
        {...layout}
        initialValues={props.infoProduct}
        form={formptoduct}
        onFinish={props.onFinish}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name={"name"}
              label="Tên Sản Phẩm"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"loai"} label="Loại" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name={"gia"} label="Giá" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"hinhanh"}
              label="Hình Ảnh"
              rules={[{ required: false }]}
            >
              {/* <Upload {...props2}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload> */}
              {/* <Input type="file" />, */}

              <Upload
                listType="picture-card"
                // fileList={fileList}
                // onChange={onChange}
                onPreview={onPreview}
                beforeUpload={Upload.LIST_IGNORE}
              >
                {"Upload"}
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name={"mota"} label="Mô Tả" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "5px" }}
              >
                {props.isEdit ? "Cập nhật" : "Thêm"}
              </Button>
              <Button type="primary" onClick={() => history.push("/products")}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default FormProducts;
