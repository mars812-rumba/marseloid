import { CTA, PageIntro, Projects } from "@/components/shared";
export const metadata = {
  title: "Проекты",
  description:
    "Дымоход-Трейд, LoftFire, Sunny Rentals, Sunny Booking и Food Market: реальные интерфейсы каталогов, расчётов, бронирования и ресторанных заказов.",
  alternates: { canonical: "/cases" },
};
export default function Page() {
  return (
    <>
      <div className="wrap">
        <PageIntro
          label="Проекты"
          title="Разные задачи. Системный подход."
          description="Комплектация мебели, подбор продукции, аренда транспорта и ресторанные заказы. От выбора клиента до внутренних процессов бизнеса."
        />
        <Projects covers />
        <p className="caption">
          Превью показывают реальные интерфейсы проектов на компьютере и
          телефоне.
        </p>
      </div>
      <CTA />
    </>
  );
}
