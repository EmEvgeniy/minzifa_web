import { Facts } from '../_types';

export const TourFacts = ({ facts }: { facts: Facts }) => {
  if (!facts) return null;
  return (
    <div className="flex flex-col items-start justify-start col-start-1">
      {/* {facts?.title && <h2 className="text-4xl font-semibold mb-4">{facts?.title}</h2>} */}
      <div className="grid grid-cols-4 gap-4 w-full max-[1150px]:grid-cols-3 max-[920px]:grid-cols-2">
        {facts.content.length > 0 &&
          facts.content.map((fact, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-[0_0_4px_0.25] p-2.5 w-full h-full"
            >
              <p className="font-medium text-[#333333] text-lg">{fact.title}</p>
              <p className="text-base text-[#9b9b9b]">{fact.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
