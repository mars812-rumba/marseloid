import { telegramContactHref } from "@/lib/telegram-contact";
import { PageIntro } from "@/components/shared";
import { Brief } from "@/components/brief";
export const metadata = {
  title: "Обсудить задачу",
  description:
    "Напишите Марселю в Telegram: покажите текущий расчёт или опишите задачу, чтобы обсудить первую версию системы.",
  alternates: { canonical: "/contact" },
};
export default function Page() {
  return (
    <section className="wrap">
      <PageIntro
        label="Контакт"
        title="Начнём с вашей задачи."
        description="Не нужно составлять большое техническое задание. Покажите, как работает процесс сейчас, — вместе определим, что стоит автоматизировать первым."
      />
      <div className="contact-layout">
        <div className="direct-contact">
          <span className="eyebrow">Напрямую, без менеджера</span>
          <br />
          <a href={telegramContactHref}>@marseloid ↗</a>
          <p>
            Можно сразу написать в Telegram или подготовить описание с помощью
            формы рядом.
          </p>
          <p>
            Пригодятся обезличенный прайс, 1–2 примера расчёта или коммерческого
            предложения. Стоимость и сроки обсуждаем после разбора задачи.
          </p>
        </div>
        <Brief />
      </div>
    </section>
  );
}
