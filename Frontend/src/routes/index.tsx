import { useSlides, useSådan } from "@/lib/query";
import { createFileRoute } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import MobilFilterNav from "@/components/mobilFilterNav";
import { GradualSpacing } from "@/components/gradual-spacing";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: Slides } = useSlides();
  const { data: item } = useSådan();

  return (
    <>
      <figure className="flex-col relative w-full min-h-[calc(100vh-80px)] items-stretch justify-stretch">
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          speed={5000}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          className="w-full max-h-[calc(100vh-80px)]"
        >
          {Slides.map(({ imageUrl, id, text }) => (
            <SwiperSlide
              key={id}
              className="relative w-full h-full min-h-[calc(100vh-80px)]"
            >
              <img
                className="object-cover w-full h-full min-h-[calc(100vh-80px)] min-w-full max-w-full max-h-full"
                src={imageUrl}
                alt={"slide image"}
              />
              <figcaption className="absolute top-1/2 left-1/2 z-20 w-full flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-black text-center px-4 py-2 hidden xl:flex">
                  <GradualSpacing text={text} />
                </h1>
              </figcaption>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="xl:hidden absolute left-1/2 top-1/2 z-30 w-full transform -translate-x-1/2 -translate-y-1/2 flex ">
          <MobilFilterNav />
        </div>
      </figure>
      <section className="md:hidden p-4">
        {item.map(({ content, id, title }) => (
          <article key={id}>
            <h2 className="font-bold">{title}</h2>
            <p dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        ))}
      </section>
    </>
  );
}
