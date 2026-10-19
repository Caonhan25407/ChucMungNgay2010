import React from 'react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import sceneArtwork from '../assets/images/vietnam_women_day_scene_1792419955490.jpg';

interface LetterCardProps {
  onReopenEnvelope: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ onReopenEnvelope }) => {
  // Rich, longer, heartfelt message for 20/10 with multiple warm paragraphs
  const paragraphs = [
    'Nhân ngày Phụ Nữ Việt Nam 20/10, xin gửi trọn vẹn những lời chúc tốt đẹp, bình yên và ngọt ngào nhất đến một nửa thế giới tuyệt vời!',
    'Cảm ơn bạn vì đã luôn hiện diện với tất cả sự dịu dàng, nụ cười tỏa nắng và tấm lòng ấm áp bao dung. Dù là người bà, người mẹ, người vợ, cô giáo hay người chị, người em bè bạn — bạn đều là đóa hoa rạng ngời và quý giá nhất của cuộc đời.',
    'Chúc bạn luôn dồi dào sức khỏe, luôn tự tin tỏa sáng theo cách riêng của mình, mỗi ngày trôi qua đều ngập tràn niềm vui, được yêu thương và nâng niu trọn vẹn!'
  ];

  const handleBurstFlower = () => {
    confetti({
      particleCount: 55,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af', '#fbbf24', '#ffffff']
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-2 sm:py-6 px-1 sm:px-4 animate-fadeIn">
      {/* Top Navigation: Re-open envelope */}
      <div className="w-full flex items-center justify-start gap-2 mb-3 px-1 max-w-4xl">
        <button
          onClick={onReopenEnvelope}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-rose-800 hover:text-rose-950 bg-white/90 hover:bg-white px-4 py-1.5 rounded-full border border-rose-200/90 shadow-xs transition-colors cursor-pointer"
          title="Đóng thư và mở lại phong bì"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Mở lại phong thư</span>
        </button>
      </div>

      {/* Main Greeting Card Art Piece (Matching uploaded image layout, with an elongated letter card) */}
      <div className="relative w-full bg-[#fff7ef] rounded-3xl shadow-2xl border-2 sm:border-4 border-rose-200/90 overflow-hidden">
        {/* Responsive Art Canvas - Generous height to accommodate the longer letter */}
        <div className="relative w-full min-h-[580px] sm:min-h-[640px] md:h-[720px]">
          {/* Full bleed illustration: Flowers around, sweet girl holding bouquet on right */}
          <img
            src={sceneArtwork}
            alt="Tranh vẽ chúc mừng Ngày Phụ Nữ Việt Nam 20/10"
            className="w-full h-full object-cover object-[80%_center] sm:object-center select-none"
            loading="eager"
          />

          {/* Elongated Stationery Letter Note Box (Taller and spacious to write much more) */}
          <div className="absolute top-[4%] sm:top-[6%] md:top-[8%] left-[2.5%] sm:left-[5%] md:left-[6%] w-[66%] sm:w-[54%] md:w-[50%] z-10">
            <div
              onClick={handleBurstFlower}
              className="relative bg-[#fffdf7]/95 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 shadow-xl border-2 sm:border-4 border-[#e8d5be] transition-transform duration-300 hover:scale-[1.01] cursor-pointer flex flex-col justify-between"
              style={{
                boxShadow: '0 16px 36px -6px rgba(225, 29, 72, 0.16), 0 4px 14px rgba(0,0,0,0.06)'
              }}
            >
              {/* Inner delicate border */}
              <div className="absolute inset-1 sm:inset-1.5 md:inset-2 rounded-xl sm:rounded-2xl border border-[#ebd8c2]/80 pointer-events-none" />

              {/* Header: CHÚC MỪNG NGÀY */}
              <div className="text-center pt-0.5 pb-1 sm:pb-2 border-b border-dashed border-[#e6d3bc]">
                <span className="text-[9px] sm:text-xs md:text-sm tracking-[0.22em] font-semibold text-stone-700 uppercase">
                  CHÚC MỪNG NGÀY
                </span>

                {/* Calligraphic 20/10 cursive script */}
                <div className="my-0">
                  <h2
                    className="font-calligraphy text-4xl sm:text-6xl md:text-7xl text-stone-900 italic select-none leading-none tracking-normal"
                    style={{ textShadow: '1px 2px 4px rgba(225, 29, 72, 0.1)' }}
                  >
                    20/10
                  </h2>
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-600 font-semibold mt-0.5">
                  Ngày Phụ Nữ Việt Nam
                </div>
              </div>

              {/* Elongated Lined Stationery Paper Body with Ample Space */}
              <div
                className="pt-3 sm:pt-4 px-1 min-h-[260px] sm:min-h-[320px] md:min-h-[380px] max-h-[420px] overflow-y-auto space-y-3"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #f2e6d6 23px, #f2e6d6 24px)',
                  lineHeight: '24px'
                }}
              >
                {paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-stone-800 text-[11px] sm:text-xs md:text-[13.5px] font-normal leading-[24px] sm:leading-[25px] text-justify tracking-normal"
                  >
                    {para}
                  </p>
                ))}

                {/* Closing quote */}
                <div className="pt-2 text-center">
                  <p className="font-serif-display italic text-[11px] sm:text-xs md:text-sm text-rose-800 font-medium leading-relaxed">
                    
                  </p>
                </div>
              </div>

              {/* Subtle heart footer accent */}
              <div className="mt-3 pt-2 border-t border-rose-100/90 flex items-center justify-between text-rose-500 text-[10px] sm:text-xs font-medium px-1">
                <span className="font-script text-rose-800 text-xs sm:text-sm"></span>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-400" />
                  <span>LIÊN CHI HỘI KHOA MMT&TT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="bg-gradient-to-r from-rose-200/80 via-pink-100/90 to-rose-200/80 py-2.5 px-4 text-center border-t border-rose-200 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-rose-900">
          
          <span>Chúc mừng Ngày Phụ Nữ Việt Nam 20/10 — Mãi dịu dàng & rạng rỡ!</span>
          
        </div>
      </div>
    </div>
  );
};
