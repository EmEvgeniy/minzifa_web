import {
  Animal,
  Children,
  Economy,
  Environment,
  Hero,
  Mission,
  Respect,
  Team,
} from '@/components/Eco-travel';
import EnvironmentCircle from '@/components/UI/DynamicCircle/index.desktop';
import React from 'react';

export default function page() {
  return (
    <>
      <Hero />
      <Team />
      <Mission />
      <EnvironmentCircle />
      <Environment />
      <Respect />
      <Children />
      <Animal />
      <Economy />
    </>
  );
}
