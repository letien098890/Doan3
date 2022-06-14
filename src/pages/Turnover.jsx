import React from "react";
import Show from "../components/bill/Show";
import Doanhthu from "../components/doanhthu/listdoanhthu";
import Show1 from "../components/luong/Show1";
function Turnover() {
  return (
    <div className="Staffs">
      <Show />
      <Show1 />
      <Doanhthu />
      {/* <h1>Hệ Thống Đang Cập Nhật Tính Năng Này ...</h1> */}
      {}
    </div>
  );
}

export default Turnover;
