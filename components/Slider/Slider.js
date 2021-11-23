import React, { useState, useEffect } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

// Data
import { sliders } from "../../database/slider";

// Import Swiper styles
import "../../node_modules/swiper/swiper-bundle.min.css";

// Components

// Stiled-Components
import { SliderStyled, SliderItem } from "./style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// install Swiper modules
SwiperCore.use([Autoplay]);

const Slider = () => {
  const sliderItems = sliders;
  return (
    <SliderStyled>
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
              <Link href={link}>
                <SliderItem area-aria-label={text}>
                  <Image
                    loader={loader}
                    src={image}
                    alt={text}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL
                  />
                </SliderItem>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </SliderStyled>
  );
};

export default Slider;
