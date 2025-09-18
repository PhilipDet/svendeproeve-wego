import { SearchNavigation } from "@/components/searchNavigation";
import ImageSlider from "@/components/imageSlider";

export default function Home() {
    return (
        <main className="w-full flex-1 flex flex-col gap-5 items-center md:justify-center justify-between max-md:py-6 max-md:px-8">
            <SearchNavigation className="md:hidden" />

            <div className="md:hidden bg-background p-4 rounded-2xl">
                <h2 className="text-xl font-extrabold">Sådan virker det</h2>
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

            <ImageSlider />
        </main>
    );
}
