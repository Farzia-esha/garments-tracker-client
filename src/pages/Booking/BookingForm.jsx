import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const BookingForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  useEffect(() => {
    if (product && qty !== "") {
      setTotal(Number(qty) * Number(product.price));
    }
  }, [qty, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!qty) {
      Swal.fire("Error", "Please enter a quantity", "error");
      return;
    }

    if (qty < product.minOrder) {
      Swal.fire("Error", `Minimum order is ${product.minOrder}`, "error");
      return;
    }

    if (qty > product.quantity) {
      Swal.fire("Error", `Only ${product.quantity} pcs available`, "error");
      return;
    }

    const bookingData = {
      email: user.email,
      productId: id,
      productTitle: product.name,
      unitPrice: product.price,
      quantity: Number(qty),
      totalPrice: total,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      contact: e.target.contact.value,
      address: e.target.address.value,
      notes: e.target.notes.value,
      paymentMode: product.paymentMode,
      paymentStatus: product.paymentMode === "Online Payment" ? "pending" : "not-required",
      orderStatus: "pending",
      createdAt: new Date(),
    };

 
    if (product.paymentMode === "Cash On Delivery") {
      await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      Swal.fire({
        title: "Success!",
        text: "Order placed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard/my-orders");
      });

      return;
    }

    Swal.fire({
      icon: "info",
      title: "submit order successfull",
      timer: 1000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/payment", { state: bookingData });
    });
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-xl rounded-xl my-10">
      <h2 className="text-3xl font-bold mb-6">Booking Form</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Product Name */}
        <div>
          <label>Product</label>
          <input
            type="text"
            value={product.name}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Unit Price */}
        <div>
          <label>Unit Price</label>
          <input
            type="text"
            value={product.price + " BDT"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" className="input input-bordered" placeholder="First Name" required />
          <input name="lastName" className="input input-bordered" placeholder="Last Name" required />
        </div>

        {/* Quantity */}
        <div>
          <label>Order Quantity</label>
          <input
            type="number"
            min={product.minOrder}
            max={product.quantity}
            required
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Total Price */}
        <div>
          <label>Total Price</label>
          <input
            type="text"
            value={total + " BDT"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Contact */}
        <div>
          <label>Contact Number</label>
          <input name="contact" required className="input input-bordered w-full" placeholder="01xxxxxxxxx" />
        </div>

        {/* Address */}
        <div>
          <label>Delivery Address</label>
          <textarea name="address" required className="textarea textarea-bordered w-full"></textarea>
        </div>

        {/* Notes */}
        <div>
          <label>Additional Notes</label>
          <textarea name="notes" className="textarea textarea-bordered w-full"></textarea>
        </div>

        <button className="btn bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white w-full py-3 text-lg">Submit Order</button>

      </form>
    </div>
  );
};

export default BookingForm;

