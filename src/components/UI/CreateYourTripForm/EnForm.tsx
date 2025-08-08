import DescForm from './DescForm';

export default function EnForm({ popupClose }: { popupClose: () => void }) {
  return <DescForm popupClose={popupClose} locale='en' />;
}
