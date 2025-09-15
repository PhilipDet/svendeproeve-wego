import { cn } from "@/lib/utils";

export const Container = ({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) => {
    return (
        <div className="w-full flex-1 flex justify-center py-5 px-6">
            <div
                className={cn(
                    "max-w-3xl w-full flex flex-col items-center gap-4",
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
};
