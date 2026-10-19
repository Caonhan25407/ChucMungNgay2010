/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PetalCanvas } from './components/PetalCanvas';
import { LandingHero } from './components/LandingHero';
import { EnvelopeAnimation } from './components/EnvelopeAnimation';
import { LetterCard } from './components/LetterCard';
import { Heart } from 'lucide-react';

export default function App() {
  const [viewState, setViewState] = useState<'landing' | 'animating_envelope' | 'letter'>('landing');

  // Support ?autostart=1 to jump directly to letter card
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setViewState('letter');
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#fff5f5] via-[#fff0f2] to-[#fde2e4] overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      {/* Background Falling Flower Petals Canvas */}
      <PetalCanvas petalDensity="medium" />

      {/* Warm Ambient Radial Glows */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-pink-200/25 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* Main Container */}
      <main className="relative z-20 min-h-screen flex flex-col justify-between">
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
          <div className="py-4 px-2 sm:px-4 flex-1 flex flex-col justify-center">
            {/* Top Navigation Back to Landing */}
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between mb-2 px-2">
              <button
                onClick={() => setViewState('landing')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-rose-700 hover:text-rose-950 bg-white/80 hover:bg-white px-3.5 py-1.5 rounded-full border border-rose-200/80 shadow-xs transition-colors cursor-pointer"
                aria-label="Quay về trang chính"
              >
                <span>&larr;</span> Trang chính
              </button>
            </div>

            <LetterCard onReopenEnvelope={() => setViewState('animating_envelope')} />
          </div>
        )}

        {/* Minimal Footer */}
        <footer className="relative z-20 text-center py-4 text-xs text-rose-800/60 flex items-center justify-center gap-1.5">
          <span>Ngày Phụ Nữ Việt Nam 20/10</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
          <span>Trao gửi yêu thương</span>
        </footer>
      </main>
    </div>
  );
}
