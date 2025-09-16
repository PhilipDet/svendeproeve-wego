import { X } from "lucide-react";

export const GuideModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    return (
        <>
            {isOpen && (
                <main
                    className="z-50 fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <section className="bg-white p-4 rounded-2xl flex flex-col gap-2 max-w-[400px] w-full py-4 px-5">
                        <ul className="flex justify-between items-center">
                            <li className="text-lg font-extrabold">
                                Sådan virker det:
                            </li>
                            <li className="flex items-center">
                                <button onClick={() => setIsOpen(false)}>
                                    <X size={20} className="font-extrabold" />
                                </button>
                            </li>
                        </ul>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean aliquam leo libero, vitae ullamcorper
                            nunc rutrum sit amet.
                            <hr className="my-2 border-0" />
                            Integer lobortis diam eu justo fermentum, lacinia
                            laoreet urna efficitur. Mauris sit amet urna
                            vulputate, vulputate turpis a.
                            <hr className="my-2 border-0" />
                            Fusce quis rutrum odio. Integer nec euismod felis.
                            Praesent ex justo, ultrices a neque in, facilisis
                            condimentum ex. Cras iaculis eget nulla a
                            vestibulum. Donec suscipit eu nunc in dictum.
                            Vestibulum congue scelerisque velit, ut tempus urna
                            dictum eu.
                        </p>
                    </section>
                </main>
            )}
        </>
    );
};
