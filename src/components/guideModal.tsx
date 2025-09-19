import { X } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { AnimatePresence, motion } from "framer-motion";

export const GuideModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const { content, loadingContent } = useContent();

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.main
                        className="max-md:hidden z-50 fixed inset-0 bg-black/50 flex items-center justify-center"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setIsOpen(false);
                            }
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.section
                            className="bg-white p-4 rounded-2xl flex flex-col gap-2 max-w-[600px] w-full py-4 px-5"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ul className="flex justify-between items-center text-2xl font-extrabold">
                                <li>{content.title}</li>
                                <li>
                                    <button onClick={() => setIsOpen(false)}>
                                        <X size={30} />
                                    </button>
                                </li>
                            </ul>

                            {!loadingContent && content && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: content.content,
                                    }}
                                    className="text-lg"
                                />
                            )}
                        </motion.section>
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    );
};
