import React from "react";
import { IndividualProduct } from "../components/product-details/IndividualProduct";

export const ProductsData = ({ products, addToCart }) => {
  // console.log(products);

  return products.map((individualProduct) => (
    <IndividualProduct
      key={individualProduct.ID}
      individualProduct={individualProduct}
      addToCart={addToCart}
    />
  ));
};
