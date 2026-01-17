import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://garments-tracker-system.vercel.app/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-1">Category: {product.category}</p>
              <p className="text-indigo-600 font-bold text-lg mb-1">BDT {product.price}</p>
              <p className="text-gray-600 mb-3">Available: {product.quantity}</p>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="mt-auto bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
