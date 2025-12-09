import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">Our Products</h2>
          <p className="text-gray-600 mt-2">Top-selling garments from our production</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />

              <div className="p-6">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.shortDesc}</p>

                <p className="text-lg font-bold text-indigo-600 mt-3">
                  BDT-{product.price}
                </p>

                <Link 
                  to={`/product/${product._id}`}
                  className="mt-4 inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
