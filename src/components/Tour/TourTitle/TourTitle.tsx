export default function TourTitle({ title }: { title: string | undefined }) {
  return (
    <h1 className="text-2xl md:text-[42px] max-w-[800px] max-[920px]:text-[30px] max-[920px]:max-w-full font-title font-semibold leading-100 tracking-zero my-5">
      {title}
    </h1>
  );
}
