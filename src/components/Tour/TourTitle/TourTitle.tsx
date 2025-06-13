export const TourTitle = ({ title }: { title: string | undefined }) => {
    return (
        <h1 className="text-[42px] font-medium max-w-[800px]">
            {title}
        </h1>
    );
}