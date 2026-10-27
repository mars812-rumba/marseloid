import { CTA, PageIntro, Projects } from "@/components/shared";
export const metadata = {
  title: "Проекты",
  description:
    "Дымоход Трейд — каталог и конфигуратор. Sunny Rentals — система собственного проката. Sunny Booking — мультипарковая платформа на этапе тестирования.",
  alternates: { canonical: "/cases" },
};
export default function Page() {
  return (
    <>
      <div className="wrap">
        <PageIntro
          label="Проекты"
          title="Разные задачи. Системный подход."
          description="Подбор инженерной продукции, работа собственного проката и платформа для независимых автопарков. От выбора клиента до внутренних процессов бизнеса."
        />
        <Projects />
        <p className="caption">
          Дымоход Трейд, Sunny Rentals и Sunny Booking — реальные экраны
          проектов.
        </p>
      </div>
      <CTA />
    </>
  );
}
