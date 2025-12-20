import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingBag, Scissors, Package, Truck } from "lucide-react";

const iconMap = {
  ShoppingBag: <ShoppingBag size={40} />,
  Scissors: <Scissors size={40} />,
  Package: <Package size={40} />,
  Truck: <Truck size={40} />,
};

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    axios.get('https://garments-tracker-system.vercel.app/how-it-works')
      .then(res => setSteps(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="py-20 px-10 bg-blue-100">
      <div className="container mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple and transparent process from order to delivery
          </p>
        </motion.div>

        {/* Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center border-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Step */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full font-bold text-2xl mb-4 shadow-md">
                {step.step}
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl mb-4"
              >
                {iconMap[step.icon]}
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
