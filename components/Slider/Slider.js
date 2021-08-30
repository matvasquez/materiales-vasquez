import React, { useState, useEffect } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import algoliasearch from "algoliasearch";

// Import Swiper styles
import "../../node_modules/swiper/swiper-bundle.min.css";

// Components
import { SliderItem } from "../Slider-Item/SliderItem";

// Stiled-Components
import { SliderStyled } from "./style";

// install Swiper modules
SwiperCore.use([Autoplay]);

const Slider = () => {
  const [sliderItems, setSliderItems] = useState([]);

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
  const index = client.initIndex("sliders");

  useEffect(() => {
    index
      .search("", {
        attributesToRetrieve: ["objectID", "text", "image"],
        hitsPerPage: 3,
      })
      .then(({ hits }) => {
        setSliderItems(hits);
      });
  }, []);

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
