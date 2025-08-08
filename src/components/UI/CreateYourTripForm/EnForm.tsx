import DescForm from './DescForm';
import { CreateYourTripFormProps } from './_types';

export default function EnForm({ className, popupClose, locale }: CreateYourTripFormProps) {
  console.log(className, popupClose, locale);

  return <DescForm popupClose={popupClose} />;
}
