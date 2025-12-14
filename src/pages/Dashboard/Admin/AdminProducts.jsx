import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import Loading from '../../../Components/Shared/Loading';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowOnHome = async (productId, currentStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/home/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showOnHome: !currentStatus })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Product ${!currentStatus ? 'added to' : 'removed from'} home page`,
          showConfirmButton: false,
          timer: 1500
        });
        fetchProducts();
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update', 'error');
    }
  };

  const handleDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Delete "${productName}"? This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
          fetchProducts();
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to delete product', 'error');
      }
    }
  };

  if (loading) { return (<div><Loading/> </div> );}

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <div className="text-sm text-gray-600">
          Total: <span className="font-bold text-indigo-600">{products.length}</span> products
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created By</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Show on Home</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" 
                  />
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">Stock: {product.quantity} pcs</p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-indigo-600 font-bold">BDT {product.price}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {product.createdBy || 'N/A'}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleShowOnHome(product._id, product.showOnHome)}
                    className={`p-2 rounded-lg transition ${
                      product.showOnHome 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={product.showOnHome ? 'Remove from home' : 'Show on home'}
                  >
                    {product.showOnHome ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      title="Delete product"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;