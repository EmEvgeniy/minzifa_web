import { ArticlesMain, Hero } from '@/components/Adventures';
import { FreeConsultationForm } from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import React from 'react';

export default function page() {
  return (
    <>
      <Hero />
      <ArticlesMain />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </>
  );
}
