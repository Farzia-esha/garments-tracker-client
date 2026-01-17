import React from "react";
import { Shirt, Package, Layers } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    { name: "T-Shirts", icon: <Shirt size={32} /> },
    { name: "Shirts", icon: <Layers size={32} /> },
    { name: "Pants", icon: <Package size={32} /> },
    { name: "Jackets", icon: <Shirt size={32} /> },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Product Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4 text-indigo-600">
                {cat.icon}
              </div>
              <h3 className="font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
