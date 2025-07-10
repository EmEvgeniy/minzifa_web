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
import { TourTypeDataResponse } from './_types';

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

function FilterTypes({ tourTypesData, pl }: { tourTypesData: TourTypeDataResponse; pl: string }) {
  const { tourTypes, setTourTypes } = useFilterStore();

  const handleChangeTourTypes = (value: string) => {
    setTourTypes(value);
  };
  // const searchParams = useSearchParams();
  // const tourTypeParam = useMemo(() => searchParams.get('tour_types'), [searchParams]);

  // useEffect(() => {
  //   if (tourTypeParam) {
  //     setTourTypes(tourTypeParam);
  //   }
  // }, [tourTypeParam]);

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
          <div className="flex flex-col overflow-y-scroll max-h-[300px]">
            {tourTypesData.length &&
              tourTypesData?.map((el) => (
                <FormControlLabel
                  key={el.id}
                  control={
                    <Checkbox
                      color="secondary"
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
      <Divider sx={{ paddingTop: 1, paddingBottom: 1 }} />
    </>
  );
}

export default FilterTypes;
