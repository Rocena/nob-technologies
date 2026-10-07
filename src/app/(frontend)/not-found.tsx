import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GlowButton } from '@/components/GlowButton';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 bg-[#020617] relative overflow-hidden">
        {/* Background grid glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(0,212,255,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Glitch 404 */}
          <div className="relative inline-block mb-6" aria-label="404">
            <span
              className="font-mono text-[clamp(6rem,20vw,12rem)] font-black leading-none select-none"
              style={{
                color: '#00D4FF',
                textShadow: '0 0 40px rgba(0,212,255,0.5)',
                animation: 'glitch 2.5s infinite',
              }}
            >
              404
            </span>
          </div>

          {/* Subtitle */}
          <h1 className="text-xl sm:text-2xl font-semibold text-white mb-3">
            Cette page semble avoir été déconnectée.
          </h1>

          {/* Terminal line */}
          <p className="font-mono text-sm sm:text-base text-accent/70 bg-white/5 border border-white/10 rounded px-4 py-3 mb-10 text-left max-w-md mx-auto">
            <span className="text-accent">{'>'}</span>{' '}
            <span className="text-white/60">ERROR:</span> Page not found at path{' '}
            <span className="text-red-400">/???</span>
            <span className="inline-block w-2 h-4 bg-accent/70 ml-1 align-middle animate-pulse" />
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton href="/">
              Retourner à l&apos;accueil
            </GlowButton>
            <Link
              href="/services"
              className="text-sm font-medium text-white/60 hover:text-accent transition-colors underline underline-offset-4"
            >
              Voir nos services
            </Link>
          </div>
        </div>

        {/* CSS glitch keyframes injected via style tag */}
        <style>{`
          @keyframes glitch {
            0%, 90%, 100% {
              text-shadow: 0 0 40px rgba(0,212,255,0.5);
              transform: translate(0);
            }
            92% {
              text-shadow: -3px 0 #ff00c8, 3px 0 #00D4FF;
              transform: translate(-2px, 0);
            }
            94% {
              text-shadow: 3px 0 #ff00c8, -3px 0 #00D4FF;
              transform: translate(2px, 0);
            }
            96% {
              text-shadow: -2px 0 #ff00c8, 2px 0 #00D4FF;
              transform: translate(-1px, 1px);
            }
            98% {
              text-shadow: 2px 0 #ff00c8, -2px 0 #00D4FF;
              transform: translate(1px, -1px);
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
