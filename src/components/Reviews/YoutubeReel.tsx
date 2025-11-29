'use client';

type ReelProps = {
    url: string; // любая ссылка YouTube
};

export default function YoutubeReel({ url }: ReelProps) {
    let embedUrl: string;

    try {
        const u = new URL(url);

        if (u.pathname.startsWith('/embed/')) {
            // Уже embed
            embedUrl = url;
        } else {
            // Преобразуем обычную ссылку в embed
            let videoId: string | null = null;

            if (u.searchParams.get('v')) videoId = u.searchParams.get('v'); // watch?v=ID
            else if (u.pathname.startsWith('/shorts/')) videoId = u.pathname.split('/shorts/')[1]; // shorts/ID
            else if (u.hostname === 'youtu.be') videoId = u.pathname.slice(1); // короткие youtu.be/ID

            if (!videoId) throw new Error('Неверная ссылка YouTube');

            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
    } catch {
        return <p className="text-red-500 text-center">Неверная ссылка на YouTube</p>;
    }

    return (
        <div className="relative w-full flex-[0_0_100%] md:flex-[0_0_33%] aspect-[9/16] mx-auto overflow-hidden rounded-2xl bg-black">
            <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
    );
}
