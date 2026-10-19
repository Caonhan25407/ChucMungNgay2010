import React from 'react';
import { Mail, Sparkles, Heart, ArrowRight } from 'lucide-react';
import floralBg from '../assets/images/landing_floral_bg_1792420849544.jpg';

interface LandingHeroProps {
  onOpenCard: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onOpenCard }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background floral image */}
      <div className="absolute inset-0 z-0">
        <img
          src={floralBg}
          alt="Hoa hồng nở rộ Ngày Phụ Nữ Việt Nam"
          className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
        />
        {/* Soft pastel translucent gradient over background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff5f6]/75 via-[#fff8f5]/60 to-[#fce4ec]/75 backdrop-blur-[1.5px]" />
      </div>

      {/* Center Frosted Glass Card for Graceful Typography */}
      <div className="relative z-10 w-full max-w-2xl bg-[#fffdfa]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(225,29,72,0.15)] border-2 sm:border-4 border-[#ecd7b8]/95 text-center animate-fadeIn">
        {/* Top soft subtitle ornament (Preserved user's custom text) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/70 border border-rose-200/90 text-rose-700 text-xs sm:text-sm font-script tracking-wider mb-4 shadow-xs">
          
          <span>Liên Chi hội Khoa mạng máy tính & Truyền thông</span>
          
        </div>

        {/* Delicate & Soft Typography */}
        <div className="space-y-1 mb-2">
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-rose-800/90 tracking-wide font-normal">
            Chúc Mừng Ngày
          </h2>
          <h1 className="font-serif-display italic font-semibold text-4xl sm:text-5xl md:text-6xl text-rose-600 tracking-tight leading-tight py-1">
            Phụ Nữ Việt Nam
          </h1>
        </div>

        {/* Calligraphic 20/10 date */}
        <div className="relative my-2 select-none">
          <div className="font-calligraphy text-7xl sm:text-8xl md:text-9xl text-stone-800 font-normal drop-shadow-xs">
            20/10
          </div>
          <div className="absolute top-2 right-12 sm:right-24 animate-pulse">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-300" />
          </div>
        </div>

        {/* Soft Emotional Quote */}
        <p className="font-serif-display italic max-w-lg mx-auto text-stone-700 text-sm sm:text-base md:text-lg font-normal leading-relaxed mt-2 mb-8">
          &ldquo;Gửi trọn yêu thương, sự trân quý và muôn vàn lời chúc ngọt ngào nhất
          đến những đóa hoa dịu dàng và rạng rỡ nhất của cuộc đời.&rdquo;
        </p>

        {/* CTA BUTTON: Màu hồng tươi ngọt ngào, đậm vừa phải, hài hòa với nền hồng nhạt */}
        <div className="relative inline-block group">
          {/* Animated radiant pink halo */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:scale-105 animate-pulse" />

          <button
            onClick={onOpenCard}
            className="relative flex items-center justify-center gap-3.5 px-8 sm:px-11 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 hover:from-rose-600 hover:via-pink-600 hover:to-rose-500 text-white font-semibold text-base sm:text-lg shadow-xl shadow-rose-400/30 border border-white/50 transition-all duration-300 transform group-hover:-translate-y-1 active:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-rose-200 cursor-pointer"
            aria-label="Mở bìa thư chúc mừng"
          >
            {/* Elegant Mail Icon */}
            <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Mail className="w-4 h-4 text-white" />
            </div>

            <span className="tracking-wide font-sans">Mở Bìa Thư Chúc Mừng</span>

            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

        {/* Gentle Hint */}
        <p className="mt-4 text-xs text-rose-800/70 font-sans flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
          <span>Chạm vào để mở phong thư và đón nhận yêu thương</span>
        </p>
      </div>
    </div>
  );
};
