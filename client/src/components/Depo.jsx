import React, { useState } from "react";

const Depo = (props) => {
  console.log(props.depos)
  const openProducts = (products) => {
    props.toggleModal(!props.isModal)
    props.setDepoProducts(products)
  }

  function makeDepoTable() {
    return props.depos.map((depo) => (
        <tr key={depo._id}>
          <td className="border border-slate-700  bg-slate-700 ">
            {depo._id}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {depo.category}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {depo.limit}
          </td>
          <td>
            <button onClick={() => openProducts(depo.products)}>View Products</button>
          </td>
        </tr>
    ));
  }

  return (
    <div className="grid place-content-center m-5">
      <div>
        <h1 className="text-3xl ">Depos</h1>
      </div>
      <table className="table-auto border-collapse border border-slate-500 border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="border border-slate-600 bg-slate-800 ">ID</th>
            <th className="border border-slate-600 bg-slate-800 ">
              Category
            </th>
            <th className="border border-slate-600 bg-slate-800 ">
              Limit
            </th>
          </tr>
        </thead>
        <tbody>{makeDepoTable()}</tbody>
      </table>
    </div>
  );
};

export default Depo;
