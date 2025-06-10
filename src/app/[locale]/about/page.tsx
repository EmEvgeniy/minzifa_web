import { Destinations } from '@/components';
import { Hero, Info, Info2, Mission, Values } from '@/components/About';
import React from 'react';

export default function page() {
  return (
    <>
      <Hero />
      <Info />
      <Info2 />
      <Mission />
      <Values />
      <Destinations />
    </>
  );
}
