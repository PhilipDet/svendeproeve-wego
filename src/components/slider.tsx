import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";

export const SeatSlider = ({
    value,
    onValueChange,
}: {
    value: number;
    onValueChange: (value: number[]) => void;
}) => {
    return (
        <Root
            className="relative flex items-center select-none w-full h-5"
            value={value ? [value] : [6]}
            onValueChange={onValueChange}
            max={6}
            min={1}
            step={1}
        >
            <Track className="bg-gray-300 relative flex-1 rounded-full h-1.5">
                <Range className="absolute bg-light-blue rounded-full h-full" />
            </Track>
            <Thumb className="block w-[15px] h-[15px] bg-white border-2 border-light-blue rounded-full shadow cursor-pointer focus:outline-none" />
        </Root>
    );
};
