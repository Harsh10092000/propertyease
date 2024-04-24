import Autoplay from "embla-carousel-autoplay";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./adslider2.css";

const AllPropertySlider = (props) => {
    const OPTIONS = { loop: true };
    const { slides } = props;
    const [emblaMainRef] = useEmblaCarousel(OPTIONS, [
      Autoplay({ playOnInit: true, delay: 2000 }),
    ]);
  return (
    <div className="emblapop p-0 ad-11">
    <div className="embla__viewportpop" ref={emblaMainRef}>
      <div className="embla__containerpop">
        {slides?.map((item, index) => (
          <div className="embla__slidepop" key={index}>
            <a href={item.ad_link} target="_blank">
              <img
                className="embla__slide__imgpop"
                src={
                  import.meta.env.VITE_BACKEND + "/adImages/" + item.ad_image
                }
                alt="Propertyease"
              />
              <div className="top-left property-view-count">Sponsored</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default AllPropertySlider
