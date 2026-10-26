import Image from "next/image";
import { PhoneShell } from "@/components/phone-shell";
import { screenshotBase } from "@/lib/case-screenshots";

export function ChimneyCover() {
  return (
    <div className="project-art screenshot-cover" aria-hidden="true">
      <span className="cover-label">ДЫМОХОД ТРЕЙД / РЕАЛЬНЫЙ ИНТЕРФЕЙС</span>
      <div className="cover-desktop">
        <div className="window-chrome">
          <i />
          <i />
          <i />
          <span>dimohod-trade.pro</span>
        </div>
        <Image
          src={`${screenshotBase}/home-desktop.webp`}
          width={975}
          height={416}
          alt=""
          sizes="(max-width: 767px) 80vw, 45vw"
        />
      </div>
      <div className="cover-phone">
        <PhoneShell>
          <Image
            src={`${screenshotBase}/home-mobile.webp`}
            width={576}
            height={1154}
            alt=""
            sizes="(max-width: 767px) 100px, 140px"
          />
        </PhoneShell>
      </div>
      <span className="cover-caption">Каталог. Расчёт. Схема. PDF.</span>
    </div>
  );
}
