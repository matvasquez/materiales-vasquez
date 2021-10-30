import React, { useState, useEffect } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../node_modules/swiper/swiper-bundle.min.css";

// Components

// Stiled-Components
import { SliderStyled, SliderItem } from "./style";

// install Swiper modules
SwiperCore.use([Autoplay]);

const Slider = ({ sliderItems }) => {
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
          sliderItems.map(({ id, image, link, text }) => (
            <SwiperSlide key={id}>
              <SliderItem>
                <img src={`data:image/jpg;base64,${image}`} alt={text} />
              </SliderItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </SliderStyled>
  );
};

export default Slider;
