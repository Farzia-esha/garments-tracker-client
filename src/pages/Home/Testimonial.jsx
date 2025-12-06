import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Star, CheckCircle2, Building2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const ReviewCard = ({ review }) => (
  <div className=" bg-white rounded-3xl shadow-2xl p-6 md:p-8  flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer">
    <div className="relative mb-4 md:mb-6">
      <div className="w-20 h-20 md:w-20 md:h-24 rounded-full overflow-hidden ring-4 ring-indigo-200 shadow-xl mx-auto">
        <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
        <CheckCircle2 className="text-white" size={16} />
      </div>
    </div>

    <h3 className="text-lg md:text-xl font-bold mb-1">{review.name}</h3>
    <p className="text-indigo-600 font-semibold text-sm md:text-base mb-2">{review.role}</p>

    {review.company && (
      <div className="flex items-center justify-center gap-1 md:gap-2 text-gray-500 text-xs md:text-sm mb-2">
        <Building2 size={14} /> <span>{review.company}</span>
      </div>
    )}

    <div className="flex gap-1 mb-3 md:mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>

    <blockquote className="italic text-gray-700 text-sm md:text-base">"{review.comment}"</blockquote>
  </div>
);

const Testimonial = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/testimonials'); // your backend endpoint
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedbacks();
  }, []);

  if (feedbacks.length === 0) return <p className="text-center mt-20">Loading testimonials...</p>;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="text-center mb-12 md:mb-16 px-4 md:px-0">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
          Customer <span className="text-indigo-600">Feedback</span>
        </h2>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
          Trusted by industry leaders worldwide
        </p>
      </div>

      <Swiper
        loop={true}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 200,
          modifier: 1,
          scale: 0.8,
          slideShadows: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="max-w-6xl mx-auto px-4 md:px-0"
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback.id}>
            <ReviewCard review={feedback} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, Building2 } from 'lucide-react';

// const Testimonial = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [direction, setDirection] = useState(0);

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//         const res = await axios.get('http://localhost:3000/testimonials');
//         setFeedbacks(res.data);
      
//     };
//     fetchFeedbacks();
//   }, []);

//   useEffect(() => {
//     if (isPaused || feedbacks.length === 0) return;

//     const interval = setInterval(() => {
//       setDirection(1);
//       setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [isPaused, feedbacks]);

//   const nextFeedback = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
//   };

//   const prevFeedback = () => {
//     setDirection(-1);
//     setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
//   };

//   const goToSlide = (index) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   if (feedbacks.length === 0) return <p className="text-center mt-20">Loading testimonials...</p>;

//   const currentFeedback = feedbacks[currentIndex];

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0
//     })
//   };

//   return (
//     <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <motion.h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
//             Customer <span className="text-indigo-600">Feedback</span>
//           </motion.h2>
//           <motion.p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Trusted by industry leaders worldwide
//           </motion.p>
//         </div>

//         {/* Carousel */}
//         <div
//           className="max-w-6xl mx-auto"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <div className="relative">
//             <AnimatePresence initial={false} custom={direction} mode="wait">
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
//                 className="bg-white rounded-3xl shadow-2xl overflow-hidden"
//               >
//                 <div className="grid md:grid-cols-5 gap-8">
//                   <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12 flex flex-col justify-center items-center text-white relative">
//                     <div className="absolute top-8 left-8 opacity-20"><Quote size={80} /></div>
//                     <div className="relative mb-6 z-10">
//                       <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-2xl">
//                         <img src={currentFeedback.image} alt={currentFeedback.name} className="w-full h-full object-cover" />
//                       </div>
//                       <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
//                         <CheckCircle2 className="text-white" size={20} />
//                       </div>
//                     </div>
//                     <div className="text-center z-10">
//                       <h3 className="text-2xl font-bold mb-2">{currentFeedback.name}</h3>
//                       <p className="text-white/90 font-semibold mb-2">{currentFeedback.role}</p>
//                       {currentFeedback.company && <div className="flex items-center justify-center gap-2 text-white/80 text-sm"><Building2 size={16} /><span>{currentFeedback.company}</span></div>}
//                     </div>
//                     <div className="flex gap-1 mt-6 z-10">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} size={24} className={`${i < currentFeedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`} />
//                       ))}
//                     </div>
//                   </div>

//                   <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
//                     <div className="mb-6">
//                       <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
//                         <Quote className="text-indigo-600" size={32} />
//                       </div>
//                     </div>
//                     <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
//                       "{currentFeedback.comment}"
//                     </blockquote>
//                     {currentFeedback.location && <div className="flex items-center gap-2 text-gray-500 text-sm">📍 {currentFeedback.location}</div>}
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             <button onClick={prevFeedback} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-full shadow-2xl flex items-center justify-center z-20"><ChevronLeft size={28} /></button>
//             <button onClick={nextFeedback} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-full shadow-2xl flex items-center justify-center z-20"><ChevronRight size={28} /></button>
//           </div>

//           <div className="mt-12 flex flex-col items-center gap-6">
//             <div className="flex gap-3">
//               {feedbacks.map((_, index) => (
//                 <button key={index} onClick={() => goToSlide(index)} className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-12 h-3 bg-indigo-600' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'}`} />
//               ))}
//             </div>
//             <div className="text-center">
//               <span className="text-gray-600 font-semibold">{currentIndex + 1} / {feedbacks.length}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;