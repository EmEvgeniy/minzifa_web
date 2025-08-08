'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import anna from '@/assets/img/CreateYourTrip.jpg'; // заменишь на свой createYourTrip.jpg
import { motion, AnimatePresence } from 'framer-motion';
import Step1 from './ui/Step1';
import Step2 from './ui/Step2';
import Step3 from './ui/Step3';
import Step4 from './ui/Step4';
import { cn } from '@/utils/utils';
import { IoIosCloseCircle } from 'react-icons/io';

type Step = {
  bubbleText: string;
  title: string;
  options?: ReactNode;
  placeholder?: string;
};

const steps: Step[] = [
  {
    bubbleText: 'Pick destination(s) and your travel month',
    title: 'Where do you want to go?',

    options: <Step1 />,
  },
  {
    bubbleText: "Who's traveling and for how long?",
    title: 'Who will you share this adventure with?',

    options: <Step2 />,
  },
  {
    bubbleText: 'Budget range & hotel level',
    title: 'What kind of budget do you have in mind for traveling?',

    options: <Step3 />,
  },
  {
    bubbleText: 'Where should we send 2–3 options within 24h?',
    title: 'Get 2–3 options in 24h',
    options: <Step4 />,
  },
];

export default function QuizForm({ popupClose }: { popupClose?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full ">
      <div className="grid grid-cols-[300px_1fr] gap-4 max-[920px]:grid-cols-1 max-[920px]:gap-0 ">
        <div
          className="hidden max-[920px]:block absolute top-3 right-2 z-30 hover:scale-105 active:scale-105 transition"
          onClick={popupClose}
        >
          <IoIosCloseCircle className="text-[30px] text-[#EEEEEE]" />
        </div>
        {/* Левая часть */}
        <div className="relative rounded-[16px] overflow-hidden min-h-[540px] bg-gray-200 max-[920px]:rounded-b-[0px] max-[920px]:min-h-[180px]">
          <Image src={anna} alt="Anna Smirnova" fill className="object-cover" />
          {/* Облачко */}
          <div className="bg-white absolute top-[50px] left-1/2 -translate-x-1/2 rounded-[300px] p-5 w-[calc(100%-40px)] max-w-[250px] shadow max-[920px]:left-2 max-[920px]:-translate-x-0 max-[550px]:max-w-[150px] max-[400px]:max-w-[130px] max-[920px]:top-2  max-[920px]:rounded-t-[30px] max-[920px]:rounded-l-[30px] max-[920px]:rounded-br-[0px]">
            <p className="text-sm max-[550px]:text-[10px]">{steps[currentStep].bubbleText}</p>
            <span className="absolute bg-white w-[20px] h-[20px] bottom-[-28px] right-5 rounded-full max-[920px]:hidden" />
            <span className="absolute bg-white w-[10px] h-[10px] bottom-[-40px] right-10 rounded-full max-[920px]:hidden" />
          </div>
          {/* Подпись */}
          <div className="bg-[#CFDFD9] absolute bottom-0 w-full p-3 rounded-t-[16px] max-[920px]:hidden">
            <p className="font-bold text-[18px]">Anna Smirnova</p>
            <p className="text-[14px]">Product Manager</p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="bg-[#CFDFD9] rounded-[16px] p-5 flex flex-col justify-between min-h-[540px] max-[920px]:flex-col-reverse gap-5 max-[920px]:min-h-full max-[920px]:rounded-b-[16px] max-[920px]:rounded-t-[0px] max-[920px]:bg-white max-[650px]:px-2.5">
          {/* Прогресс-бар */}
          <div className="flex gap-2 mb-5">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-[8px] flex-1 rounded-[300px]"
                animate={{ backgroundColor: i <= currentStep ? '#27A430' : '#F3F1F1' }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
          <div className="w-full h-full flex-1 flex flex-col">
            {/* Контент шага */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {steps[currentStep].options}
              </motion.div>
            </AnimatePresence>

            {/* Кнопки */}
            <div className="mt-5 w-full">
              {currentStep < steps.length - 1 ? (
                <div className="flex justify-end gap-2">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-black text-white px-5 py-2 rounded-[16px]"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={nextStep}
                    className={cn(
                      'bg-[#27A430] text-white px-5 py-2 rounded-[16px]',
                      currentStep === 0 && 'w-full',
                    )}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-[#27A430] text-white px-5 py-2 rounded-[16px] w-full"
                >
                  Send request
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
