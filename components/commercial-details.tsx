import { Reveal, MotionLink } from "@/components/motion";
import { pricing } from "@/lib/pricing";
import { home } from "@/lib/home-content";
import styles from "./commercial-details.module.css";

export function PricingDetails({ href = "/contact/" }: { href?: string }) {
  return (
    <Reveal>
      <dl className={styles.prices}>
        {pricing.items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.from === null ? (
                "По оценке"
              ) : (
                <>
                  от{" "}
                  <strong>
                    {new Intl.NumberFormat("ru-RU").format(item.from)}
                  </strong>{" "}
                  ₽
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className={styles.note}>{pricing.note}</p>
      <MotionLink className="button" href={href}>
        Получить оценку задачи <span aria-hidden="true">↗</span>
      </MotionLink>
    </Reveal>
  );
}
export function WorkProcess() {
  return (
    <ol className={styles.timeline}>
      {home.process.items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 0.07}>
          <span className={styles.step}>{String(i + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
