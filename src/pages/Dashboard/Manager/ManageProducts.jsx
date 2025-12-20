
import React, { useEffect, useState } from 'react';
import { Trash2, Eye, Search, Edit, Package } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../Components/Shared/Loading';

const ManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm]);

  const fetchProducts = () => {
    fetch(`https://garments-tracker-system.vercel.app/products`)
      .then(res => res.json())
      .then(data => {
        const myProducts = data.filter(p => p.createdBy === user.email);
        setProducts(myProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const filterProducts = () => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      html: `Are you sure you want to delete<br/><strong>"${productName}"</strong>?<br/><span class="text-red-600">This action cannot be undone.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://garments-tracker-system.vercel.app/products/${productId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Product has been deleted successfully',
            timer: 1500,
            showConfirmButton: false
          });
          fetchProducts();
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Could not delete product'
        });
      }
    }
  };

  const handleToggleHome = async (productId, currentStatus) => {
    try {
      const response = await fetch(`https://garments-tracker-system.vercel.app/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showOnHome: !currentStatus })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Product ${!currentStatus ? 'will now' : 'will no longer'} appear on homepage`,
          timer: 1500,
          showConfirmButton: false
        });
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Could not update product'
      });
    }
  };

  const getCategoryBadge = (category) => {
    const styles = {
      shirt: 'bg-blue-100 text-blue-800',
      pant: 'bg-green-100 text-green-800',
      jacket: 'bg-purple-100 text-purple-800',
      accessories: 'bg-yellow-100 text-yellow-800',
      dress: 'bg-pink-100 text-pink-800',
      't-shirt': 'bg-indigo-100 text-indigo-800',
    };
    return styles[category?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage Products</h2>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Product Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Payment</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">Homepage</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Package className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-lg font-semibold text-gray-600">No products found</p>
                      <p className="text-sm text-gray-400">
                        {searchTerm ? 'Try a different search term' : 'Start by adding your first product'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-4">
                      <img
                        src={product.images?.[0] || product.image}
                        alt={product.productName}
                        className="w-16 h-16 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{product.productName}</p>
                      <p className="text-xs text-gray-500">MOQ: {product.moq} pcs</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getCategoryBadge(product.category)}`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-green-600 text-lg">{product.price}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.availableQuantity > 50 
                          ? 'bg-green-100 text-green-700' 
                          : product.availableQuantity > 20 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.availableQuantity} pcs
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 font-medium">{product.paymentOption}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleHome(product._id, product.showOnHome)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                          product.showOnHome 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {product.showOnHome ? '✓ Visible' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowViewModal(true);
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.productName)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Details Modal */}
      {showViewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Product Details</h3>
                  <p className="text-blue-100 text-sm mt-1">Complete product information</p>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg text-white transition"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Image */}
                <div>
                  <img
                    src={selectedProduct.images?.[0] || selectedProduct.image}
                    alt={selectedProduct.productName}
                    className="w-full h-80 object-cover rounded-xl shadow-lg mb-4"
                  />
                  
                  {/* Badges */}
                  <div className="flex gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryBadge(selectedProduct.category)}`}>
                      {selectedProduct.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      {selectedProduct.paymentOption}
                    </span>
                    {selectedProduct.showOnHome && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                         On Homepage
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.productName}</h4>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>

                  {/* Price Box */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-green-700 mb-1">Unit Price</p>
                    <p className="text-4xl font-bold text-green-600">{selectedProduct.price}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-xs text-blue-600 mb-1">Available Stock</p>
                      <p className="text-2xl font-bold text-blue-700">{selectedProduct.availableQuantity} pcs</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-xs text-purple-600 mb-1">Minimum Order</p>
                      <p className="text-2xl font-bold text-purple-700">{selectedProduct.moq} pcs</p>
                    </div>
                  </div>

                  {/* Total Value */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Total Inventory Value</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {((selectedProduct.price || 0) * (selectedProduct.availableQuantity || 0)).toLocaleString()}
                    </p>
                  </div>

                  {/* Created Date */}
                  <div className="text-xs text-gray-500 pt-4 border-t">
                    <p>Created: {new Date(selectedProduct.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;