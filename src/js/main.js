import "./_components.js";

import { Fancybox } from "@fancyapps/ui";
Fancybox.bind('[data-fancybox="gallery"]', {
  compact: false,
  idle: false,

  animated: false,
  showClass: false,
  hideClass: false,

  dragToClose: false,

  Images: {
    // Disable animation from/to thumbnail on start/close
    zoom: false,
  },
});

const burgerBtn = document.querySelector(".burger");

if (burgerBtn) {
  const menu = document.querySelector(".menu");

  burgerBtn.addEventListener("click", (e) => {
    burgerBtn.classList.toggle("active");
    menu.classList.toggle("active");
  });

  const menuItems = menu.querySelectorAll("a");

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      menu.classList.remove("active");
      burgerBtn.classList.remove("active");
    });
  });
}
