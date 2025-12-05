import { Link } from 'react-router';
import { ShoppingBag, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">Garment<span className="text-yellow-400 text-[18px] py-2">Track</span></h3>
                <p className="text-xs text-gray-400">Smart Production System</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A complete production and order tracking solution for garment factories. Manage workflow effortlessly with real-time monitoring.
            </p>

            {/* Social link*/}
            <div className="flex space-x-3">
              <a href="https://www.facebook.com" className="w-9 h-9 bg-gray-800 flex items-center justify-center rounded-full hover:bg-blue-600 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com" className="w-9 h-9 bg-gray-800 flex items-center justify-center rounded-full hover:bg-blue-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" className="w-9 h-9 bg-gray-800 flex items-center justify-center rounded-full hover:bg-pink-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com" className="w-9 h-9 bg-gray-800 flex items-center justify-center rounded-full hover:bg-sky-600 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">

              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition flex items-center group">
                  <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/all-products" className="text-gray-400 hover:text-yellow-400 transition flex items-center group">
                  <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition flex items-center group">
                  <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition flex items-center group">
                  <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-400 text-sm">

              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-0.5" />
                <span>House 12, Road 5, Dhanmondi, Dhaka</span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span>+880 1234-567890</span>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span>support@garmenttrack.com</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">

              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition flex items-center group">
                  <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 transition-all mr-2"></span>
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition flex items-center group">
                  <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 transition-all mr-2"></span>
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition flex items-center group">
                  <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 transition-all mr-2"></span>
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-3 mt-2">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} GarmentTrack. All rights reserved. Made with 💛 in Bangladesh.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
