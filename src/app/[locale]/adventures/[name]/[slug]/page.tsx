import { Articles } from '@/components';
import { Content } from '@/components/Adventure';
import { FreeConsultationForm } from '@/components/UI/FreeConsultationForm/FreeConsultationForm';
import React from 'react';

export default function page() {
  return (
    <section className=" pt-[150px] min-h-[100svh] max-[1200px]:pt-[120px] max-[550px]:pt-[100px]">
      <div className="container">
        <Content />
      </div>
      <Articles />
      <div className="container">
        <FreeConsultationForm />
      </div>
    </section>
  );
}
