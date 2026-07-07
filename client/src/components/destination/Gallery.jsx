import { useState } from "react";
import ImageSlider from "./ImageSlider";
import ThumbnailStrip from "./ThumbnailStrip";

function Gallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full lg:w-[45%] shrink-0">
      <ImageSlider images={images} activeIndex={activeIndex} onChange={setActiveIndex} />
      <ThumbnailStrip images={images} activeIndex={activeIndex} onSelect={setActiveIndex} />
    </div>
  );
}

export default Gallery;
