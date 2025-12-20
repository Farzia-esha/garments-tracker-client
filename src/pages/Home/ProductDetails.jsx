// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { ShoppingCart, Package, DollarSign, AlertCircle, CheckCircle, XCircle } from "lucide-react";
// import useAuth from "../../hooks/useAuth";
// import useUserRole from "../../hooks/useUserRole";
// import Swal from "sweetalert2";
// import Loading from "../../Components/Shared/Loading";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const { userRole, userStatus, loading: roleLoading } = useUserRole();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`https://garments-tracker-system.vercel.app/products/${id}`);
//         if (!res.ok) throw new Error("Product not found");
//         const data = await res.json();
//         setProduct(data);
//       } catch (error) {
//         Swal.fire("Error", "Failed to load product details", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleOrderClick = () => {
//     if (!user) {
//       Swal.fire({
//         icon: "warning",
//         title: "Please Login",
//         text: "You need to login to place an order",
//       }).then(() => navigate("/login", { state: { from: `/product/${id}` } }));
//       return;
//     }
//     if (userRole !== "buyer") {
//       Swal.fire("Not Available", "Only buyers can place orders", "info");
//       return;
//     }
//     if (userStatus !== "approved") {
//       Swal.fire("Account Status", `Your account is ${userStatus}`, "warning");
//       return;
//     }
//     navigate(`/booking/${id}`, { state: { product } });
//   };

//   const canOrder = user && userRole === "buyer" && userStatus === "approved";

//   const buttonConfig = !user
//     ? { text: "Login to Order", disabled: false, color: "bg-indigo-600" }
//     : userRole !== "buyer"
//     ? { text: "Only Buyers Can Order", disabled: true, color: "bg-gray-400" }
//     : userStatus === "suspended"
//     ? { text: "Account Suspended", disabled: true, color: "bg-red-400" }
//     : userStatus === "pending"
//     ? { text: "Account Pending", disabled: true, color: "bg-yellow-400" }
//     : product?.quantity <= 0
//     ? { text: "Out of Stock", disabled: true, color: "bg-gray-400" }
//     : { text: "Place Order / Book Now", disabled: false, color: "bg-indigo-600" };

//   if (loading || roleLoading) return <Loading />;

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
//           <button
//             onClick={() => navigate("/all-products")}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Browse All Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left - Image */}
//         <div className="bg-gray-100 h-96 flex items-center justify-center">
//           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//         </div>

//         {/* Right - Info */}
//         <div className="p-8 flex flex-col">
//           <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold mb-3 w-fit">
//             {product.category}
//           </span>

//           <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
//           <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
//               <div className="flex items-center gap-2 mb-1">
//                 <DollarSign className="text-indigo-600" size={20} />
//                 <span className="text-sm text-gray-600">Price</span>
//               </div>
//               <p className="text-2xl font-bold text-indigo-600">{product.price} BDT</p>
//             </div>

//             <div className="bg-green-50 rounded-xl p-4 border border-green-200">
//               <div className="flex items-center gap-2 mb-1">
//                 <Package className="text-green-600" size={20} />
//                 <span className="text-sm text-gray-600">Available</span>
//               </div>
//               <p className="text-2xl font-bold text-green-600">{product.quantity} pcs</p>
//             </div>
//           </div>

//           <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4">
//             <div className="flex justify-between items-center py-2 border-b">
//               <span className="text-gray-600">Minimum Order</span>
//               <span className="font-semibold">{product.minOrder} pcs</span>
//             </div>
//             <div className="flex justify-between items-center py-2 border-b">
//               <span className="text-gray-600">Payment Options</span>
//               <span className="font-semibold">{product.paymentMode || "N/A"}</span>
//             </div>
//           </div>

//           <button
//             onClick={handleOrderClick}
//             disabled={buttonConfig.disabled}
//             className={`w-full py-4 rounded-xl font-bold text-lg text-white ${buttonConfig.color} ${
//               buttonConfig.disabled ? "cursor-not-allowed opacity-70" : "hover:shadow-xl transition-all"
//             } flex items-center justify-center gap-2`}
//           >
//             <ShoppingCart size={24} />
//             {buttonConfig.text}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ShoppingCart, Package, DollarSign, AlertCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Swal from "sweetalert2";
import Loading from "../../Components/Shared/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { userRole, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://garments-tracker-system.vercel.app/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        Swal.fire("Error", "Failed to load product details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrderClick = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to login to place an order",
      }).then(() => navigate("/login", { state: { from: `/product/${id}` } }));
      return;
    }

    // Only block admin or manager
    if (userRole === "admin" || userRole === "manager") {
      Swal.fire("Not Available", "Admins and Managers cannot place orders", "info");
      return;
    }

    // All other users can place order
    navigate(`/booking/${id}`, { state: { product } });
  };

  const buttonConfig = !user
    ? { text: "Login to Order", disabled: false, color: "bg-indigo-600" }
    : userRole === "admin" || userRole === "manager"
    ? { text: "Admins/Managers Cannot Order", disabled: true, color: "bg-gray-400" }
    : product?.quantity <= 0
    ? { text: "Out of Stock", disabled: true, color: "bg-gray-400" }
    : { text: "Place Order / Book Now", disabled: false, color: "bg-indigo-600" };

  if (loading || roleLoading) return <Loading />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <button
            onClick={() => navigate("/all-products")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Image */}
        <div className="bg-gray-100 h-96 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Right - Info */}
        <div className="p-8 flex flex-col">
          <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold mb-3 w-fit">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="text-indigo-600" size={20} />
                <span className="text-sm text-gray-600">Price</span>
              </div>
              <p className="text-2xl font-bold text-indigo-600">{product.price} BDT</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Package className="text-green-600" size={20} />
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{product.quantity} pcs</p>
            </div>
          </div>

          <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Minimum Order</span>
              <span className="font-semibold">{product.minOrder} pcs</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Payment Options</span>
              <span className="font-semibold">{product.paymentMode || "N/A"}</span>
            </div>
          </div>

          <button
            onClick={handleOrderClick}
            disabled={buttonConfig.disabled}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white ${buttonConfig.color} ${
              buttonConfig.disabled ? "cursor-not-allowed opacity-70" : "hover:shadow-xl transition-all"
            } flex items-center justify-center gap-2`}
          >
            <ShoppingCart size={24} />
            {buttonConfig.text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
