const selectsContainers = document.querySelectorAll(".cta-per__select");

selectsContainers.forEach((select) => {
  const parent = select.closest(".cta-per__label");

  const dropdownHeader = parent.querySelector(".cta-per__heading");
  const dropdownContent = parent.querySelector(".cta-per__content");
  const dropdownItems = dropdownContent.querySelectorAll(".cta-per__item");

  dropdownHeader.addEventListener("click", (e) => {
    let isActive = dropdownHeader.classList.toggle("active");

    dropdownContent.style.maxHeight = isActive
      ? dropdownContent.scrollHeight + "px"
      : null;
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      dropdownHeader.querySelector("span").textContent = item.textContent;
      select.value = item.textContent;
      dropdownHeader.classList.remove("active");
      dropdownContent.style.maxHeight = null;
    });
  });
});
