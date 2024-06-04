import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "./popslider.css";

const PopSlider = (props) => {
  const { slides, options } = props;
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    Array.from(Array(slides.length).keys())
  );

  useEffect(() => {
    if (!emblaMainApi) return;

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        // Check if Esc key is pressed
        props.handleClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [emblaMainApi]);


  useEffect(() => {
    if (!emblaMainApi) return;
    const handleLeft = (event) => {
      if (event.keyCode === 37) {
        // Check if Esc key is pressed
        scrollPrev();
      }
    };
    document.addEventListener("keydown", handleLeft);
    return () => {
      document.removeEventListener("keydown", handleLeft);
    };
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    const handleRight = (event) => {
      if (event.keyCode === 39) {
        // Check if Esc key is pressed
        scrollNext();
      }
    };
    document.addEventListener("keydown", handleRight);
    return () => {
      document.removeEventListener("keydown", handleRight);
    };
  }, [emblaMainApi]);


  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const [indexValue , setIndexValue] = useState("")
  return (
    <div className="emblapop">
      {/* <div className="d-flex flex-row-reverse ">
        <button title="Close">
          <IconX
            onClick={props.handleClose}
            width={40}
            height={40}
            className="coursor-pointer text-white mb-3"
          />
        </button>
      </div> */}
      <button className="close-button" onClick={props.handleClose} title="Click to close">
      <div class="close-container" >
        <div class="leftright"></div>
        <div class="rightleft"></div>
      </div>
      </button>
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
     
      <button className="arrow-button prev" onClick={scrollPrev}>
        <IconChevronLeft height={40} width={40} />
      </button>
      <button className="arrow-button next" onClick={scrollNext}>
        <IconChevronRight height={40} width={40}/>
      </button>
    </div>
  );
};

export default PopSlider;
