'use client';

import { Accordion, AccordionDetails, AccordionSummary, Divider, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import { useFilterStore } from './store';

function valuetext(value: number) {
  return `${value}$`;
}

function FilterPriceSlider({ pl, pl2, pl3 }: { pl: string; pl2: string; pl3: string }) {
  const { prices, setPrices, buildFilterQuery } = useFilterStore();
  const router = useRouter();

  const handleInputChange = (index: number, value: number) => {
    const newPrices: [number, number] = [...prices] as [number, number];

    value = Math.max(0, Math.min(value, 20000));

    if (index === 0 && value > newPrices[1]) {
      newPrices[0] = newPrices[1];
    } else if (index === 1 && value < newPrices[0]) {
      newPrices[1] = newPrices[0];
    } else {
      newPrices[index] = value;
    }

    setPrices(newPrices);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPrices(newValue as [number, number]);
      router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
    }
  };

  return (
    <>
      <Accordion sx={{ boxShadow: 'none' }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p className="text-[18px] font-semibold">{pl}</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="grid-row-1 rounded-2xl grid grid-cols-2 border-2 border-gray-300 p-0">
            <div className="rounded-input flex flex-col rounded-r-none border-r border-inherit">
              <span className="mt-1 px-3 text-[18px] text-gray-300 ">{pl2}</span>
              <div className="flex flex-row">
                <input
                  min={0}
                  value={prices[0] || 0}
                  onChange={(e) => handleInputChange(0, Number(e.target.value))}
                  required
                  className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                />
              </div>
            </div>

            <div className="rounded-input flex flex-col border-inherit">
              <span className="mt-1 px-3 text-[18px] text-gray-300">{pl3}</span>
              <div className="flex flex-row">
                <input
                  min={0}
                  value={prices[1] || 20000}
                  onChange={(e) => handleInputChange(1, Number(e.target.value))}
                  required
                  className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                  placeholder="$120"
                />
              </div>
            </div>
          </div>
          <Slider
            value={prices || [0, 20000]}
            sx={{ paddingTop: 5 }}
            min={0}
            max={20000}
            size="medium"
            color="secondary"
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ paddingTop: 1, paddingBottom: 1 }} />
    </>
  );
}

export default FilterPriceSlider;
