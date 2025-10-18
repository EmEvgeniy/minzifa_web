import { Highlights } from '../_types';

export default function TourHighlights({ highlights }: { highlights: Highlights }) {
  if (!highlights || highlights?.content?.length === 0) return null;

  return (
    <div className="my-6 md:col-start-1">
      <h2 className="text-4xl font-semibold mb-4 max-[920px]:text-[30px] max-[550px]:text-[24px]">
        {highlights.title}
      </h2>
      <ul className="list-outside pl-5 bg-white p-5 rounded-lg shadow-md flex flex-col gap-2.5 max-[920px]:text-[16px] max-[550px]:text-[14px]">
        {highlights?.content?.map((highlight, index) => (
          <li key={index} className="flex items-center gap-2">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 9L5 12L14 1" stroke="#16372D" strokeWidth="2" />
            </svg>

            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}
