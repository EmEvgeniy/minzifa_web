import {
  Animal,
  Children,
  Economy,
  Environment,
  Hero,
  Mission,
  MobileSlider,
  Respect,
  Team,
} from '@/components/Eco-travel';
import EnvironmentCircle from '@/components/UI/DynamicCircle/index.desktop';
import { FreeConsultationForm } from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import React from 'react';

export default function page() {
  return (
    <>
      <Hero />
      <Team />
      <Mission />
      <EnvironmentCircle />
      <MobileSlider />
      <Environment />
      <Respect />
      <Children />
      <Animal />
      <Economy />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
