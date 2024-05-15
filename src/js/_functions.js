// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение операционной системы на мобильных
// import { mobileCheck } from "./functions/mobile-check.js";
// console.log(mobileCheck())

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Реализация бургер-меню
// import { burger } from './functions/burger';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

// Реализация табов
// import GraphTabs from 'graph-tabs';
// const tabs = new GraphTabs('tab');

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Подключение плагина кастом-скролла
// import 'simplebar';

// Подключение плагина для позиционирования тултипов
// import { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// Подключение свайпера
// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper(el, {
//   slidesPerView: 'auto',
// });

// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });
import JustValidate from "just-validate";
import Inputmask from "../../node_modules/inputmask/dist/inputmask.es6.js";

export const validateForms = (selector, rules, checkboxes = [], afterSend) => {
  const form = document?.querySelector(selector);
  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    console.error("Нет такого селектора!");
    return false;
  }

  if (!rules) {
    console.error("Вы не передали правила валидации!");
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask("+7 (999) 999-99-99");
    inputMask.mask(telSelector);

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: "function",
          validator: function () {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError,
        });
      }
    }
  }

  const validation = new JustValidate(selector);

  for (let item of rules) {
    validation.addField(item.ruleSelector, item.rules);
  }

  if (checkboxes.length) {
    for (let item of checkboxes) {
      validation.addRequiredGroup(`${item.selector}`, `${item.errorMessage}`);
    }
  }

  validation.onSuccess((ev) => {
    let formData = new FormData(ev.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
          }
          console.log("Отправлено");
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    ev.target.reset();
  });
};

const rules1 = [
  {
    ruleSelector: ".input-tel",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];
const rules2 = [
  {
    ruleSelector: ".input-tel",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
  {
    ruleSelector: ".input-name",
    rules: [
      {
        rule: "required",
      },
      {
        rule: "minLength",
        value: 2,
      },
      {
        rule: "maxLength",
        value: 15,
      },
    ],
  },
];

const afterForm = () => {
  alert("Ваша заявка отправлена!");
};

validateForms(".cta-per__form", rules1, [], afterForm);
validateForms(".cta-form", rules2, [], afterForm);
