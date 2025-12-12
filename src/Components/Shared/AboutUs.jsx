import React from "react";

const AboutUs = () => {
  return (
    <section className="py-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          About <span className="text-indigo-600">Us</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          We provide an advanced garment order tracking platform that empowers
          businesses to manage their production workflow efficiently and ensure
          timely delivery to customers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://i.ibb.co.com/RkjxLS7L/image.png"
            className="rounded-xl shadow-lg object-cover w-full h-80 md:h-96"
          />
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-700">
                To streamline garment production and order tracking, providing
                real-time insights and transparency for manufacturers, managers,
                and customers.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-700">
                To become Bangladesh’s leading platform for managing garment
                production, ensuring quality, efficiency, and on-time delivery
                for every business.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Why Choose Us</h3>
              <p className="text-gray-700">
                Our platform combines modern technology with proven garment
                management processes, giving businesses full control over
                production stages, order status, and tracking from factory to
                doorstep.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            join with us
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
