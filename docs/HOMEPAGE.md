# Главная Marseloid

Переработана существующая главная, без изменения страниц кейсов, 3D-компонентов и файлов мокапов. Основа — тёплый светлый editorial-стиль, существующие Projects, Reveal, MotionLink, навигация и подвал.

## Где редактировать

- `lib/home-content.ts` — тексты, четыре сценария, четыре направления услуг, краткие описания проектов, сравнение процессов, сотрудничество и этапы.
- `lib/pricing.ts` — пять коммерческих ориентиров, прямо предоставленных владельцем: 5 000 / 25 000 / 60 000 / 40 000 ₽ и индивидуальная оценка. Это не данные рынка, не фиксированные пакеты и не публичная оферта.
- `app/page.tsx` — последовательность девяти разделов и метаданные главной.
- `app/home.module.css` — локальная композиция и адаптация. Общие стили остальных страниц не меняются.

Hero использует min-height, не фиксированную высоту. При коротком окне, увеличенном тексте или открытом мобильном меню содержимое растёт без обрезки. Кнопка остаётся под описанием; нижняя ссылка ведёт к #tasks. Контактные CTA главной и её шапки ведут к #contact. Все якоря имеют реальную цель. Сохраняются плавная прокрутка и reduced-motion из общей дизайн-системы.

## Подтверждения и ограничения

Краткие описания опираются на существующие кейсы: `lib/case-studies.ts`, `lib/sunny-case.ts`, `lib/booking-case.ts`, `lib/food-case.ts`.

- Дымоход-Трейд — производитель, а не поставщик: сохранено ранее подтверждённое позиционирование. Есть подбор, сметы, PDF и рабочий интерфейс менеджера. В сравнении нет конкретных процентов или часов экономии.
- Sunny Rentals использовался в собственном прокате; CRM, Telegram и управляемый AI-ассистент описаны в его кейсе.
- Sunny Booking — продукт в тестировании и подключении парков, без утверждений о массовых продажах.
- Food Market — собственная демоверсия, без выдуманного внедрения и коммерческих результатов.

Опциональные summaries компонента Projects меняют только главную. Исходные описания /cases и подробных кейсов остаются прежними. Все четыре прозрачных WebP-мокапа и фотография сохранены.

Контакт — существующий `https://t.me/marseloid`; альтернативная страница `/contact/` сохранена. Новых анкет, аналитических отправок, интеграций, отзывов, рейтингов, финансовых показателей или JSON-LD Offers нет. SEO главной обновлено локально: title, description, canonical, OG и Twitter используют существующее og.png.

Перед публикацией владелец может визуально оценить композицию и цены. После публикации вручную проверить открытие Telegram на устройстве и социальное превью на публичном домене. Во время разработки публикация, Git commit/push и перезапуск production не выполняются.

LoftFire update: five projects in the order Chimneys, LoftFire, Sunny Rentals,
Sunny Booking, Food Market. The original four covers and hero remain unchanged.
Tasks now use concise icon cards, services use open editorial blocks, comparison
uses connected paths, agency collaboration has a dark surface. PricingDetails and
WorkProcess are shared with the new websites-and-improvements service. Pricing
values remain in their original configuration. LoftFire's static device cover is
rendered with real screenshots and the original device components.
