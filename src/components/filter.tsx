"use client";

import { useFilter } from "@/context/filterContext";
import { SeatSlider } from "./slider";
import { BagSm } from "@/components/bagsm";
import { BagMd } from "@/components/bagmd";
import { BagLg } from "@/components/baglg";
import { CheckBox } from "./checkbox";

export const Filter = () => {
    const {
        seats,
        setSeats,
        luggageSize,
        setLuggageSize,
        comfort,
        setComfort,
        music,
        setMusic,
        animals,
        setAnimals,
        kids,
        setKids,
        smoking,
        setSmoking,
        resetFilter,
    } = useFilter();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                resetFilter();
            }}
            className="md:max-w-40 max-md:grid max-md:grid-cols-2 w-full flex flex-col gap-3 bg-background p-3 rounded-2xl"
        >
            <div className="flex flex-col col-span-2 gap-2">
                <label
                    htmlFor="seat-amount"
                    className="flex flex-col gap-2 font-extrabold text-sm"
                >
                    <ul className="flex justify-between">
                        <li>Antal pladser:</li>
                        <li>{seats ?? "1"}</li>
                    </ul>
                    <SeatSlider
                        value={seats ?? 1}
                        onValueChange={(value) => setSeats(value[0])}
                    />
                </label>
            </div>

            <hr className="max-md:hidden border-1 border-gray-300" />

            <div className="flex flex-col max-sm:col-span-2 gap-2">
                <span className="font-extrabold text-sm">Bagage:</span>
                <div className="flex items-center sm:justify-around gap-5">
                    <label
                        htmlFor="luggage-small"
                        className="flex flex-col items-center gap-1 text-xs"
                    >
                        <input
                            type="radio"
                            name="luggage-size"
                            id="luggage-small"
                            checked={luggageSize === 1}
                            onClick={() => {
                                luggageSize === 1
                                    ? setLuggageSize(null)
                                    : setLuggageSize(1);
                            }}
                            className="peer absolute hidden w-full h-full"
                        />
                        <BagSm className="w-6 h-6 stroke-[#999999] peer-hover:stroke-foreground peer-checked:stroke-light-blue transition duration-200" />
                        Lille
                    </label>
                    <label
                        htmlFor="luggage-medium"
                        className="flex flex-col items-center gap-1 text-xs"
                    >
                        <input
                            type="radio"
                            name="luggage-size"
                            id="luggage-medium"
                            checked={luggageSize === 2}
                            onClick={() => {
                                luggageSize === 2
                                    ? setLuggageSize(null)
                                    : setLuggageSize(2);
                            }}
                            className="peer absolute hidden w-full h-full"
                        />
                        <BagMd className="w-6 h-6 stroke-[#999999] peer-hover:stroke-foreground peer-checked:stroke-light-blue transition duration-200" />
                        Mellem
                    </label>
                    <label
                        htmlFor="luggage-large"
                        className="flex flex-col items-center gap-1 text-xs"
                    >
                        <input
                            type="radio"
                            name="luggage-size"
                            id="luggage-large"
                            checked={luggageSize === 3}
                            onClick={() => {
                                luggageSize === 3
                                    ? setLuggageSize(null)
                                    : setLuggageSize(3);
                            }}
                            className="peer absolute hidden w-full h-full"
                        />
                        <BagLg className="w-6 h-6 fill-[#999999] peer-hover:fill-foreground peer-checked:fill-light-blue transition duration-200" />
                        Stor
                    </label>
                </div>
            </div>

            <hr className="max-md:hidden border-1 border-gray-300" />

            <div className="flex flex-col max-sm:col-span-2 gap-2">
                <span className="font-extrabold text-sm">Komfort</span>
                <CheckBox
                    label="Højst to personer på bagsædet"
                    name="comfort"
                    onChange={(e) => setComfort(e.target.checked)}
                    checked={comfort}
                />
            </div>

            <hr className="max-md:hidden border-1 border-gray-300" />

            <div className="flex flex-col max-md:col-span-2 gap-2">
                <span className="font-extrabold text-sm">Præferencer</span>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 md:flex-col pr-2 gap-2">
                    <CheckBox
                        label="Musik"
                        name="music"
                        onChange={(e) => setMusic(e.target.checked)}
                        checked={music}
                    />
                    <CheckBox
                        label="Dyr"
                        name="animals"
                        onChange={(e) => setAnimals(e.target.checked)}
                        checked={animals}
                    />
                    <CheckBox
                        label="Børn"
                        name="kids"
                        onChange={(e) => setKids(e.target.checked)}
                        checked={kids}
                    />
                    <CheckBox
                        label="Rygning"
                        name="smoking"
                        onChange={(e) => setSmoking(e.target.checked)}
                        checked={smoking}
                    />
                </div>
            </div>

            <hr className="max-md:hidden border-1 border-gray-300" />

            <button type="submit" className="btn max-md:col-span-2">
                Nulstil
            </button>
        </form>
    );
};
