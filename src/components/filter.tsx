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
    } = useFilter();

    const resetForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSeats(1);
        setLuggageSize(null);
        setComfort(false);
        setMusic(false);
        setAnimals(false);
        setKids(false);
        setSmoking(false);
    };

    return (
        <form
            onSubmit={(e) => {
                resetForm(e);
            }}
            className="max-w-40 w-full flex flex-col gap-3 bg-background p-3 rounded-2xl"
        >
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

            <hr className="border-1 border-gray-300" />

            <span className="font-extrabold text-sm">Bagage:</span>
            <div className="flex items-center justify-around gap-2">
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

            <hr className="border-1 border-gray-300" />

            <span className="font-extrabold text-sm">Komfort</span>
            <CheckBox
                label="Højst to personer på bagsædet"
                name="comfort"
                onChange={(e) => setComfort(e.target.checked)}
                checked={comfort}
            />

            <hr className="border-1 border-gray-300" />
            <span className="font-extrabold text-sm">Præferencer</span>
            <div className="flex flex-col pr-2 gap-2">
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

            <hr className="border-1 border-gray-300" />

            <button type="submit" className="btn">
                Nulstil
            </button>
        </form>
    );
};
