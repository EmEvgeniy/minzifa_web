'use client';
import React from 'react';

export const HeroVideoBg = () => {
  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover z-10"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/output.mp4" type="video/mp4" />
    </video>
  );
};
