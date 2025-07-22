'use client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Slider } from '@mui/material';
import { useFilterStore } from './store';
import { useRouter } from 'next/navigation';

function valuetext(value: number) {
  return `${value}$`;
}

function FilterDurationSlider({ pl, pl2, pl3 }: { pl: string; pl2: string; pl3: string }) {

  const router = useRouter();
  const { durations, setDurations, buildFilterQuery } = useFilterStore();

  const handleChangeDurations = (_: Event, newValue: number[]) => {
    setDurations(newValue);
    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
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
          <div className="grid-row-1 rounded-2xl  grid grid-cols-2 border-2 border-gray-300 p-0">
            <div className="rounded-input flex flex-col rounded-r-none border-r border-inherit">
              <span className="mt-1 px-3 text-[18px] text-gray-300 ">{pl2}</span>
              <div className="flex flex-row">
                <input
                  min={1}
                  value={durations[0] || 1}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!isNaN(val)) setDurations([val, durations[1]]);
                  }}
                  required
                  className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-input flex flex-col border-inherit">
              <span className="mt-1 px-3 text-[18px] text-gray-300">{pl3}</span>
              <div className="flex flex-row">
                <input
                  min={1}
                  value={durations[1] || 31}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!isNaN(val)) setDurations([durations[0], val]);
                  }}
                  required
                  className="block h-full text-[18px] w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none "
                  placeholder="$120"
                />
              </div>
            </div>
          </div>
          <Slider
            value={durations || [1, 31]}
            sx={{ paddingTop: 5 }}
            min={0}
            max={31}
            size="medium"
            color="secondary"
            onChange={handleChangeDurations}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ paddingTop: 1, paddingBottom: 1 }} />
    </>
  );
}

export default FilterDurationSlider;
