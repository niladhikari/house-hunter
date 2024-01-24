import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Banner.css";
import { HashLink } from "react-router-hash-link";

const Banner = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <div className="mt-6 lg:mt-1  z-0 mx-auto background py-4 lg:py-0 lg:h-[80vh] grid justify-center items-center">
        <div className="mt-20 mb-20 lg:mb-0">
            <HashLink
              to={`#discover`}
              className=" bg-orange-600 p-6 font-semibold text-xl"
            >
              Discover Your Next House
            </HashLink>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="mt-6 lg:mt-1  z-0 mx-auto background2 py-4 lg:py-0 lg:h-[80vh] grid justify-center items-center">
        <div className="mt-20 mb-20 lg:mb-0">
            <HashLink
              to={`#discover`}
              className=" bg-orange-600 p-6 font-semibold text-xl"
            >
              Discover Your Next House
            </HashLink>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="mt-6 lg:mt-1  z-0 mx-auto background3 py-4 lg:py-0 lg:h-[80vh] grid justify-center items-center">
          <div className="mt-20 mb-20 lg:mb-0">
            <HashLink
              to={`#discover`}
              className=" bg-orange-600 p-6 font-semibold text-xl"
            >
              Discover Your Next House
            </HashLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
