import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { X } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const AddProduct = () => {
  const {register,handleSubmit,formState: { errors }, watch,setValue,} =useForm();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const imageKey = import.meta.env.VITE_IMGBB_KEY;

  const showOnHome = watch('showOnHome', false);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    setValue('image', null);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      let uploadedImageUrl = '';
      if (data.image?.[0]) {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        const uploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imageKey}`,
          formData
        );

        uploadedImageUrl = uploadRes.data.data.url;
      }

      const productData = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        quantity: Number(data.quantity),
        minOrder: Number(data.minOrder),
        image: uploadedImageUrl,
        demoVideo: data.demoVideo || '',
        paymentMode: data.paymentMode,
        showOnHome: data.showOnHome || false,
        createdBy: user?.email,
        createdAt: new Date(),
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Product Added Successfully!',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/dashboard/manage-products');
      } else {
        throw new Error('Failed to add product');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add Product</h2>
        <p className="text-gray-600">
          Fill the form to create a new product for the inventory
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'Product name is required' })}
              className={`w-full px-4 py-3 border-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-xl`}
              placeholder="Enter product name"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              {...register('description', { required: 'Description is required' })}
              className={`w-full px-4 py-3 border-2 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-xl`}
              placeholder="Write full product details..."
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register('category', { required: 'Select category' })}
              className={`w-full px-4 py-3 border-2 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } rounded-xl`}
              disabled={isLoading}
            >
              <option value="">Select category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
              <option value="Dress">Dress</option>
              <option value="T-Shirt">T-Shirt</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Price + Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Price (BDT) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 1, message: 'Min price is 1' },
                })}
                className={`w-full px-4 py-3 border-2 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                } rounded-xl`}
                placeholder="0"
                disabled={isLoading}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Available Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('quantity', {
                  required: 'Quantity is required',
                  min: { value: 1, message: 'Min quantity is 1' },
                })}
                className={`w-full px-4 py-3 border-2 ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                } rounded-xl`}
                placeholder="0"
                disabled={isLoading}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          {/* Minimum Order */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Minimum Order Quantity (MOQ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('minOrder', {
                required: 'MOQ is required',
                min: { value: 1, message: 'Min MOQ is 1' },
              })}
              className={`w-full px-4 py-3 border-2 ${
                errors.minOrder ? 'border-red-500' : 'border-gray-300'
              } rounded-xl`}
              placeholder="0"
              disabled={isLoading}
            />
            {errors.minOrder && (
              <p className="text-red-500 text-sm mt-1">{errors.minOrder.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Product Image <span className="text-red-500">*</span>
            </label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={clearImagePreview}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-gray-400 rounded-xl p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  {...register('image', { required: 'Image is required' })}
                  onChange={handleImagePreview}
                  disabled={isLoading}
                />
              </div>
            )}

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>
          {/* Payment Mode */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select
              {...register('paymentMode', { required: 'Select payment method' })}
              className={`w-full px-4 py-3 border-2 ${
                errors.paymentMode ? 'border-red-500' : 'border-gray-300'
              } rounded-xl`}
              disabled={isLoading}
            >
              <option value="">Select payment option</option>
              <option value="Cash On Delivery">Cash On Delivery</option>
              <option value="Online Payment">Online Payment</option>
            </select>
            {errors.paymentMode && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentMode.message}</p>
            )}
          </div>

          {/* Show on Home */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('showOnHome')}
              className="w-5 h-5 mr-3"
              disabled={isLoading}
            />
            <p className="text-sm text-gray-700">Show this product on home page</p>
          </div>

          {showOnHome && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-blue-700 text-sm">This product will appear on homepage</p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700"
          >
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
