import React, { useState } from "react";

const Flights = (props) => {
  function makeFlightTable() {
    return props.flights.map((flight) => (
        <tr key={flight._id}>
          <td className="border border-slate-700  bg-slate-700 ">
            {flight._id}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {flight.flight_number}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {flight.flight_date}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {flight.landing_date}
          </td>
          <td className="border border-slate-700 bg-slate-700">
            {flight.isUnload
              ? "Mallar depoya daxil olub"
              : "Enisden sora yukler depoya daxil olmayib"}
          </td>
        </tr>
    ));
  }

  return (
    <div className="grid place-content-center">
      <div>
        <h1 className="text-3xl m-5">Flights</h1>
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
