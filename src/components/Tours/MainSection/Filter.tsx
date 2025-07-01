'use client';

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { IoCloseCircle } from 'react-icons/io5';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useFilterStore } from './store';
import { useRouter } from 'next/navigation';
import { DestinationDataResponse, TourTypeDataResponse } from './_types';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import { FaTimes } from 'react-icons/fa';

function valuetext(value: number) {
  return `${value}$`;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ }) => ({}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {},
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({}));

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

type FilterProps = {
  tourTypesData: TourTypeDataResponse,
  destinationsData: DestinationDataResponse
};

export const Filter = ({ tourTypesData, destinationsData }: FilterProps) => {
  const t = useTranslations('all_tours');

  const [pricesRange, setPricesRange] = useState<number[]>([0, 20000]);
  const [durationsRange, setDurationsRange] = useState<number[]>([1, 31]);

  const [searchDestination, setSearchDestination] = useState("");

  const router = useRouter();

  const {
    seasons,
    hotels,
    tourTypes,
    destinations,
    setPrices,
    setDurations,
    setSeasons,
    setHotels,
    setTourTypes,
    setDestinations,
    resetFilters,
    buildFilterQuery,
  } = useFilterStore();

  const seasonData = t.raw('seasons') as { title: string; value: string }[];
  const hotelData = t.raw('hotels') as { title: string; value: string }[];

  const handleChangePrices = (event: Event, newValue: number[]) => {
    setPricesRange(newValue);
    setPrices(newValue);
    router.replace(`?${buildFilterQuery()}`, { scroll: false });
  };

  const handleChangeDurations = (event: Event, newValue: number[]) => {
    setDurationsRange(newValue);
    setDurations(newValue);
    router.replace(`?${buildFilterQuery()}`, { scroll: false });
  };

  const handleChangeHotels = (value: string) => {
    setHotels(value);
    router.replace(`?${buildFilterQuery()}`, { scroll: false });
  };

  const handleChangeSeasons = (value: string) => {
    setSeasons(value);
    router.replace(`?${buildFilterQuery()}`, { scroll: false });
  };

  const handleChangeTourTypes = (value: string) => {
    setTourTypes(value);
    router.replace(`?${buildFilterQuery()}`, { scroll: false });
  };

  const handleChangeDestinations = (value: string) => {
    setDestinations(value);
    router.replace(`?${buildFilterQuery()}`, { scroll: false });
  };

  const handleReset = () => {
    resetFilters();
    setPricesRange([0, 20000]);
    setDurationsRange([1, 31]);
    router.replace('?', { scroll: false });
  };

  const filteredDestinations = useMemo(() => {
    return destinationsData.filter((el) =>
      el.name.toLowerCase().includes(searchDestination.toLowerCase())
    );
  }, [destinationsData, searchDestination]);

  const debouncedDestinations = useDebouncedValue(filteredDestinations, 300);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="max-w-[350px] w-full min-h-[700px] flex flex-col gap-5 items-start justify-start [@media(max-width:1024px)]:max-w-full">
        <button onClick={handleReset} className="bg-white flex items-center justify-center gap-2 px-[20px] py-[13.5px] rounded-[30px] hover:bg-gray-300 cursor-pointer transition-all active:bg-white [@media(max-width:1024px)]:hidden ">
          <span className="text-[18px]">{t('f_top_btn')}</span>
          <IoCloseCircle size={30} className="text-green-600" />
        </button>
        <div className="bg-white rounded-2xl w-full p-3 shadow-xl [@media(max-width:1024px)]:bg-transparent [@media(max-width:1024px)]:shadow-none [@media(max-width:1024px)]:p-0">
          <Accordion sx={{ boxShadow: 'none' }} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="text-[18px] font-semibold">{t('pl')}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="grid-row-1 rounded-2xl grid grid-cols-2 border-2 border-gray-300 p-0">
                <div className="rounded-input flex flex-col rounded-r-none border-r border-inherit">
                  <span className="mt-1 px-3 text-[18px] text-gray-300 ">{t('from')}</span>
                  <div className="flex flex-row">
                    <input
                      min={0}
                      value={pricesRange[0]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) setPrices([val, pricesRange[1]]);
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
                      value={pricesRange[1]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) setPrices([pricesRange[0], val]);
                      }}
                      required
                      className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                      placeholder="$120"
                    />
                  </div>
                </div>
              </div>
              <Slider
                value={pricesRange}
                sx={{ paddingTop: 5 }}
                min={0}
                max={20000}
                size="medium"
                onChange={handleChangePrices}
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
              <div className="grid-row-1 rounded-2xl  grid grid-cols-2 border-2 border-gray-300 p-0">
                <div className="rounded-input flex flex-col rounded-r-none border-r border-inherit">
                  <span className="mt-1 px-3 text-[18px] text-gray-300 ">{t('from')}</span>
                  <div className="flex flex-row">
                    <input
                      min={1}
                      value={durationsRange[0]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) setDurations([val, durationsRange[1]]);
                      }}
                      required
                      className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-input flex flex-col border-inherit">
                  <span className="mt-1 px-3 text-[18px] text-gray-300">{t('before')}</span>
                  <div className="flex flex-row">
                    <input
                      min={1}
                      value={durationsRange[1]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val)) setDurations([durationsRange[0], val]);
                      }}
                      required
                      className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                      placeholder="$120"
                    />
                  </div>
                </div>
              </div>
              <Slider
                value={durationsRange}
                sx={{ paddingTop: 5 }}
                min={0}
                max={31}
                size="medium"
                onChange={handleChangeDurations}
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
                {seasonData.map((el) => (
                  <FormControlLabel
                    key={el.value}
                    control={
                      <Checkbox
                        checked={seasons.includes(el.value)}
                        onChange={() => handleChangeSeasons(el.value)}
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
                {hotelData.map((el) => (
                  <FormControlLabel
                    key={el.value}
                    control={
                      <Checkbox
                        checked={hotels.includes(el.value)}
                        onChange={() => handleChangeHotels(el.value)}
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
              <div className="flex flex-col overflow-y-scroll max-h-[300px]">
                {tourTypesData.length && tourTypesData?.map((el) => (
                  <FormControlLabel
                    key={el.id}
                    control={
                      <Checkbox
                        checked={tourTypes.includes(el.name)}
                        onChange={() => handleChangeTourTypes(el.name)}
                      />
                    }
                    label={el.name}
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
              <p className="text-[18px] font-semibold">{t('pl6')}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className='w-full'>
                <div className='relative flex items-center justify-center'>
                  <input
                    type="text"
                    className='border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:ring-gray-500 focus:outline-none w-full'
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    placeholder={t('find_destination')}
                  />
                  {searchDestination &&
                    <button
                      className='absolute right-0 cursor-pointer p-2'
                      onClick={() => setSearchDestination('')}
                    >
                      <FaTimes />
                    </button>
                  }
                </div>
                <div className="flex flex-col overflow-y-scroll max-h-[300px]">

                  {debouncedDestinations?.map((el) => (
                    <FormControlLabel
                      key={el.id}
                      control={
                        <Checkbox
                          checked={destinations.includes(el.name)}
                          onChange={() => handleChangeDestinations(el.name)}
                        />
                      }
                      label={el.name}
                    />
                  ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </ThemeProvider>
  );
};
