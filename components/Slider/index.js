import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "../../node_modules/swiper/swiper-bundle.min.css";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// install Swiper modules
SwiperCore.use([Autoplay]);

// CSS
import styles from "@/styles/components/Slider.module.css";

const Slider = ({ sliderItems }) => {
  const { container, linkSlider } = styles;
  return (
    <section className={container}>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {sliderItems &&
          sliderItems.map(({ articulo_id, image, link, text }) => (
            <SwiperSlide key={articulo_id}>
              <a
                href={link}
                area-aria-label={articulo_id}
                className={linkSlider}
              >
                <Image
                  loader={loader}
                  src={image}
                  alt={articulo_id}
                  layout="fill"
                  objectFit="cover"
                  blurDataURL
                  priority
                />
              </a>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Slider;
