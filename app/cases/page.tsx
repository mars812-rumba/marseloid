import { CTA, PageIntro, Projects } from "@/components/shared";
export const metadata = {
  title: "Проекты",
  description:
    "Дымоход Трейд — каталог и конфигуратор. Sunny Rentals — система бронирования, автопарка и CRM для собственного бизнеса.",
  alternates: { canonical: "/cases" },
};
export default function Page() {
  return (
    <>
      <div className="wrap">
        <PageIntro
          label="Проекты"
          title="Разные задачи. Системный подход."
          description="Подбор инженерной продукции и аренда автомобилей. В обоих случаях важен путь от выбора клиента до внутренней работы бизнеса."
        />
        <Projects />
        <p className="caption">
          Дымоход Трейд и Sunny Rentals — реальные экраны проектов.
        </p>
      </div>
      <CTA />
    </>
  );
}
