import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://garments-tracker-system.vercel.app/products/home`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map(product => (
            <div 
              key={product._id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <img 
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

              <p className="text-gray-600 text-sm mb-3">
                {product.shortDesc}
              </p>

              <p className="text-indigo-600 font-bold text-lg mb-4">
                BDT {product.price}
              </p>

              <Link
                to={`/product/${product._id}`}
                className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}

        </div>
      </div>
              {/* View All Products Button */}
        <div className="text-center mt-10">
          <Link
            to="/all-products"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
          >
            View All Products
          </Link>
        </div>

    </div>
  );
};

export default ProductsSection;
