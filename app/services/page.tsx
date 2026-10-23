import { CTA, PageIntro, Services } from "@/components/shared";
export const metadata = {
  title: "Разработка конфигураторов, каталогов и автоматизация КП",
  description:
    "Три направления разработки: подбор продукции, структурированный каталог и автоматизация расчётов и предложений.",
  alternates: { canonical: "/services" },
};
export default function Page() {
  return (
    <>
      <div className="wrap">
        <PageIntro
          label="Услуги"
          title="Не просто сайт. Инструмент для работы."
          description="Три направления, которые можно соединить в одну систему или запустить по отдельности — в зависимости от вашей задачи."
        />
        <Services />
      </div>
      <CTA />
    </>
  );
}
