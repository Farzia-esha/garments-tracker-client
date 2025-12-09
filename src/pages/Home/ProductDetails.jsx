import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading </p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-12 bg-blue-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <img src={product.image} alt={product.name} className="w-full rounded-xl shadow" />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.shortDesc}</p>
          <p className="text-3xl font-bold text-indigo-600 mb-6">BDT-{product.price}</p>

          <button className="px-10 py-4 bg-indigo-600 text-white rounded-xl text-lg hover:bg-indigo-700 transition">
            Book / Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
