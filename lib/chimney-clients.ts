import type { CaseImage } from "@/lib/case-studies";
/** Reviewed public captures: original name/phone pixels are irreversibly blurred. */
export const chimneyClientImages: CaseImage[] = [
  {
    src: "/cases/dimohod-trade/clients-mobile-blurred.webp",
    width: 576,
    height: 1070,
    label: "Клиенты и поиск",
    mobileFullWidth: true,
    alt: "Клиенты и сметы Дымоход-Трейд: поиск клиента или замера и список сохранённых расчётов",
    caption:
      "Контакты и расчёты собраны в одном рабочем интерфейсе. Имя и телефон размыты; числа на скриншоте показывают состояние интерфейса, а не результат внедрения.",
  },
  {
    src: "/cases/dimohod-trade/client-estimates-mobile-blurred.webp",
    width: 576,
    height: 1154,
    label: "Расчёты клиента",
    mobileFullWidth: true,
    alt: "Карточка клиента Дымоход-Трейд: сумма расчёта, заметка о скидке, переход к смете и предыдущие расчёты",
    caption:
      "Из карточки клиента можно открыть смету, изменить заметку и просмотреть предыдущие расчёты. Имя и телефон скрыты непосредственно в изображении.",
  },
];
