import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const { data: orders = [] } = useQuery({
    queryKey: ["all-orders", search, filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders`, {
        params: { search, filter }
      });
      return res.data;
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">All Orders</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <input
          type="text"
          placeholder="Search by Order ID / User / Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          className="select select-bordered w-full md:w-48"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto shadow-xl border rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover">
                <td className="font-mono">{order._id}</td>
                <td>{order.userEmail}</td>
                <td>{order.productTitle}</td>
                <td className="font-bold">{order.quantity}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="text-end">
                  <Link
                    to={`/dashboard/order/${order._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
