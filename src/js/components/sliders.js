import { Swiper } from "swiper";
import { Navigation } from "swiper/modules";

new Swiper(".gallery__slider .swiper", {
  modules: [Navigation],
  slidesPerView: 4,
  spaceBetween: 20,
  speed: 600,
  navigation: {
    prevEl: ".gallery__btn--prev",
    nextEl: ".gallery__btn--next",
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1025: {
      slidesPerView: 4,
    },
  },
});
