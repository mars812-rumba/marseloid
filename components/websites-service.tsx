import Link from "next/link";
import Image from "next/image";
import { PageIntro, CTA } from "@/components/shared";
import { Reveal, MotionLink } from "@/components/motion";
import { PricingDetails, WorkProcess } from "@/components/commercial-details";
import { websitesService } from "@/lib/websites-service";
import styles from "./websites-service.module.css";

export function WebsitesService() {
  return (
    <>
      <div className={`wrap ${styles.page}`}>
        <PageIntro
          label="Сайты и доработки"
          title="Разработка сайтов и доработка существующих проектов."
          description="От простой посадочной страницы до коммерческого сайта с собственной логикой."
        />
        <Reveal className={styles.intro}>
          <p>{websitesService.description}</p>
          <MotionLink className="button" href="/contact/">
            Обсудить задачу ↗
          </MotionLink>
        </Reveal>
        <section
          className={styles.section}
          aria-labelledby="capabilities-title"
        >
          <h2 id="capabilities-title">Что могу сделать</h2>
          <div className={styles.capabilities}>
            {websitesService.capabilities.map((item, i) => (
              <Reveal key={item.title}>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.example}`}
          aria-labelledby="loft-example-title"
        >
          <Link
            href="/cases/loft-fire/"
            className={styles.preview}
            aria-label="Посмотреть кейс LoftFire"
          >
            <Image
              src="/projects/loft-fire-devices.webp"
              alt="LoftFire: сайт и конструктор комплектов на ноутбуке и телефоне"
              width={1280}
              height={853}
              sizes="(max-width:767px) 90vw, 55vw"
            />
          </Link>
          <Reveal>
            <p className="eyebrow">Реальный проект / LoftFire</p>
            <h2 id="loft-example-title">Сайт с конструктором комплектов.</h2>
            <p>
              Разработал коммерческий сайт производителя садовой мебели.
              Посетитель может выбрать готовый комплект или собрать собственный,
              изменить количество изделий и получить автоматический расчёт
              стоимости.
            </p>
            <div className={styles.links}>
              <Link className="text-link" href="/cases/loft-fire/">
                Посмотреть кейс ↗
              </Link>
              <a
                className="text-link"
                href="https://loftfire.ru"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть сайт ↗
                <span className="sr-only"> (в новой вкладке)</span>
              </a>
            </div>
          </Reveal>
        </section>
        <Reveal
          as="section"
          className={`${styles.section} ${styles.smallTasks}`}
        >
          <h2>Не нужен новый сайт? Доработаем существующий.</h2>
          <div>
            <p>
              Если сайт уже работает, не всегда есть смысл переделывать его
              целиком. Можно исправить конкретную проблему, улучшить мобильную
              версию или добавить недостающую функциональность.
            </p>
            <MotionLink className="button" href="/contact/">
              Описать задачу ↗
            </MotionLink>
          </div>
        </Reveal>
        <section
          className={styles.section}
          aria-labelledby="service-pricing-title"
        >
          <h2 id="service-pricing-title">Стоимость и объём работы</h2>
          <p className={styles.lead}>
            Небольшую задачу можно выполнить отдельно. Более крупную разработку
            — разбить на этапы.
          </p>
          <PricingDetails />
        </section>
        <section
          className={styles.section}
          aria-labelledby="service-process-title"
        >
          <h2 id="service-process-title">От идеи до работающего результата.</h2>
          <WorkProcess />
        </section>
      </div>
      <CTA />
    </>
  );
}
