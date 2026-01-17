import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="py-20 bg-indigo-50  text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Start Tracking Your Garments Today
      </h2>
      <p className="mb-8 ">
        Manage production, orders and delivery in one platform.
      </p>

      <Link
        to="/register"
        className=" btn-primary bg-blue-700  inline-flex items-center gap-2  text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
      >
        Get Started <ArrowRight />
      </Link>
    </section>
  );
};

export default CTASection;
