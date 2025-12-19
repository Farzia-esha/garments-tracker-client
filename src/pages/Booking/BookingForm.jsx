import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import PaymentModal from "../Payment/PaymentModal";

const BookingForm = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  useEffect(() => {
    if (product && qty) setTotal(Number(qty) * Number(product.price));
  }, [qty, product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (qty < product.minOrder || qty > product.quantity) {
      Swal.fire("Error", "Invalid quantity", "error");
      return;
    }

    const data = {
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
      paymentStatus: "pending",
      orderStatus: "pending",
      createdAt: new Date(),
    };

    setBookingData(data);
    setShowModal(true); 
  };

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-xl rounded-xl my-10">
        <h2 className="text-3xl font-bold mb-6">Booking Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={user.email} readOnly className="input input-bordered w-full" />
          <input value={product.name} readOnly className="input input-bordered w-full" />
          <input value={product.price + " BDT"} readOnly className="input input-bordered w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" required className="input input-bordered" placeholder="First Name" />
            <input name="lastName" required className="input input-bordered" placeholder="Last Name" />
          </div>
          <input
            type="number"
            min={product.minOrder}
            max={product.quantity}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Quantity"
          />
          <input value={total + " BDT"} readOnly className="input input-bordered w-full" />
          <input name="contact" required className="input input-bordered w-full" placeholder="Contact" />
          <textarea name="address" required className="textarea textarea-bordered w-full" placeholder="Address" />
          <textarea name="notes" className="textarea textarea-bordered w-full" placeholder="Notes" />
          <button className="btn btn-primary w-full text-lg">Submit Order</button>
        </form>
      </div>

      {showModal && bookingData && (
        <PaymentModal
          open={showModal}
          onClose={() => setShowModal(false)}
          bookingData={bookingData}
        />
      )}
    </>
  );
};

export default BookingForm;
