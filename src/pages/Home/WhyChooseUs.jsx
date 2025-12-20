import React, { useEffect, useState } from "react";
import axios from "axios";
import { Shield, Zap, Users, TrendingUp, Award, Headphones } from "lucide-react";

const iconMap = {
  shield: Shield,
  zap: Zap,
  users: Users,
  "trending-up": TrendingUp,
  award: Award,
  headphones: Headphones,
};

const WhyChooseUs = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios
      .get('https://garments-tracker-system.vercel.app/why-choose-us')
      .then((res) => setFeatures(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-10 bg-gray-200 relative overflow-hidden px-10">
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Why <span className="text-indigo-600">Choose Us?</span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          We combine cutting-edge technology with traditional craftsmanship to deliver exceptional results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div
                key={feature._id}
                className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-xl  `}>
                  <IconComponent size={32} />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-indigo-600 transition-colors ">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/all-products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
