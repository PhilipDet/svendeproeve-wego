import { useFilter } from "@/context/filterContext";

export const PriceSlider = () => {
    const { price, setPrice } = useFilter();
    return (
        <div className="w-2xs">
            <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Max Price: {price ?? "No Limit"}
                <input
                    type="range"
                    id="price"
                    min="0"
                    max="100"
                    step={5}
                    value={price ?? 100}
                    onChange={(e) =>
                        setPrice(
                            e.target.value ? parseInt(e.target.value) : null
                        )
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
            </label>
        </div>
    );
};
