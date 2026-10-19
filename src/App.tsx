/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { PetalCanvas } from './components/PetalCanvas';
import { LandingHero } from './components/LandingHero';
import { EnvelopeAnimation } from './components/EnvelopeAnimation';
import { LetterCard } from './components/LetterCard';
import { Heart } from 'lucide-react';

export default function App() {
  const isFirstRender = useRef(true);
  const [viewState, setViewState] = useState<'landing' | 'animating_envelope' | 'letter'>(() => {
    if (typeof window === 'undefined') return 'landing';

    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') === '1' ? 'letter' : 'landing';
  });

  // Keep every view transition anchored to the top of the page.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      const focusTarget = document.querySelector<HTMLElement>(`[data-view-focus="${viewState}"]`);
      focusTarget?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [viewState]);

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden bg-gradient-to-b from-[#fff5f5] via-[#fff0f2] to-[#fde2e4] selection:bg-rose-200 selection:text-rose-900">
      {/* Background Falling Flower Petals Canvas */}
      <PetalCanvas petalDensity="medium" />

      {/* Warm Ambient Radial Glows */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-pink-200/25 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* Main Container */}
      <main className="relative z-20 flex min-h-svh flex-col">
        {viewState === 'landing' && (
          <LandingHero onOpenCard={() => setViewState('animating_envelope')} />
        )}

        {viewState === 'animating_envelope' && (
          <EnvelopeAnimation
            onOpened={() => setViewState('letter')}
            onCancel={() => setViewState('landing')}
          />
        )}

        {viewState === 'letter' && (
          <section className="flex-1 py-3 sm:py-8" aria-label="Thiệp chúc mừng ngày 20 tháng 10">
            <LetterCard
              onBackHome={() => setViewState('landing')}
              onReopenEnvelope={() => setViewState('animating_envelope')}
            />
          </section>
        )}

        {/* Minimal Footer */}
        <footer className="relative z-20 mt-auto flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 px-4 py-4 text-center text-xs leading-relaxed text-rose-900/85">
          <span>Ngày Phụ Nữ Việt Nam 20/10</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
          <span>Trao gửi yêu thương</span>
        </footer>
      </main>
    </div>
  );
}
