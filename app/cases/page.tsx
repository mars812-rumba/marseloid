import { CTA, PageIntro, Projects } from "@/components/shared";
export const metadata = {
  title: "Проекты",
  description:
    "Дымоход-Трейд, Sunny Rentals, Sunny Booking и Food Market: реальные интерфейсы каталогов, расчётов, бронирования и ресторанных заказов.",
  alternates: { canonical: "/cases" },
};
export default function Page() {
  return (
    <>
      <div className="wrap">
        <PageIntro
          label="Проекты"
          title="Разные задачи. Системный подход."
          description="Подбор инженерной продукции, аренда транспорта и ресторанные заказы. От выбора клиента до внутренних процессов бизнеса."
        />
        <Projects covers />
        <p className="caption">
          Дымоход Трейд, Sunny Rentals и Sunny Booking — реальные экраны
          проектов.
        </p>
      </div>
      <CTA />
    </>
  );
}
