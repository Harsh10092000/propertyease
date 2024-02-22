import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import "./popslider.css";

const PopSlider = (props) => {
  const { slides, options } = props;
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    Array.from(Array(slides.length).keys())
  );

  useEffect(() => {
    if (!emblaMainApi) return;
  }, [emblaMainApi]);
  return (
    <div className="emblapop">
      <div className="embla__viewportpop" ref={emblaMainRef}>
        <div className="embla__containerpop" onClick={props.open}>
          {slides.map((item, index) => (
            <div className="embla__slidepop" key={index}>
              <img
                className="embla__slide__imgpop"
                src={
                  import.meta.env.VITE_BACKEND +
                  "/propertyImages/watermark/" +
                  item.img_link
                }
                alt="Propertyease"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopSlider;
