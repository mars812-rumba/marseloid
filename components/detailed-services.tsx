import Link from "next/link";
import type { ReactNode } from "react";
import {
  Boxes,
  ListFilter,
  LayoutDashboard,
  Search,
  Ruler,
  Package,
  FileText,
  SlidersHorizontal,
  Users,
  CalendarDays,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import { PageIntro } from "@/components/shared";
import { MotionLink, Reveal } from "@/components/motion";
import { CaseImageViewer } from "@/components/case-image-viewer";
import { CanopyDemo } from "@/components/canopy-demo";
import {
  servicePages,
  serviceEvidence as evidence,
  type DetailedServiceSlug,
} from "@/lib/service-pages";
import type { CaseImage } from "@/lib/case-studies";
import styles from "./detailed-services.module.css";

type Story = { title: string; paragraphs: string[] };
type Contact = { title: string; description: string; label: string };
function Intro({ slug }: { slug: DetailedServiceSlug }) {
  const data = servicePages[slug];
  return (
    <>
      <PageIntro
        label="Разработка для бизнеса / услуги"
        title={data.heading}
        description={data.subtitle}
      />
      <Reveal className={styles.intro}>
        {"extra" in data && <p>{data.extra}</p>}
        <MotionLink className="button" href="/contact/">
          {data.cta} <span aria-hidden="true">↗</span>
        </MotionLink>
        <p className={styles.audience}>
          Для бизнеса и проектов веб-студий. Общение напрямую с разработчиком.
        </p>
      </Reveal>
    </>
  );
}
function Copy({
  story,
  id,
  children,
}: {
  story: Story;
  id: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className={styles.copy}>
      <h2 id={id}>{story.title}</h2>
      {story.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {children}
    </Reveal>
  );
}
function Gallery({ images, title }: { images: CaseImage[]; title: string }) {
  return (
    <div className={styles.evidence}>
      <CaseImageViewer images={images} title={title} />
    </div>
  );
}
function CaseLink({ slug, label }: { slug: string; label: string }) {
  return (
    <Link className="text-link" href={`/cases/${slug}/`}>
      {label} <span aria-hidden="true">↗</span>
    </Link>
  );
}
function Features({
  items,
  variant,
  icons,
}: {
  items: { title: string; description: string }[];
  variant: "panels" | "calculations" | "automation";
  icons: (typeof Boxes)[];
}) {
  return (
    <div className={`${styles.features} ${styles[variant]}`}>
      {items.map((item, i) => {
        const Icon = icons[i];
        return (
          <Reveal key={item.title}>
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Reveal>
        );
      })}
    </div>
  );
}
function Contact({ data }: { data: Contact }) {
  return (
    <Reveal as="section" className={`contact-band wrap ${styles.contact}`}>
      <h2>{data.title}</h2>
      <div className="contact-bottom">
        <p>{data.description}</p>
        <MotionLink className="button light" href="/contact/">
          {data.label} <span aria-hidden="true">↗</span>
        </MotionLink>
      </div>
    </Reveal>
  );
}
function CatalogService() {
  const data = servicePages["manufacturer-catalogs"];
  return (
    <>
      <article className={`wrap ${styles.page} ${styles.catalogPage}`}>
        <Intro slug="manufacturer-catalogs" />
        <section
          className={`${styles.section} ${styles.split}`}
          aria-labelledby="catalog-problem"
        >
          <Copy story={data.problem} id="catalog-problem" />
          <Gallery
            title="Карточка продукции Дымоход-Трейд"
            images={evidence.product}
          />
        </section>
        <section className={styles.section} aria-labelledby="catalog-features">
          <Reveal>
            <h2 id="catalog-features">Всё необходимое для выбора товара.</h2>
          </Reveal>
          <Features
            items={data.features}
            variant="panels"
            icons={[Boxes, ListFilter, LayoutDashboard, Search]}
          />
        </section>
        <section
          className={`${styles.section} ${styles.catalogExample}`}
          aria-labelledby="catalog-example"
        >
          <Copy story={data.example} id="catalog-example">
            <CaseLink slug="chimneys" label="Посмотреть кейс «Дымоход-Трейд»" />
          </Copy>
          <Gallery
            title="Каталог: ассортимент, фотографии и карточка товара"
            images={evidence.catalog}
          />
        </section>
        <section
          className={`${styles.section} ${styles.connection}`}
          aria-labelledby="catalog-connected"
        >
          <Copy story={data.connected} id="catalog-connected" />
          <ol className={styles.flow} aria-label="От выбора товара к расчёту">
            {data.connected.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Link className="text-link" href="/services/product-configurators/">
            Как устроить расчёт комплекта ↗
          </Link>
        </section>
      </article>
      <Contact data={data.contact} />
    </>
  );
}
function ConfiguratorService() {
  const data = servicePages["product-configurators"];
  return (
    <>
      <article className={`wrap ${styles.page} ${styles.configuratorPage}`}>
        <Intro slug="product-configurators" />
        <section
          className={`${styles.section} ${styles.manualCalculation}`}
          aria-labelledby="configurator-problem"
        >
          <Copy story={data.problem} id="configurator-problem" />
          <p className={styles.callout}>
            Расчёт по согласованным правилам. Технические решения проверяет
            специалист.
          </p>
        </section>
        <section
          className={`${styles.section} ${styles.demoSection}`}
          aria-labelledby="calculator-demo-heading"
        >
          <Reveal>
            <h2 id="calculator-demo-heading">Попробуйте изменить параметры.</h2>
            <p className={styles.demoNotice}>
              Демонстрационный расчёт. Цены условные.
            </p>
          </Reveal>
          <CanopyDemo />
          <p className={styles.demoExplanation}>
            Такой принцип можно использовать для навесов, мебели, строительных
            конструкций и другой продукции, где цена зависит от размеров,
            материалов или комплектации.
          </p>
        </section>
        <section
          className={`${styles.section} ${styles.wideExample}`}
          aria-labelledby="chimney-configurator"
        >
          <Copy story={data.chimney} id="chimney-configurator">
            <CaseLink slug="chimneys" label="Посмотреть кейс «Дымоход-Трейд»" />
          </Copy>
          <Gallery
            title="Дымоход-Трейд: расчёт, схема и PDF"
            images={evidence.chimney}
          />
        </section>
        <section
          className={`${styles.section} ${styles.loftExample}`}
          aria-labelledby="loft-configurator"
        >
          <Copy story={data.loft} id="loft-configurator">
            <CaseLink slug="loft-fire" label="Посмотреть кейс LoftFire" />
          </Copy>
          <Gallery
            title="LoftFire: готовые комплекты и конструктор"
            images={evidence.loft}
          />
        </section>
        <section className={styles.section} aria-labelledby="calculation-types">
          <Reveal>
            <h2 id="calculation-types">
              Калькулятор под конкретную продукцию.
            </h2>
            <p className={styles.lead}>
              Логика зависит от вашей продукции. Сначала разбираем существующие
              правила расчёта, затем превращаем их в понятный интерфейс.
            </p>
          </Reveal>
          <Features
            items={data.features}
            variant="calculations"
            icons={[Ruler, Package, SlidersHorizontal, FileText]}
          />
        </section>
      </article>
      <Contact data={data.contact} />
    </>
  );
}
function AutomationService() {
  const data = servicePages["quote-automation"];
  return (
    <>
      <article className={`wrap ${styles.page} ${styles.automationPage}`}>
        <Intro slug="quote-automation" />
        <section
          className={`${styles.section} ${styles.automationProblem}`}
          aria-labelledby="automation-problem"
        >
          <Copy story={data.problem} id="automation-problem" />
          <div
            className={styles.processLabels}
            aria-label="Связанные рабочие данные"
          >
            <span>Клиент</span>
            <span>Заявка</span>
            <span>Календарь</span>
            <span>История</span>
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.crmSection}`}
          aria-labelledby="chimney-crm"
        >
          <Copy story={data.chimneyCrm} id="chimney-crm">
            <aside
              className={styles.businessResult}
              aria-label="Результат для менеджера"
            >
              <span>Меньше ручной работы</span>
              <h3>{data.chimneyCrm.result.title}</h3>
              <p>{data.chimneyCrm.result.description}</p>
            </aside>
            <ol className={styles.crmFlow} aria-label="От клиента к документу">
              {data.chimneyCrm.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <CaseLink slug="chimneys" label="Посмотреть кейс «Дымоход-Трейд»" />
          </Copy>
          <Gallery
            title="Дымоход-Трейд: клиентская CRM и сметы"
            images={evidence.chimneyCrm}
          />
        </section>
        <section
          className={`${styles.section} ${styles.wideExample}`}
          aria-labelledby="sunny-workspace"
        >
          <Copy story={data.sunny} id="sunny-workspace">
            <CaseLink slug="sunny-rentals" label="Посмотреть Sunny Rentals" />
          </Copy>
          <Gallery
            title="Sunny Rentals: рабочие инструменты проката"
            images={evidence.sunny}
          />
        </section>
        <section
          className={`${styles.section} ${styles.aiSection}`}
          aria-labelledby="sunny-ai"
        >
          <Copy story={data.ai} id="sunny-ai">
            <p className={styles.smallNote}>
              Ассистент помогает с типовыми вопросами; работу с клиентом можно
              продолжить вручную.
            </p>
          </Copy>
          <Gallery
            title="Sunny Rentals: управление AI-ассистентом"
            images={evidence.ai}
          />
        </section>
        <section
          className={`${styles.section} ${styles.bookingSection}`}
          aria-labelledby="booking-platform"
        >
          <div>
            <p className={styles.status}>
              Sunny Booking · тестирование и подключение парков
            </p>
            <Copy story={data.booking} id="booking-platform">
              <CaseLink slug="sunny-booking" label="Посмотреть Sunny Booking" />
            </Copy>
          </div>
          <ol
            className={styles.tenantFlow}
            aria-label="Как устроена мультипарковая платформа"
          >
            <li>
              <strong>{data.bookingFlow.platform}</strong>
              <span>Sunny Booking</span>
            </li>
            <li>
              <strong>{data.bookingFlow.companies}</strong>
            </li>
            <li>
              <strong>{data.bookingFlow.ownership}</strong>
              <ul>
                {data.bookingFlow.resources.map((resource) => (
                  <li key={resource}>{resource}</li>
                ))}
              </ul>
            </li>
          </ol>
          <Gallery
            title="Sunny Booking: независимые прокаты"
            images={evidence.booking}
          />
        </section>
        <section
          className={`${styles.section} ${styles.split}`}
          aria-labelledby="food-workspace"
        >
          <div>
            <p className={styles.status}>
              Food Market · демонстрационный продукт
            </p>
            <Copy story={data.food} id="food-workspace">
              <CaseLink slug="food-market" label="Посмотреть Food Market" />
            </Copy>
          </div>
          <Gallery
            title="Food Market: меню, управление и заказы"
            images={evidence.food}
          />
        </section>
        <section className={styles.section} aria-labelledby="automation-types">
          <Reveal>
            <h2 id="automation-types">Что можно автоматизировать</h2>
          </Reveal>
          <Features
            items={data.features}
            variant="automation"
            icons={[
              Users,
              CalendarDays,
              FileText,
              LayoutDashboard,
              MessagesSquare,
              Sparkles,
            ]}
          />
        </section>
      </article>
      <Contact data={data.contact} />
    </>
  );
}
export function DetailedService({ slug }: { slug: DetailedServiceSlug }) {
  if (slug === "manufacturer-catalogs") return <CatalogService />;
  if (slug === "product-configurators") return <ConfiguratorService />;
  return <AutomationService />;
}
