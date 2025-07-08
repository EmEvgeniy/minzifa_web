'use client';
import { Checkbox, Divider, FormControlLabel, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFilterStore } from './store';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({}) => ({}));

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

function FilterHotels({
  pl,
  hotelData,
}: {
  pl: string;
  hotelData: { title: string; value: string }[];
}) {
  const { hotels, setHotels } = useFilterStore();

  const handleChangeHotels = (value: string) => {
    setHotels(value);
  };

  return (
    <>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p className="text-[18px] font-semibold">{pl}</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col">
            {hotelData.map((el) => (
              <FormControlLabel
                key={el.value}
                control={
                  <Checkbox
                    color="secondary"
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
      <Divider sx={{ paddingTop: 1, paddingBottom: 1 }} />
    </>
  );
}

export default FilterHotels;
