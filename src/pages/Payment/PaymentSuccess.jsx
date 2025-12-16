import { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/verify-payment`, { sessionId });
        if (data.success) {
          alert("Payment verified successfully!");
        } else {
          alert("Payment not verified!");
        }
      } catch (err) {
        console.error("Verification Error:", err);
      }
    };

    if (sessionId) verifyPayment();
  }, [sessionId]);

  return <div>Verifying payment...</div>;
};

export default PaymentSuccess;
