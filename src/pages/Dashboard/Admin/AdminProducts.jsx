import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#457b9d",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/products/${id}`);
        Swal.fire("Deleted!", "Product has been removed.", "success");
        refetch();
      }
    });
  };

  const handleHomeToggle = async (id, value) => {
    await axiosSecure.patch(`/products/home/${id}`, { showOnHome: value });
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">All Products</h2>

      <div className="overflow-x-auto shadow-xl border rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover">
                <td>
                  <img
                    src={product?.image}
                    className="w-16 h-16 object-cover rounded-md"
                    alt=""
                  />
                </td>

                <td className="font-semibold">{product.name}</td>
                <td className="text-blue-600 font-bold">${product.price}</td>
                <td>{product.category}</td>
                <td>{product.createdBy}</td>

                {/* Show on Home Toggle */}
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={product.showOnHome || false}
                    onChange={(e) =>
                      handleHomeToggle(product._id, e.target.checked)
                    }
                  />
                </td>

                {/* Edit + Delete */}
                <td className="space-x-2">
                  <Link
                    to={`/dashboard/edit-product/${product._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
