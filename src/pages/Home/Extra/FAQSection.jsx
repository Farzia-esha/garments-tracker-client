import React from "react";

const FAQSection = () => {
  const faqs = [
    {
      q: "How can I track my order?",
      a: "You can track your order from the dashboard after login.",
    },
    {
      q: "Who can add products?",
      a: "Only managers and admins can add products.",
    },
    {
      q: "Is this system secure?",
      a: "Yes, role-based authentication ensures data security.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <h4 className="font-semibold mb-1">{faq.q}</h4>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
