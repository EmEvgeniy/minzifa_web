export const TourTitle = ({ title }: { title: string | undefined }) => {
  return (
    <h1 className="text-[42px] font-medium max-w-[800px] max-[920px]:text-[30px] max-[920px]:max-w-full">
      {title}
    </h1>
  );
};
