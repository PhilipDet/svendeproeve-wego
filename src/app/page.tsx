import Image from "next/image";
import { SearchNavigation } from "@/components/searchNavigation";

export default function Home() {
    return (
        <main className="flex-1 flex flex-col items-center md:justify-center justify-between max-md:py-6 max-md:px-8">
            <h1 className="text-9xl font-bold text-center mt-40 max-lg:text-8xl max-md:hidden">
                Vi gør byen grønner
            </h1>

            <SearchNavigation className="md:hidden" />

            <div className="md:hidden bg-background p-4 rounded-2xl">
                <h1 className="text-xl font-extrabold">Sådan virker det</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean aliquam leo libero, vitae ullamcorper nunc rutrum sit
                    amet. Integer lobortis diam eu justo fermentum, lacinia
                    laoreet urna efficitur. Mauris sit amet urna vulputate,
                    vulputate turpis a, interdum elit. Fusce quis rutrum odio.
                    Integer nec euismod felis. Praesent ex justo, ultrices a
                    neque in, facilisis condimentum ex. Cras iaculis eget nulla
                    a vestibulum. Donec suscipit eu nunc in dictum. Vestibulum
                    congue scelerisque velit, ut tempus urna dictum eu. Morbi id
                    nisi risus. Pellentesque habitant morbi tristique senectus
                    et netus et malesuada fames ac turpis egestas. Integer
                    feugiat dui id elit placerat, at volutpat nunc rhoncus.
                </p>
            </div>

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
