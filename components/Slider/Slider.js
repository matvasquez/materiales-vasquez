import React, { useState, useEffect } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../node_modules/swiper/swiper-bundle.min.css";

// Components
import { SliderItem } from "../Slider-Item/SliderItem";

// Stiled-Components
import { SliderStyled } from "./style";

// install Swiper modules
SwiperCore.use([Autoplay]);

const sliderItems = [
  {
    text: "Código de descuento 10% PUERTASMVH",
    image:
      "https://res.cloudinary.com/duibtuerj/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1629303076/slider/photo-1500325478868-229dbf064350_xiofl9.jpg",
  },
  {
    text: `Código de descuento 10% CALENTADORESMVH`,
    image:
      "https://res.cloudinary.com/duibtuerj/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1629303695/slider/photo-1507652313519-d4e9174996dd_kxkznr.jpg",
  },
  {
    text: "Mejora la tecnología de tu hogar",
    image:
      "https://res.cloudinary.com/duibtuerj/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1629303696/slider/photo-1588854337048-44569c79c614_sqmjry.jpg",
  },
];

const Slider = () => {
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
          sliderItems.map((item, i) => (
            <SwiperSlide key={(item, i)}>
              {<SliderItem {...item} />}
            </SwiperSlide>
          ))}
      </Swiper>
    </SliderStyled>
  );
};

export default Slider;
