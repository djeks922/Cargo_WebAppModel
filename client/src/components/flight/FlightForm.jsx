import React from "react";
import { useState } from "react";
import axios from 'axios'
const FlightForm = () => {
  const [flightState, setFlightState] = useState({
    flight_number: 0,
    flight_date: new Date().toISOString(),
    landing_date: new Date().toISOString(),
  });
  console.log(flightState)
  const changeHandler = (e) => {
    setFlightState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACK_URL}/flights`,flightState)
        alert('Successfully added')
    } catch (error) {
        throw error
    }
  };

  return (
    <div className="m-40">
      <div>
        <h1 className="text-5xl mb-6">FLIGHT FORM</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <label
            htmlFor="f-number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          ></label>
          <input
            type="number"
            id="f-number"
            value={flightState.flight_number}
            onChange={changeHandler}
            name="flight_number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="222"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="f-date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          ></label>
          <input
            type="datetime-local"
            id="f-date"
            value={flightState.flight_date}
            onChange={changeHandler}
            name="flight_date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="l-date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          ></label>
          <input
            type="datetime-local"
            id="l-date"
            value={flightState.landing_date}
            onChange={changeHandler}
            name="landing_date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register Flight
        </button>
      </form>
    </div>
  );
};

export default FlightForm;
