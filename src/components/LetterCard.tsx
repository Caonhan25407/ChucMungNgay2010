import React from 'react';
import { ArrowLeft, Heart, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import sceneArtwork from '../assets/images/vietnam_women_day_scene_1792419955490.jpg';

interface LetterCardProps {
  onBackHome: () => void;
  onReopenEnvelope: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ onBackHome, onReopenEnvelope }) => {
  // Rich, longer, heartfelt message for 20/10 with multiple warm paragraphs
  const paragraphs = [
    'Nhân ngày Phụ nữ Việt Nam 20/10, thay mặt tập thể Liên Chi hội, mình xin gửi đến các bạn những lời chúc tốt đẹp nhất!',
    'Chúc các bạn luôn rạng rỡ, vui vẻ, tràn đầy năng lượng và gặt hái được nhiều thành công trong học tập cũng như trong các hoạt động phong trào. Cảm ơn các bạn đã luôn là những mảnh ghép tuyệt vời, mang đến sự nhiệt huyết và đóng góp rất nhiều cho sự phát triển chung của tập thể.',
    'Đặc biệt, chúng mình còn chuẩn bị một phần quà nho nhỏ dành tặng tất cả các bạn. Bạn hãy ghé thư viện A trong ngày 20/10 để nhận “bất ngờ đặc biệt” mà các bạn nam Liên Chi hội đã chuẩn bị nhé!',
    'Một lần nữa, chúc các bạn có một ngày 20/10 thật ý nghĩa, trọn vẹn và nhận được thật nhiều niềm vui!',
    'Thân mến./.'
  ];

  const handleBurstFlower = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    confetti({
      particleCount: 55,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af', '#fbbf24', '#ffffff']
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl animate-fadeIn px-3 sm:px-5 lg:px-6">
      <nav
        aria-label="Điều hướng thiệp"
        data-view-focus="letter"
        tabIndex={-1}
        className="sticky top-0 z-30 mb-3 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-2xl border border-white/80 bg-[#fff8fa]/90 p-2 shadow-sm backdrop-blur-md focus:outline-none sm:top-3"
      >
        <button
          onClick={onBackHome}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-rose-200/90 bg-white/90 px-4 py-2 text-sm font-medium text-rose-800 shadow-xs transition hover:border-rose-300 hover:bg-white hover:text-rose-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
          aria-label="Quay về trang chính"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Trang chính</span>
        </button>

        <button
          onClick={onReopenEnvelope}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-rose-200/90 bg-white/90 px-4 py-2 text-sm font-medium text-rose-800 shadow-xs transition hover:border-rose-300 hover:bg-white hover:text-rose-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
          title="Đóng thư và mở lại phong bì"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span className="sm:hidden">Mở lại</span>
          <span className="hidden sm:inline">Mở lại phong thư</span>
        </button>
      </nav>

      <article
        aria-labelledby="greeting-card-title"
        className="relative w-full overflow-hidden rounded-[1.75rem] border-2 border-rose-200/90 bg-[#fff7ef] shadow-[0_24px_60px_-24px_rgba(190,24,93,0.45)] sm:border-4"
      >
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:h-[810px] lg:aspect-auto">
            <img
              src={sceneArtwork}
              alt="Tranh vẽ chúc mừng Ngày Phụ Nữ Việt Nam 20/10"
              className="absolute inset-0 h-full w-full select-none object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fff7ef] to-transparent lg:hidden" />
            <div className="absolute inset-0 hidden bg-gradient-to-r from-[#fff7ef]/35 via-transparent to-transparent lg:block" />
          </div>

          <div className="relative z-10 mx-3 -mt-8 mb-4 max-w-2xl sm:mx-auto sm:w-[calc(100%-3rem)] lg:absolute lg:left-[5%] lg:top-[5%] lg:mx-0 lg:mb-0 lg:mt-0 lg:w-[50%] lg:max-w-none">
            <div
              className="relative rounded-2xl border-2 border-[#e8d5be] bg-[#fffdf7]/97 p-5 shadow-xl backdrop-blur-xs sm:rounded-3xl sm:border-4 sm:p-6 lg:p-5 xl:p-7"
              style={{
                boxShadow: '0 16px 36px -6px rgba(225, 29, 72, 0.16), 0 4px 14px rgba(0,0,0,0.06)'
              }}
            >
              <div className="pointer-events-none absolute inset-1 rounded-xl border border-[#ebd8c2]/80 sm:inset-2 sm:rounded-2xl" />

              <header className="border-b border-dashed border-[#e6d3bc] pb-3 pt-1 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-700 sm:text-xs">
                  CHÚC MỪNG NGÀY
                </span>

                <h1
                  id="greeting-card-title"
                  className="font-calligraphy select-none text-5xl italic leading-none tracking-normal text-stone-900 sm:text-6xl xl:text-7xl"
                  style={{ textShadow: '1px 2px 4px rgba(225, 29, 72, 0.1)' }}
                >
                  20/10
                </h1>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-rose-600 sm:text-xs">
                  Ngày Phụ Nữ Việt Nam
                </div>
              </header>

              <div
                className="mt-4 space-y-4 px-1 pb-1"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 27px, #f2e6d6 27px, #f2e6d6 28px)'
                }}
              >
                {paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-left text-sm font-normal leading-7 tracking-normal text-stone-800 [text-wrap:pretty]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-rose-100/90 px-1 pt-3 text-[11px] font-medium text-rose-700 sm:text-xs">
                <button
                  type="button"
                  onClick={handleBurstFlower}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-rose-800 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
                  aria-label="Thả hoa chúc mừng"
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Thả hoa</span>
                </button>

                <div className="flex items-center gap-1 text-right">
                  <Heart className="h-3 w-3 fill-rose-400" aria-hidden="true" />
                  <span>LIÊN CHI HỘI KHOA MMT&amp;TT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-center border-t border-rose-200 bg-gradient-to-r from-rose-200/80 via-pink-100/90 to-rose-200/80 px-4 py-3 text-center text-xs font-medium leading-relaxed text-rose-900 sm:text-sm">
          <span className="min-w-0 [text-wrap:balance]">
            Chúc mừng Ngày Phụ Nữ Việt Nam 20/10 — Mãi dịu dàng &amp; rạng rỡ!
          </span>
        </div>
      </article>
    </div>
  );
};
