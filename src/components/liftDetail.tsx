import Image from "next/image";

export const LiftDetail = ({
    label,
    paragraf,
    imageurl,
}: {
    label: string;
    paragraf: string;
    imageurl: string;
}) => {
    return (
        <article className="flex items-center gap-2.5">
            <Image
                src={imageurl}
                alt={label}
                width={20}
                height={20}
                className="text-green"
            />
            <div>
                <span className="max-sm:hidden uppercase text-sm font-medium text-gray-400">
                    {label}
                </span>
                <p className="text-sm">{paragraf}</p>
            </div>
        </article>
    );
};
