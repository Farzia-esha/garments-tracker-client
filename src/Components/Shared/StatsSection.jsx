import { Users, Package, Truck, CheckCircle } from "lucide-react";

const stats = [
  { id: 1, title: "Total Buyers", value: "2,500+", icon: Users },
  { id: 2, title: "Products Listed", value: "1,200+", icon: Package },
  { id: 3, title: "Orders Delivered", value: "5,800+", icon: Truck },
  { id: 4, title: "Successful Orders", value: "98%", icon: CheckCircle },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center ">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Our Platform in Numbers
        </h2>
        <p className="text-gray-600 mb-12">
          Trusted by buyers, managers and admins nationwide
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
              <stat.icon className="w-12 h-12 text-indigo-600 mb-2" />
              <span className="text-3xl font-bold text-gray-800">
                {stat.value}
              </span>
              <span className="text-gray-600">{stat.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
