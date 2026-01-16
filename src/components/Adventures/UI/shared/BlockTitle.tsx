import { cn } from "@/utils";

type BlockTitleType = {
    title: string | undefined;
    className?: string;
    variant?: "default" | "secondary";
}

export default function BlockTitle({ title, className, variant = "default" }: BlockTitleType) {
    return variant === "secondary" ? (
        <div className={"mb-6"}>
            <h2 className={cn("font-text font-semibold text-sm text-text uppercase mb-2", className)}>{title}</h2>
            <div className="relative h-[3px] w-full font-text">
                <div className="absolute top-0 left-0 h-full bg-[#4CAF50] w-16"></div>
            </div>
        </div>
    ) : (
        <div className="mb-8 overflow-hidden">
            <h2 className={cn("text-sm font-text font-bold uppercase tracking-wider mb-2", className)}>{title}</h2>
            <div className="relative h-[3px] bg-gray-800 w-full font-text">
                <div className="absolute top-0 left-0 h-full bg-[#4CAF50] w-16"></div>
            </div>
        </div>
    );
}