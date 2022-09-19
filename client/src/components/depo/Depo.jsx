import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

const Depo = (props) => {
  const [deposFiltered, setDeposFiltered] = useState([]);
  useEffect(() => {
    async function fetchDepos() {
      try {
        const depos = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/depos`
        );
        setDeposFiltered(depos.data.data);
      } catch (error) {
        throw error;
      }
    }
    fetchDepos();
  }, []);

  const openProducts = (products) => {
    props.toggleModal(!props.isModal);
    props.setDepoProducts(products);
  };

  function makeDepoTable() {
    return deposFiltered.map((depo) => (
      <tr key={depo._id}>
        <td className="border border-slate-700  bg-slate-700 ">{depo._id}</td>
        <td className="border border-slate-700 bg-slate-700">
          {depo.category}
        </td>
        <td className="border border-slate-700 bg-slate-700">{depo.limit}</td>
        <td className="bg-blue-700">
          <button onClick={() => openProducts(depo.products)}>
            VIEW PRODUCTS
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="grid place-content-center m-5">
      <div>
        <h1 className="size-xl my-2 font-bold text-3xl text-purple-500">Depos</h1>
      </div>
      <table className="table-auto border-collapse border border-slate-500 border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="border border-slate-600 bg-slate-800 ">ID</th>
            <th className="border border-slate-600 bg-slate-800 ">Category</th>
            <th className="border border-slate-600 bg-slate-800 ">Limit</th>
          </tr>
        </thead>
        <tbody>{makeDepoTable()}</tbody>
      </table>
    </div>
  );
};

export default Depo;
