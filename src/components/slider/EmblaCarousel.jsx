import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import {
  IconEye,
} from "@tabler/icons-react";
import "./embla.css";
const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    Array.from(Array(slides.length).keys())
  );
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container" onClick={props.open}>
          {slides.map((item, index) => (
            <div className="embla__slide " key={index}>
              
              <img
                title="Click to Enlarge Image"
                decoding="async"
                width="438px"
                height="304px"
                className=" coursor-pointer bg-img"
                src={
                  import.meta.env.VITE_BACKEND +
                  "/propertyImages/watermark/" +
                  item.img_link
                }
                // alt={props.pro_area_size +
                //   " " +
                //   props.pro_area_size_unit +
                //   " " +
                // props.pro_type.split(",")[0]
                // + " For" +
                // " " + props.pro_ad_type + " in " + props.pro_city}
                alt={`/${
                  props.pro_area_size + " " + props.pro_area_size_unit + " "
                }
                ${props.pro_type ? props.pro_type.split(",")[0] : ""} For ${
                  " " + props.pro_ad_type + " in " + props.pro_city
                }}`}
              />
              <img
              
              decoding="async"
              width="438px"
              height="304px"
                title="Click to Enlarge Image"
                className="embla__slide__img coursor-pointer"
                src={
                  import.meta.env.VITE_BACKEND +
                  "/propertyImages/watermark/" +
                  item.img_link
                }
                // alt={props.pro_area_size +
                //   " " +
                //   props.pro_area_size_unit +
                //   " " +
                // props.pro_type.split(",")[0]
                // + " For" +
                // " " + props.pro_ad_type + " in " + props.pro_city}
                alt={`/${
                  props.pro_area_size + " " + props.pro_area_size_unit + " "
                }
                ${props.pro_type ? props.pro_type.split(",")[0] : ""} For ${
                  " " + props.pro_ad_type + " in " + props.pro_city
                }}`}
              />
              <div className="top-left">
                {props.totalViews !== null && parseInt(props.totalViews) > 0 && (
                  <ul>

                  <li className="property-view-count ">
                    <IconEye width={16} height={16} />
                    Views {props.totalViews}
                  </li>
                  </ul>
                )}
              
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((items, index) => (
              <Thumb
                pro_area_size={props.pro_area_size}
                pro_area_size_unit={props.pro_area_size_unit}
                pro_type={props.pro_type}
                pro_ad_type={props.pro_ad_type}
                pro_city={props.pro_city}
                onClick={() => {
                  onThumbClick(index), props.handleCurrentImage(index);
                }}
                selected={index === selectedIndex}
                index={index}
                imgSrc={
                  import.meta.env.VITE_BACKEND +
                  "/propertyImages/watermark/" +
                  items.img_link
                }
                key={index}
                alt={`/${
                  props.pro_area_size + " " + props.pro_area_size_unit + " "
                }
                ${props.pro_type ? props.pro_type.split(",")[0] : ""} For ${
                  " " + props.pro_ad_type + " in " + props.pro_city
                }}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
