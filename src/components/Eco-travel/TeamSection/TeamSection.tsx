interface TeamSectionProps {
    t: (key: string) => string;
    teamContent: string[];
}

export default function TeamSection({ t, teamContent }: TeamSectionProps) {
    return (
        <section className="container py-[70px] flex flex-col gap-10 max-[1024px]:py-[50px] max-[500px]:gap-5">
            <h2 className="text-[42px] text-[#16372D] text-center max-[1024px]:text-[35px] max-[500px]:text-[24px]">
                {t('eco.team.title')}
            </h2>
            <div className="w-full flex flex-col gap-5 text-[18px] text-center max-[500px]:text-[16px]">
                {teamContent.map((text: string, index: number) => (
                    <p key={`team-${index}`}>{text}</p>
                ))}
            </div>
        </section>
    );
}