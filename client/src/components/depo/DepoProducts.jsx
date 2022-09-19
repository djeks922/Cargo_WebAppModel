import React from "react";
import { useRef } from "react";
import Products from "../product/Products";

const DepoProducts = ({ show, depoProducts, toggleModal }) => {

  const toggle = (e) => {
    if(e.target.className.includes('fixed'))
        toggleModal(!show)
  }

  return (
    <>
      {show && (
        <div className="fixed z-20 w-screen h-screen inset-0 backdrop-blur-md	" onClick={toggle}>
          <div className="absolute inset-10 overflow-auto h-5/6 scrollbar scrollbar-thumb-blue-900 scrollbar-track-blue-200 scrollbar-corner-blue-400 scrollbar-thumb-rounded">
            <Products products={depoProducts} isDepo={true}/>
          </div>
        </div>
      )}
    </>
  );
};

export default DepoProducts;
