import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Flights from "./components/Flights";
import Depo from "./components/Depo";
import Products from "./components/Products";
import DepoProducts from "./components/DepoProducts";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [depos, setDepo] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Depo states
   */
  const [depoProducts, setDepoProducts] = useState(null) 
  const [showDepoModal, setShowDepoModal] = useState(null) 
  
  /**
   * Depo states
   */
  const [flightProducts, setFlightProducts] = useState(null) 
  const [showFlightModal, setShowFlightModal] = useState(null) 

  useEffect(() => {
    fetchFlights();
    fetchDepos();
    fetchProducts();
  }, []);

  async function fetchFlights() {
    try {
      setIsLoading(true);
      const flights = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/flights`
      );
      setFlights(flights.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }
  async function fetchDepos() {
    try {
      setIsLoading(true);
      const depos = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/depos`
      );
      setDepo(depos.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }
  async function fetchProducts() {
    try {
      setIsLoading(true);
      const products = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/products`
      );
      setProducts(products.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="App text-center bg-slate-900">
      {isLoading && (
        <button type="button" className="bg-indigo-500 ..." disabled>
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
          Processing...
        </button>
      )}
      <Flights flights={flights} oggleModal = {setShowFlightModal} isModal = {showFlightModal}/>
      <Depo depos={depos} toggleModal = {setShowDepoModal} isModal = {showDepoModal} setDepoProducts = {setDepoProducts}/>
      <Products products = {products}/>
      <DepoProducts show={showDepoModal} depoProducts = {depoProducts}/>
    </div>
  );
}

export default App;
