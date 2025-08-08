import React from 'react';
import { PhoneInputComp } from '../../PhoneInput';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useQuizStore } from '@/store/quizStore';
import { cn } from '@/utils/utils';
import { StepProps } from '../DescForm';

const Step4 = ({ errors = {}, clearError }: StepProps) => {
  const { formData: { name, email, phone, whenToCall }, setName, setEmail, setPhone, setWhenToCall } = useQuizStore();

  const handleCheckboxChange = (value: string) => {
    setWhenToCall(whenToCall === value ? '' : value);
    if (clearError) clearError('whenToCall');
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center h-full">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-left w-full">Get 2–3 options in 24h</h1>
        <div className="flex flex-col gap-3 w-full">
          <div>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (clearError) clearError('name');
              }}
              className={cn(
                "outline-none bg-white w-full px-3 py-3 rounded-[16px] border-2",
                errors?.name ? "border-red-500" : "border-[#D8DADC]"
              )}
              placeholder="First Name*"
            />
            {errors?.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (clearError) clearError('email');
              }}
              className={cn(
                "outline-none bg-white w-full px-3 py-3 rounded-[16px] border-2",
                errors?.email ? "border-red-500" : "border-[#D8DADC]"
              )}
              placeholder="Email*"
            />
            {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <PhoneInputComp value={phone} onChange={(value) => {
              setPhone(value);
              if (clearError) clearError('phone');
            }} />
            {errors?.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold">Best time to contact</h2>
        <div className="flex gap-6 max-[500px]:flex-wrap max-[500px]:gap-2">
          {["Morning", "Afternoon", "Evening"].map((time) => (
            <FormControlLabel
              key={time}
              control={
                <Checkbox
                  checked={whenToCall === time}
                  onChange={() => handleCheckboxChange(time)}
                  color="secondary"
                />
              }
              label={time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step4;
