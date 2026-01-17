
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Star} from 'lucide-react';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('https://garments-tracker-system.vercel.app/banners')
      .then(res => res.json())
      .then(data => setBanners(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!banners.length) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners.length) return null;

  const currentBanner = banners[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative h-[85vh] overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
      {/* <div className="relative z-10 container mx-auto px-4 h-full flex items-center"> */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img src={currentBanner.image} alt={currentBanner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div className="inline-flex items-center gap-2 bg-yellow-400/20 px-4 py-2 rounded-full mb-6">
                <Star size={18} className="text-yellow-400" /> 
                <span className="text-yellow-400 font-semibold text-sm">{currentBanner.subtitle}</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">{currentBanner.title}</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">{currentBanner.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href={currentBanner.primaryLink} className="px-8 py-4 bg-yellow-400 rounded-xl font-bold text-lg flex items-center gap-2">
                  {currentBanner.primaryCTA} <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      

      <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none">
        <button onClick={prevSlide} className="pointer-events-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><ChevronLeft size={28} /></button>
        <button onClick={nextSlide} className="pointer-events-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><ChevronRight size={28} /></button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {banners.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`${index === currentSlide ? 'w-12 h-3 bg-yellow-400 rounded-full' : 'w-3 h-3 bg-white/50 rounded-full'}`} />
        ))}
      </div>
      {/* Scroll Indicator */}
<motion.div
  initial={{ opacity: 0, y: 0 }}
  animate={{ opacity: 1, y: [0, 10, 0] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
  className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70 flex flex-col items-center"
>
  <span className=" mb-1">Scroll</span>
  <ChevronDown size={25} />
</motion.div>

    </section>
  );
};

export default Banner;

