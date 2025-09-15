import { cn } from "@/lib/utils";

export const Container = ({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) => {
    return (
        <div
            className={cn(
                "flex-1 w-full flex flex-col items-center gap-4 py-8 px-6",
                className
            )}
        >
            {children}
        </div>
    );
};
