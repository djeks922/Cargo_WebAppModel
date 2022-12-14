import { useEffect, useState } from "react";
import "./App.css";
import Flights from "./components/flight/Flights";
import Depo from "./components/depo/Depo";
import Products from "./components/product/Products";
import DepoProducts from "./components/depo/DepoProducts";
import FlightProducts from "./components/flight/FlightProducts";
import FlightForm from "./components/flight/FlightForm";

function App() {
  /**
   * Depo states
   */
  
  const [depoProducts, setDepoProducts] = useState(null) 
  const [showDepoModal, setShowDepoModal] = useState(null) 
  
  /**
   * Flight states
   */
  const [flightProducts, setFlightProducts] = useState(null) 
  const [showFlightModal, setShowFlightModal] = useState(null) 
  const [addProduct, setAddP] = useState({
    id: null,
    isAdding: false
  }) 

  useEffect(()=> {
    document.body.classList.add('scrollbar','scrollbar-thumb-blue-900','scrollbar-track-blue-200', 'scrollbar-corner-blue-400','scrollbar-thumb-rounded')

  })




  return (
    <div className="App text-center bg-slate-900 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
      <Flights setFlightProducts={setFlightProducts} toggleModal = {setShowFlightModal} isModal = {showFlightModal} setFlightToAddProduct = {setAddP}/>
      <Depo  toggleModal = {setShowDepoModal} isModal = {showDepoModal} setDepoProducts = {setDepoProducts}/>
      <Products/>
      <DepoProducts show={showDepoModal} toggleModal = {setShowDepoModal} depoProducts = {depoProducts}/>
      <FlightProducts show={showFlightModal} toggleModal = {setShowFlightModal} flightProducts = {flightProducts} addProduct={addProduct}/>
      <FlightForm/>
    </div>
  );
}

export default App;
