'use client';
import { Checkbox, Divider, FormControlLabel, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
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

function FilterSeasons({
  pl,
  seasonData,
}: {
  pl: string;
  seasonData: { title: string; value: string }[];
}) {
  const router = useRouter();
  const { seasons, setSeasons, buildFilterQuery } = useFilterStore();

  const handleChangeSeasons = (value: string) => {
    setSeasons(value);

    router.replace(`?${buildFilterQuery().toString()}`, { scroll: false });
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
            {seasonData.map((el) => (
              <FormControlLabel
                key={el.value}
                control={
                  <Checkbox
                    color="secondary"
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
      <Divider sx={{ paddingTop: 1, paddingBottom: 1 }} />
    </>
  );
}

export default FilterSeasons;
