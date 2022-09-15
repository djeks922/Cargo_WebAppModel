import React from "react";
import Products from "./Products";

const FlightProducts = ({ show, flightProducts, toggleModal ,addProduct}) => {
  const toggle = (e) => {
    console.log(e.target)
    toggleModal(!show)
  }

  return (
    <>
      {show && (
        <div className="fixed z-20 w-screen h-screen inset-0 backdrop-blur-md" onClick={toggle}>
          <div className="absolute inset-10 overflow-auto h-5/6">
            <Products products={flightProducts} isFlight={true} addProduct= {addProduct}/>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightProducts;