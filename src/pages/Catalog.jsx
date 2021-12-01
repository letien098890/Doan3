import React, { useCallback, useState, useEffect, useRef } from "react";

import Helmet from "../components/product-details/Helmet";
// import CheckBox from "../components/CheckBox";

// import productData from "../assets/fake-data/products";
// import category from "../assets/fake-data/category";
// // import colors from "../assets/fake-data/product-color";
// // import size from "../assets/fake-data/product-size";
// import Button from "../components/Button";
import InfinityList from "../components/product-details/InfinityList";

const Catalog = () => {
  return (
    <Helmet title="Thực đơn">
      <div>
        <InfinityList data={[]} />
      </div>
    </Helmet>
  );
};

export default Catalog;
