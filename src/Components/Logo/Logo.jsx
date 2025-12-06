import { ShoppingBag } from 'lucide-react';
import React from 'react';

const Logo = () => {
    return (
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Garment<span className="text-yellow-400 text-[18px] py-2">Track</span></h3>
                <p className="text-xs text-gray-100 ">Smart Production System</p>
              </div>
            </div>
    );
};

export default Logo;