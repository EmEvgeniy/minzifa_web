import { Destinations } from '@/components';
import { Hero, Info, Info2, Mission, Values } from '@/components/About';
import { Reviews } from '@/components/UI/Reviews/Reviews';
import React from 'react';

export default function page() {
  return (
    <>
      <Hero />
      <Info />
      <Info2 />
      <Mission />
      <Values />
      <Reviews />
      <Destinations />
    </>
  );
}
