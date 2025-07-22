'use client';
import { Checkbox, FormControlLabel, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { DestinationDataResponse } from './_types';
import { useMemo, useState } from 'react';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useFilterStore } from './store';

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

function FilterDestinations({
  destinationsData,
  pl,
  pl2,
}: {
  destinationsData: DestinationDataResponse;
  pl: string;
  pl2: string;
}) {
  const { destinations, setDestinations, buildFilterQuery } = useFilterStore();
  const [searchDestination, setSearchDestination] = useState('');
  const router = useRouter();

  const filteredDestinations = useMemo(() => {
    return destinationsData.filter((el) =>
      el.name.toLowerCase().includes(searchDestination.toLowerCase()),
    );
  }, [destinationsData, searchDestination]);

  const debouncedDestinations = useDebouncedValue(filteredDestinations, 300);

  const handleChangeDestinations = (value: string) => {
    setDestinations(value);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  return (
    <>
      <Accordion color="secondary" sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p className="text-[18px] font-semibold">{pl}</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full">
            <div className="relative flex items-center justify-center">
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 focus:border-gray-500 focus:ring-gray-500 focus:outline-none w-full"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                placeholder={pl2}
              />
              {searchDestination && (
                <button
                  className="absolute right-0 cursor-pointer p-2"
                  onClick={() => setSearchDestination('')}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="flex flex-col overflow-y-scroll max-h-[300px]">
              {debouncedDestinations?.map((el) => (
                <FormControlLabel
                  key={el.id}
                  color="secondary"
                  control={
                    <Checkbox
                      checked={destinations.includes(el.name)}
                      color="secondary"
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
    </>
  );
}

export default FilterDestinations;
