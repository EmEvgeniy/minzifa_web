'use client';
import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.querySelectorAll('source').forEach((source) => {
          const el = source as HTMLSourceElement;
          if (el.dataset.src) el.src = el.dataset.src;
        });

        video.load();

        video.play().catch((err) => {
          console.warn('Autoplay blocked:', err);
        });

        observer.disconnect();
      }
    });

    observer.observe(video);
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      className="absolute top-0 left-0 w-full h-full object-cover z-10 opacity-0 transition-opacity duration-700"
      poster="/home/hero-poster.webp"
      onLoadedData={(e) => e.currentTarget.classList.add('opacity-100')}
    >
      <source data-src="/home/output-optimized.webm" type="video/webm" />
      <source data-src="/home/output-optimized.mp4" type="video/mp4" />
    </video>
  );
}
