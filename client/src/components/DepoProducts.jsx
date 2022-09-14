import React from "react";
import Products from "./Products";

const DepoProducts = ({ show, depoProducts }) => {
  console.log(depoProducts);
  return (
    <>
      {show && (
        <div className="fixed z-20 w-screen h-screen inset-0 backdrop-blur-md	">
          <div className="absolute inset-10 ">
            <Products products={depoProducts} />
          </div>
        </div>
      )}
    </>
  );
};

export default DepoProducts;
