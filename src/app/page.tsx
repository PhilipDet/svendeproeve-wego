import Image from "next/image";

export default function Home() {
    return (
        <main className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-9xl font-bold text-center mt-40 max-lg:text-8xl max-md:text-7xl max-sm:text-6xl">
                Vi gør byen grønner
            </h1>
            <Image
                src="/images/slides-png/slide03.png"
                alt="Slide 1"
                width={1920}
                height={1080}
                priority
                quality={80}
                className="fixed inset-0 w-full h-full object-cover object-bottom -z-10"
            />
        </main>
    );
}
