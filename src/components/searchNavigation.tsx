import { MapPin, Target, ArrowLeftRight } from "lucide-react";
import { useFilter } from "@/context/filterContext";

export const SearchNavigation = () => {
    const { locationFrom, locationTo, setLocationFrom, setLocationTo } =
        useFilter();

    return (
        <main className="w-full bg-white border-y-1 border-gray-300 search-navigation-shadow flex justify-center">
            <form
                onSubmit={() => {}}
                className="max-w-3xl w-full flex justify-center gap-3 m-3"
            >
                <label
                    htmlFor="locationFrom"
                    className="max-w-[300px] w-full flex items-center gap-2 py-2.5 px-2 bg-white rounded-xl border-2 border-gray-300"
                >
                    <Target size={16} className="text-light-blue" />
                    <input
                        type="text"
                        placeholder="Hvor fra?"
                        name="locationFrom"
                        onChange={(e) => setLocationFrom(e.target.value)}
                        value={locationFrom ?? undefined}
                        className="text-sm"
                    />
                </label>

                <button
                    onClick={() => {}}
                    className="w-[47.2px] flex items-center justify-center bg-light-blue/20 text-light-blue rounded-xl"
                >
                    <ArrowLeftRight size={16} />
                </button>

                <label
                    htmlFor="locationTo"
                    className="max-w-[300px] w-full flex items-center gap-2 py-2.5 px-2 bg-white rounded-xl border-2 border-gray-300"
                >
                    <MapPin size={16} className="text-light-blue" />
                    <input
                        type="text"
                        placeholder="Hvor til?"
                        name="locationTo"
                        onChange={(e) => setLocationTo(e.target.value)}
                        value={locationTo ?? undefined}
                        className="text-sm"
                    />
                </label>

                <button type="submit" className="btn">
                    Søg Lift
                </button>
            </form>
        </main>
    );
};
