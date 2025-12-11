import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ShoppingCart, Package, DollarSign, AlertCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserRole(data.role);
          setUserStatus(data.status);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleOrderClick = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to login to place an order",
      });
      navigate("/login");
      return;
    }

    navigate(`/booking/${id}`);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        </div>
      </div>
    );
  }

  const canOrder = user && userRole !== "admin" && userRole !== "manager" && userStatus !== "suspended";

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div>
              <img
                src={product.image}
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>

            <div className="p-8 flex flex-col">
              <div className="mb-6">
              <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold mb-3">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="text-indigo-600" size={20} />
                    <span className="text-sm text-gray-600">Price</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">BDT {product.price}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="text-green-600" size={20} />
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{product.quantity} pcs</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Minimum Order</span>
                  <span className="font-semibold">{product.minOrder} pcs</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Payment Options</span>
                  <span className="font-semibold">{product.paymentMode || "N/A"}</span>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleOrderClick}
                  disabled={!canOrder}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    canOrder
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={24} /> {canOrder ? "Booking/Order" : "Cannot Order"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
