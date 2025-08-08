import React, { useState } from 'react';
import { PhoneInputComp } from '../../PhoneInput';
import { Checkbox, FormControlLabel } from '@mui/material';

const Step4 = () => {
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleCheckboxChange = (value: string) => {
    setSelectedOption(selectedOption === value ? '' : value);
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center h-full">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-left w-full">Get 2–3 options in 24h</h1>
        <div className="flex flex-col gap-3 w-full">
          <input
            className="outline-none bg-white w-full px-3 py-3 rounded-[16px] max-[920px]:shadow-[0px_4px_18px_0px_#0000002B] max-[920px]:border-2 max-[920px]:border-[#D8DADC]"
            placeholder="First Name*"
          />
          <input
            className="outline-none bg-white w-full px-3 py-3 rounded-[16px] max-[920px]:shadow-[0px_4px_18px_0px_#0000002B] max-[920px]:border-2 max-[920px]:border-[#D8DADC]"
            placeholder="Email*"
          />
          <PhoneInputComp value={phone} onChange={setPhone} />
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold">Best time to contact</h2>
        <div className="flex gap-6 max-[500px]:flex-wrap max-[500px]:gap-2">
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === 'Morning'}
                onChange={() => handleCheckboxChange('Morning')}
                color="secondary"
              />
            }
            label="Morning"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === 'Afternoon'}
                onChange={() => handleCheckboxChange('Afternoon')}
                color="secondary"
              />
            }
            label="Afternoon"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === 'Evening'}
                onChange={() => handleCheckboxChange('Evening')}
                color="secondary"
              />
            }
            label="Evening"
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
