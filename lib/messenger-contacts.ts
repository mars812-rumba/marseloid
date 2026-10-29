import { telegramContactHref } from "@/lib/telegram-contact";
/** Contact details supplied by the owner. MAX profile URL must come from its app. */
export const messengerContacts = {
  whatsapp: { href: "https://wa.me/79219959164", label: "Написать в WhatsApp" },
  telegram: { href: telegramContactHref, label: "Написать в Telegram" },
  max: {
    href: "https://max.ru/u/f9LHodD0cOKZpgWqII9-kdBQn4ZLcqLxMa2zVzWU9LQa_3Ii8t-Zg4dqv9M",
    label: "Написать в MAX",
    phone: "+79675370546",
    displayPhone: "+7 967 537-05-46",
  },
};
