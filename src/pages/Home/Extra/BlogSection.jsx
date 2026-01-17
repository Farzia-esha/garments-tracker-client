import React from "react";
import { Calendar } from "lucide-react";

const BlogSection = () => {
  const blogs = [
    {
      title: "Top 5 Garments Trends in 2026",
      author: "Admin",
      date: "Jan 10, 2026",
      description: "Stay ahead with the latest fashion trends in garments manufacturing and export.",
      image: "https://i.ibb.co.com/0jfXGdLY/image.png",
    },
    {
      title: "How to Optimize Your Inventory",
      author: "Manager",
      date: "Jan 12, 2026",
      description: "Tips and strategies to manage your garments inventory efficiently and reduce losses.",
      image: "https://i.ibb.co.com/1GYQWWck/image.png",
    },
    {
      title: "Exporting Garments Internationally",
      author: "Admin",
      date: "Jan 15, 2026",
      description: "Learn the steps to successfully export garments to international markets.",
      image: "https://i.ibb.co.com/xSHQCpML/image.png",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Latest Blogs</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />

              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar size={16} /> <span>{blog.date}</span> • <span>{blog.author}</span>
                </div>
                <p className="text-gray-600 text-sm">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
