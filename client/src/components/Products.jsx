import React from "react";
import axios from "axios";
const Products = ({ products }) => {
  const deleteProduct = async (id) => {
    try {
      if (window.confirm("sure?")) {
        const result = await axios.delete(
          `${process.env.REACT_APP_BACK_URL}/products/${id}`
        );
        console.log(result.data);
        alert(`${result.data.data}`);
      }
    } catch (error) {
      throw error;
    }
  };

  let productsJsx = products.map((product) => {
    let time = new Date(product.createdAt);
    let calendar = time.toLocaleDateString();
    let hours = time.getHours().toLocaleString();
    let minutes = time.getMinutes().toLocaleString();
    calendar += ` ${hours}:${minutes}`;
    return (
      <tr key={product._id}>
        <td className="border px-8 py-4">{product._id}</td>
        <td className="border px-8 py-4">{product.name}</td>
        <td className="border px-8 py-4">{product.category}</td>
        <td className="border px-8 py-4">{product.barcode}</td>
        <td className="border px-8 py-4">{product.weight}</td>
        <td className="border px-8 py-4">{product.identifier}</td>
        <td className="border px-8 py-4">{calendar}</td>
        <td className="border bg-red-600 px-8 py-4">
          <button onClick={() => deleteProduct(product._id)}>DELETE</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="grid w-11/12 mx-auto my-0">
      <div>
        <h1 className="size-xl my-2 font-bold text-3xl">PRODUCTS</h1>
      </div>
      <table className="shadow-2xl bg-slate-800 border-collapse">
      <thead>
      <tr>
          <th className="bg-gray-800 border text-left px-8 py-4">ID</th>
          <th className="bg-gray-800 border text-left px-8 py-4">NAME</th>
          <th className="bg-gray-800 border text-left px-8 py-4">CATEGORY</th>
          <th className="bg-gray-800 border text-left px-8 py-4">BARCODE</th>
          <th className="bg-gray-800 border text-left px-8 py-4">WEIGHT</th>
          <th className="bg-gray-800 border text-left px-8 py-4">IDENTIFIER</th>
          <th className="bg-gray-800 border text-left px-8 py-4">REGISTERED AT</th>
        </tr>
      </thead>
  
        <tbody>
        {productsJsx}
        </tbody>
        
      </table>
    </div>
  );
};

export default Products;
