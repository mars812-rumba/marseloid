/** Draft only: Telegram asks the visitor to send the message themselves. */
export const telegramProfile = "https://t.me/marseloid";
export const telegramGreeting = "Здравствуйте! Меня интересует:";
export function telegramMessageLink(message = telegramGreeting): string {
  return `${telegramProfile}?text=${encodeURIComponent(message)}`;
}
export const telegramContactHref = telegramMessageLink();
