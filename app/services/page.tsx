import { CTA, PageIntro, Services } from "@/components/shared";
export const metadata = {
  title: "Сайты, доработки, конфигураторы и автоматизация",
  description:
    "Сайты и доработки, подбор продукции, структурированный каталог и автоматизация расчётов и предложений.",
  alternates: { canonical: "/services" },
};
export default function Page() {
  return (
    <>
      <div className="wrap">
        <PageIntro
          label="Услуги"
          title="Не просто сайт. Инструмент для работы."
          description="Четыре направления, которые можно соединить в одну систему или запустить по отдельности — в зависимости от вашей задачи."
        />
        <Services />
      </div>
      <CTA />
    </>
  );
}
