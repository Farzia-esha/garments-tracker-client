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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/testimonials`); // your backend endpoint
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

