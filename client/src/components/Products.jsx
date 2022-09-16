import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { faker } from '@faker-js/faker';

const Products = ({ products, isDepo, isFlight ,addProduct}) => {
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    if (products) {
      return setProductsFiltered(products);
    }
    fetchProducts();
    async function fetchProducts() {
      try {
        const products = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/products`
        );
        setProductsFiltered(products.data.data);
      } catch (error) {
        throw error;
      }
    }
  }, [products]);

  const deleteProduct = async (id) => {
    try {
      if (window.confirm("sure?")) {
        const result = await axios.delete(
          `${process.env.REACT_APP_BACK_URL}/products/${id}`
        );
        alert(`${result.data.data}`);
        setProductsFiltered((prev) => {
          return prev.filter((product) => product._id !== id);
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const addProductToFlight = async (flightID, productID) => {
    try {
       const res = await axios.post(`${process.env.REACT_APP_BACK_URL}/flights/add-product/${flightID}/${productID}`)
       console.log(res.data.data)
    } catch (error) {
      throw error
    }
  }

  const createProduct = async () => {
    try {
    
        const productInput = {
          name: faker.commerce.productName(),
          category :faker.commerce.department(),
          barcode :faker.datatype.uuid(),
          identifier :faker.datatype.string(),
          weight: faker.datatype.number({min:0,max:5,precision: 0.01 })
        }
        console.log(productInput)
        const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/products`,productInput)
        alert('Successfully added!')
        setProductsFiltered(prev => [response.data.data, ...prev])
    } catch (error) {
       throw error
    }
  }
 
  let productsJsx = productsFiltered.map((product) => {
    const options = {
      timeZone: "UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    let time = (new Date(product.createdAt)).toLocaleString('en-US', options);
    
    return (
      <tr key={product._id}>
        <td className="border px-8 py-4">{product._id}</td>
        <td className="border px-8 py-4">{product.name}</td>
        <td className="border px-8 py-4">{product.category}</td>
        <td className="border px-8 py-4">{product.barcode}</td>
        <td className="border px-8 py-4">{product.weight}</td>
        <td className="border px-8 py-4">{product.status}</td>
        <td className="border px-8 py-4">{product.identifier}</td>
        <td className="border px-8 py-4">{time}</td>
        {isFlight || <td className="border bg-red-600 px-8 py-4">
          <button onClick={() => deleteProduct(product._id)}>DELETE</button>
        </td>}
        {addProduct?.isAdding && <td className="border bg-yellow-600 px-8 py-4">
          <button onClick={() => addProductToFlight(addProduct.id, product._id)}> ADD</button>
        </td>}
      </tr>
    );
  });

  return (
    <div className="grid w-11/12 ml-5 my-0">
      <div>
        <h1 className="size-xl my-2 font-bold text-3xl text-cyan-300">PRODUCTS</h1>
      </div>
      <table className='shadow-2xl bg-slate-800 border-collapse'>
        <thead>
          <tr>
            <th className="bg-gray-800 border text-left px-8 py-4">ID</th>
            <th className="bg-gray-800 border text-left px-8 py-4">NAME</th>
            <th className="bg-gray-800 border text-left px-8 py-4">CATEGORY</th>
            <th className="bg-gray-800 border text-left px-8 py-4">BARCODE</th>
            <th className="bg-gray-800 border text-left px-8 py-4">WEIGHT</th>
            <th className="bg-gray-800 border text-left px-8 py-4">STATUS</th>
            <th className="bg-gray-800 border text-left px-8 py-4">
              IDENTIFIER
            </th>
            <th className="bg-gray-800 border text-center px-8 py-4">
              REGISTERED AT
            </th>
            <th className="bg-gray-800 border text-center ">
              <button className="border bg-green-600 px-8 py-4" onClick={() => createProduct()} >ADD PRODUCT</button>
            </th>
          </tr>
        </thead>

        <tbody>{productsJsx}</tbody>
      </table>
    </div>
  );
};

export default Products;
