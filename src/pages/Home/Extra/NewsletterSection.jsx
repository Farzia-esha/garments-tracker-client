// import React from "react";
// import { Mail } from "lucide-react";

// const NewsletterSection = () => {
//   return (
//     <section className="py-20 bg-gray-100 ">
//       <div className="container mx-auto px-4 text-center max-w-2xl">
//         <Mail size={48} className="mx-auto mb-6 text-yellow-400" />

//         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//           Subscribe to Our Newsletter
//         </h2>

//         <p className="text-gray-600 mb-8">
//           Get the latest updates on garments production, offers, and industry news.
//         </p>

//         <form className="flex flex-col sm:flex-row gap-4 border-2 border-gray-500">
//           <input
//             type="email"
//             required
//             placeholder="Enter your email"
//             className="flex-1 px-5 py-3 rounded-lg text-gray-900 outline-none"
//           />
//           <button
//             type="submit"
//             className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition"
//           >
//             Subscribe
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default NewsletterSection;

import React, { useState } from "react";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Set submitted state
    setSubmitted(true);

    // Clear input
    setEmail("");

    // Optional: hide message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <Mail size={48} className="mx-auto mb-6 text-yellow-400" />

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-gray-600 mb-8">
          Get the latest updates on garments production, offers, and industry news.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-4 border-2 border-gray-500 p-2 rounded-lg justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-lg text-gray-900 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition"
          >
            Subscribe
          </button>
        </form>

        {/* Thank you message */}
        {submitted && (
          <p className="mt-4 text-green-600 font-semibold">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
