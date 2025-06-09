'use client';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useGetQuery } from '@/api/get.api';

function valuetext(value: number) {
  return `${value}$`;
}

const defaultTheme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      light: '#27A430',
      main: '#27A430',
      dark: '#27A430',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4392a4',
      main: '#24525d',
      dark: '#4392a4',
      contrastText: '#fff',
    },
  },
});

export const Filter = () => {
  const t = useTranslations('all_tours');
  const [price, setPrice] = useState<number[]>([0, 3200]);
  const [duration, setDuration] = useState<number[]>([0, 20]);
  const seasons = t.raw('seasons') as { title: string; value: string }[];
  const hotels = t.raw('hotels') as { title: string; value: string }[];
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [checkedItems2, setCheckedItems2] = useState<string[]>([]);
  const [checkedItems3, setCheckedItems3] = useState<string[]>([]);

  const handleChange3 = (value: string) => {
    setCheckedItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleChange4 = (value: string) => {
    setCheckedItems2((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };
  const handleChange5 = (value: string) => {
    setCheckedItems3((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleChange = (event: Event, newValue: number[]) => {
    setPrice(newValue);
  };

  const handleChange2 = (event: Event, newValue: number[]) => {
    setDuration(newValue);
  };

  const { data, isSuccess } = useGetQuery({
    key: ['all_tours_types'],
    page: '',
    perPage: '',
    url: 'types',
    searchItem: '',
    additionalParam: '&all=true&main_page=0',
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="max-w-[350px] w-full min-h-[700px] flex flex-col gap-5 items-start justify-start">
        <button className="bg-white flex items-center justify-center gap-2 px-[20px] py-[13.5px] rounded-[30px]  hover:bg-gray-300 cursor-pointer transition-all active:bg-white">
          <span className="text-[18px]">{t('f_top_btn')}</span>
          <IoCloseCircle size={30} className="text-green-600" />
        </button>
        <div className="bg-white rounded-[20px] w-full p-[15px] shadow-xl">
          <Accordion sx={{ boxShadow: 'none' }} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="text-[18px] font-semibold">{t('pl')}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="grid-row-1 rounded-[16px]  grid grid-cols-2 border-2 border-gray-300 p-0">
                <div className="rounded-input flex flex-col rounded-r-none border-r border-inherit">
                  <span className="mt-1 px-3 text-[18px] text-gray-300 ">{t('from')}</span>
                  <div className="flex flex-row">
                    <input
                      min={0}
                      value={price[0]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) setPrice([val, price[1]]);
                      }}
                      required
                      className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                    />
                  </div>
                </div>

                <div className="rounded-input flex flex-col border-inherit">
                  <span className="mt-1 px-3 text-[18px] text-gray-300">{t('before')}</span>
                  <div className="flex flex-row">
                    <input
                      min={0}
                      value={price[1]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) setPrice([price[0], val]);
                      }}
                      required
                      className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                      placeholder="$120"
                    />
                  </div>
                </div>
              </div>
              <Slider
                value={price}
                sx={{ paddingTop: 5 }}
                min={0}
                max={4200}
                size="medium"
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Accordion sx={{ boxShadow: 'none' }} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="text-[18px] font-semibold">{t('pl2')}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="grid-row-1 rounded-[16px]  grid grid-cols-2 border-2 border-gray-300 p-0">
                <div className="rounded-input flex flex-col rounded-r-none border-r border-inherit">
                  <span className="mt-1 px-3 text-[18px] text-gray-300 ">{t('from')}</span>
                  <div className="flex flex-row">
                    <input
                      min={0}
                      value={duration[0]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) setDuration([val, price[1]]);
                      }}
                      required
                      className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                    />
                  </div>
                </div>

                <div className="rounded-input flex flex-col border-inherit">
                  <span className="mt-1 px-3 text-[18px] text-gray-300">{t('before')}</span>
                  <div className="flex flex-row">
                    <input
                      min={0}
                      value={duration[1]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) setDuration([price[0], val]);
                      }}
                      required
                      className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                      placeholder="$120"
                    />
                  </div>
                </div>
              </div>
              <Slider
                value={duration}
                sx={{ paddingTop: 5 }}
                min={0}
                max={31}
                size="medium"
                onChange={handleChange2}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="text-[18px] font-semibold">{t('pl3')}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col">
                {seasons.map((el) => (
                  <FormControlLabel
                    key={el.value}
                    control={
                      <Checkbox
                        checked={checkedItems.includes(el.value)}
                        onChange={() => handleChange3(el.value)}
                      />
                    }
                    label={el.title}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="text-[18px] font-semibold">{t('pl4')}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col">
                {hotels.map((el) => (
                  <FormControlLabel
                    key={el.value}
                    control={
                      <Checkbox
                        checked={checkedItems2.includes(el.value)}
                        onChange={() => handleChange4(el.value)}
                      />
                    }
                    label={el.title}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="text-[18px] font-semibold">{t('pl5')}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col">
                {isSuccess &&
                  data.map((el: { name: string; id: number }) => (
                    <FormControlLabel
                      key={el.id}
                      control={
                        <Checkbox
                          checked={checkedItems3.includes(el.name)}
                          onChange={() => handleChange5(el.name)}
                        />
                      }
                      label={el.name}
                    />
                  ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </ThemeProvider>
  );
};
