'use client';

interface ArticleVideoProps {
    url: string;
}

export default function ArticleVideo({ url }: ArticleVideoProps) {
    if (!url) return null;

    const getEmbedUrl = (url: string) => {
        // YouTube
        const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

        // Vimeo
        const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

        return url;
    };

    const embedUrl = getEmbedUrl(url);

    return (
        <div className="my-10">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Article Video Content"
                />
            </div>
        </div>
    );
}
