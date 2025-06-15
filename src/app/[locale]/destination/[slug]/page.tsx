import { Articles } from '@/components';
import { Hero, Tours } from '@/components/Destination';
import { Reviews } from '@/components/UI/Reviews/Reviews';
import React from 'react';

export default function page() {
  return (
    <>
      <Hero />
      <Tours />
      <Reviews />
      <Articles />
    </>
  );
}
