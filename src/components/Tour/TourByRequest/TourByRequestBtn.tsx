'use client';

function TourByRequestBtn({ title }: { title: string }) {
  const handleScroll = () => {
    document.getElementById('free-consultation')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <button
      onClick={handleScroll}
      className="text-center w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
    >
      {title}
    </button>
  );
}

export default TourByRequestBtn;
