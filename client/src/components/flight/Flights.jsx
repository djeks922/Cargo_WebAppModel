import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Flights = (props) => {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    async function fetchFlights() {
      try {
        const flights = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/flights`
        );
        setFlights(flights.data.data);
      } catch (error) {
        throw error;
      }
    }
    fetchFlights();
  }, []);

  const openProducts = (products) => {
    props.toggleModal(!props.isModal);
    props.setFlightProducts(products);

    props.setFlightToAddProduct({
      id: null,
      isAdding: false,
    });
  };

  const openProductsToAdd = async (f_products, id) => {
    const res = await axios.get(`${process.env.REACT_APP_BACK_URL}/products`);
    const prods = res.data.data;
    const productsNotInFlight = prods.filter(
      (prod) =>
        !f_products.find((f_prod) => {
          return f_prod._id === prod._id;
        }) && prod.status === "INDEPO_TR"
    );

    props.toggleModal(!props.isModal);
    props.setFlightProducts(productsNotInFlight);
    props.setFlightToAddProduct({
      id,
      isAdding: true,
    });
  };

  const unloadProducts = async (depo_cat, id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/flights/unload/${id}/${depo_cat}`
      );
      console.log(response.data.data);
      alert("Success!!");
    } catch (error) {
      throw error;
    }
  };

  function makeFlightTable() {
    return flights.map((flight) => {
      const options = {
        timeZone: "Asia/Baku",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      };
      const fd_humanReadable = new Date(flight.flight_date).toLocaleString(
        "en-US",
        options
      );
      const fl_humanReadable = new Date(flight.landing_date).toLocaleString(
        "en-US",
        options
      );

      return (
        <tr key={flight._id}>
          <td className="border border-slate-700  bg-slate-700 ">
            {flight._id}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {flight.flight_number}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {fd_humanReadable}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {fl_humanReadable}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {flight.isUnload
              ? "Mallar depoya daxil olub"
              : "Enisden sora yukler depoya daxil olmayib"}
          </td>
          <td className="bg-blue-700">
            <button
              onClick={() => {
                openProducts(flight.products);
              }}
            >
              SHOW PRODUCTS
            </button>
          </td>
          {flight.isUnload || (
            <>
              <td className="bg-green-600">
                <button
                  onClick={() => {
                    openProductsToAdd(flight.products, flight._id);
                  }}
                >
                  ADD PRODUCTS
                </button>
              </td>
              <td className="bg-green-600">
                <button
                  onClick={() => {
                    unloadProducts("Azerbaycan", flight._id);
                  }}
                >
                  UNLOAD PRODUCTS
                </button>
              </td>
            </>
          )}
        </tr>
      );
    });
  }

  return (
    <div className="grid place-content-center">
      <div>
        <h1 className="size-xl my-2 font-bold text-3xl text-yellow-500">
          Flights
        </h1>
      </div>
      <table className="table-auto border-collapse border border-slate-500 border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="border border-slate-600 bg-slate-800 ">ID</th>
            <th className="border border-slate-600 bg-slate-800 ">
              Flight Number
            </th>
            <th className="border border-slate-600 bg-slate-800 ">
              Flight Time
            </th>
            <th className="border border-slate-600 bg-slate-800 ">
              Landing Time
            </th>
            <th className="border border-slate-600 bg-slate-800 ">
              Local Unload State(enisden sora mali bosaldilib)
            </th>
          </tr>
        </thead>
        <tbody>{makeFlightTable()}</tbody>
      </table>
    </div>
  );
};

export default Flights;
