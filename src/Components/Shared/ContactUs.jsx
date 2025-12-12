import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";

const ContactUs = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);

    const handleSearch = e => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];
            console.log(district, coord)
            mapRef.current.flyTo(coord, 14);
        }
    }

    return (
        <div>
            <h2 className="text-5xl">We are available in 64 districts</h2>
            <div className='flex justify-center '>
                {/* search  */}
                <form onSubmit={handleSearch}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" className="grow" name="location" placeholder="Search" />
                    </label>
                </form>
            </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side */}
            <div className='border w-full h-[400px]'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-full'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        serviceCenters.map((center, index) => <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(', ')}.
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>

                    {/* Right Side - Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Get In Touch</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-400 p-4 rounded">
                                        <MapPin className="text-white " size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">Location</h4>
                                        <p className="text-gray-600">
                                           House 12, Road 5, Dhanmondi, Dhaka
                                        </p>
                                    </div>
                                </div>
                                {/* Call Us */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-teal-500 p-4 rounded">
                                        <Phone className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">Call Us</h4>
                                        <p className="text-gray-600">
                                            +880 1234-567890
                                        </p>
                                    </div>
                                </div>
                                {/* Email Information */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-gray-400 p-4 rounded">
                                        <Mail className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">Email Information</h4>
                                        <p className="text-gray-600">
                                            support@garmenttrack.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Social Media</h3>
                            <div className="flex space-x-3">
                              <a href="https://www.facebook.com" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-600 transition">
                                <Facebook className="w-5 h-5" />
                              </a>
                              <a href="https://x.com" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-400 transition">
                                <FaXTwitter className="w-5 h-5" />
                              </a>
                              <a href="https://www.instagram.com" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-pink-600 transition">
                                <Instagram className="w-5 h-5" />
                              </a>
                              <a href="https://www.linkedin.com" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-sky-600 transition">
                                <Linkedin className="w-5 h-5" />
                              </a>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
                

        </div>
    );
};

export default ContactUs;



