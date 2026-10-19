import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeAnimationProps {
  onOpened: () => void;
  onCancel?: () => void;
}

export const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ onOpened, onCancel }) => {
  const [isOpenStage, setIsOpenStage] = useState<'sealed' | 'unsealing' | 'opening' | 'letter-rising' | 'done'>('sealed');

  const handleOpen = () => {
    if (isOpenStage !== 'sealed') return;

    // Trigger gentle floral confetti
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fda4af', '#fbcfe8', '#fde047', '#ffffff']
    });

    setIsOpenStage('unsealing');

    setTimeout(() => {
      setIsOpenStage('opening');
    }, 450);

    setTimeout(() => {
      setIsOpenStage('letter-rising');
    }, 1100);

    setTimeout(() => {
      setIsOpenStage('done');
      onOpened();
    }, 1900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-rose-100/90 via-pink-100/85 to-rose-200/90 backdrop-blur-md transition-opacity duration-500 animate-fadeIn">
      {/* Soft ambient blurs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md flex flex-col items-center z-10">
        {/* Envelope Container (Bìa thư màu hồng nhạt, đóng kín 100% không để khoảng hở) */}
        <div
          className="relative w-80 sm:w-96 h-56 sm:h-64 cursor-pointer select-none group perspective-1000"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label="Nhấn để mở phong thư chúc mừng"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
        >
          {/* Back pocket & shadow (Màu hồng nhạt pastel ngọt ngào) */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 rounded-2xl shadow-[0_20px_45px_-10px_rgba(244,114,182,0.35)] border-2 border-pink-300/80 overflow-hidden transform transition-transform group-hover:scale-[1.02] duration-300">
            {/* Inner background pattern */}
            <div className="absolute inset-2 rounded-xl bg-pink-100/80 border border-pink-200/80 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px)] [background-size:14px_14px]" />
            </div>
          </div>

          {/* Letter Peeking / Rising Out */}
          <div
            className={`absolute left-5 right-5 h-52 bg-[#fffdfa] rounded-xl shadow-xl border-2 border-[#e6d3ba] p-5 flex flex-col justify-between transition-all duration-1000 ease-out ${
              isOpenStage === 'letter-rising' || isOpenStage === 'done'
                ? '-translate-y-40 z-30 scale-105 shadow-2xl'
                : isOpenStage === 'opening'
                ? '-translate-y-12 z-10'
                : 'top-3 z-0'
            }`}
          >
            <div className="flex items-center justify-between border-b border-rose-200/80 pb-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-rose-700 font-bold">
                Thư Chúc Mừng 20/10
              </span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-400 animate-pulse" />
            </div>

            <div className="space-y-2 py-2">
              <div className="h-2 bg-pink-200/80 rounded-full w-4/5" />
              <div className="h-2 bg-pink-200/60 rounded-full w-full" />
              <div className="h-2 bg-pink-200/60 rounded-full w-3/4" />
            </div>

            <div className="text-right">
              <span className="font-calligraphy text-2xl text-stone-800">Yêu thương trao gửi...</span>
            </div>
          </div>

          {/* Front Envelope Folds (Hồng nhạt, SVG Overlapping Vector: Kín 100% không để khoảng hở) */}
          <svg
            viewBox="0 0 360 240"
            className="absolute inset-0 w-full h-full z-20 pointer-events-none rounded-2xl overflow-hidden"
          >
            <defs>
              <linearGradient id="foldLeftGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#fdf2f8" />
                <stop offset="100%" stopColor="#fbcfe8" />
              </linearGradient>
              <linearGradient id="foldRightGrad" x1="100%" y1="0%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#fdf2f8" />
                <stop offset="100%" stopColor="#fbcfe8" />
              </linearGradient>
              <linearGradient id="foldBottomGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#fdf2f8" />
              </linearGradient>
              <filter id="seamShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="-2" stdDeviation="2" floodColor="#ec4899" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* Left triangle fold */}
            <path
              d="M 0,0 L 200,120 L 0,240 Z"
              fill="url(#foldLeftGrad)"
              stroke="#f472b6"
              strokeWidth="0.5"
            />

            {/* Right triangle fold */}
            <path
              d="M 360,0 L 160,120 L 360,240 Z"
              fill="url(#foldRightGrad)"
              stroke="#f472b6"
              strokeWidth="0.5"
            />

            {/* Bottom triangle fold - overlaps left & right folds completely with zero gap */}
            <path
              d="M 0,240 L 180,95 L 360,240 Z"
              fill="url(#foldBottomGrad)"
              filter="url(#seamShadow)"
              stroke="#f472b6"
              strokeWidth="0.5"
            />
          </svg>

          {/* Top Flap (Hồng nhạt pastel chuyển màu nhẹ, phủ xuống che kín nếp gấp dưới) */}
          <div
            className={`absolute top-0 left-0 right-0 h-36 origin-top transition-transform duration-700 ease-in-out ${
              isOpenStage === 'sealed'
                ? 'z-30 rotate-x-0'
                : 'z-0 -rotate-x-180 opacity-80'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isOpenStage === 'sealed' ? 'rotateX(0deg)' : 'rotateX(180deg)',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              background: 'linear-gradient(to bottom, #fce7f3, #f472b6)',
              filter: 'drop-shadow(0 5px 7px rgba(244, 114, 182, 0.35))'
            }}
          />

          {/* WAX SEAL (Con dấu trái tim đỏ viền vàng bóng bẩy trên nền bìa thư hồng nhạt) */}
          {isOpenStage === 'sealed' && (
            <div className="absolute top-[4.6rem] sm:top-[5.2rem] left-1/2 -translate-x-1/2 z-40 flex items-center justify-center">
              <div className="relative group/seal transform transition-transform group-hover:scale-110 duration-300">
                {/* Gentle glowing aura */}
                <div className="absolute -inset-2 bg-pink-400/40 rounded-full blur-md opacity-80 group-hover/seal:opacity-100 transition-opacity animate-pulse" />

                {/* Wax Seal with Embossed Heart */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-700 via-rose-500 to-amber-400 shadow-xl border-2 border-amber-300/90 flex flex-col items-center justify-center text-amber-100">
                  <Heart className="w-6 h-6 text-amber-100 fill-amber-100 drop-shadow-md" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Text prompt below envelope (Màu chữ hồng đậm nét rõ trên nền hồng nhạt) */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-rose-900 text-base font-semibold drop-shadow-xs flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
            {isOpenStage === 'sealed'
              ? 'Chạm vào phong thư để mở ra lời chúc...'
              : 'Đang mở bức thư đong đầy cảm xúc...'}
          </p>

          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs text-rose-700 hover:text-rose-950 underline underline-offset-4 font-medium transition-colors cursor-pointer"
            >
              Quay lại trang chính
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
