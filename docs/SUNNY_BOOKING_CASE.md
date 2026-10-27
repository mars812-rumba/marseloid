# Sunny Booking: источники и границы кейса

Отдельный кейс `/cases/sunny-booking`, данные — `lib/booking-case.ts`. Это собственная продуктовая разработка на этапе тестирования и подключения прокатов. История перехода от Sunny Rentals предоставлена владельцем. Массовые внедрения, платящие компании и финансовые результаты не заявляются. CRM и AI исходного Sunny Rentals не переносятся в состав платформы.

## Проверка исходного кода

Исходники `/home/sunny-rentals` изучены только на чтение; работающий сайт, сервисы, данные и настройки не менялись.

| Утверждение | Основание |
| --- | --- |
| React, TypeScript, Vite | корневые package.json / vite.config.ts, src/pages/PlatformAdminPage.tsx и ParkStorefrontPage.tsx |
| Python, FastAPI, Pydantic | backend/platform_admin_api.py, platform_owner_api.py, platform_storefront_api.py, platform_core/models.py |
| Независимые прокаты | platform_core/context.py: TenantContext и проверка tenant_id; models.py: TenantRecord, RentalAsset, Booking |
| Хранение данных | platform_core/repositories.py: отдельные JSON-коллекции в tenants/<tenant_id>, проверка принадлежности записей, файловые блокировки и атомарная запись |
| Создание, черновик, публикация и пробный период | platform_core/provisioning.py: TenantProvisioner, TenantProvisionRequest, trial_summary; src/pages/PlatformAdminPage.tsx |
| Доступ администратора и владельца | platform_admin_api.py, platform_core/admin_auth.py, platform_core/owner_web_auth.py, platform_owner_api.py |
| Публичные витрины и превью | platform_storefront_api.py: StorefrontReader, фильтр публикации и доступных записей, временный StorefrontPreview; src/pages/ParkStorefrontPage.tsx |
| Тарифы | platform_core/vehicle_details.py: flat / duration / seasonal, calculate_rental |
| Заявки, ручные брони и пересечения дат | platform_core/park_bookings.py: create_web, create_manual, check_overlap, change_status, общий набор bookings; проверка на сервере |
| Таймтейбл и выдачи/возвраты | src/components/platform/ParkBookingCalendar.tsx: timetable / deliveries, handoversOnly, выбор события и переход к заявке |
| Telegram | platform_core/telegram_identity.py, partner_bot.py, partner_webhook.py: проверка Mini App, приглашения, Bot API |

PostgreSQL, SQLAlchemy, Alembic и Redis не перечисляются: показанная реализация платформенных репозиториев использует JSON. Наличие файловых блокировок и проверки пересечений не описывается как транзакционная гарантия базы данных. Оплаты и автоматическое подключение без суперадминистратора не обещаются. AI-менеджер исходного проекта в этом кейсе отсутствует.

## Реальные изображения

Только `screenshots/sunny-rentals/{desktop,mobile}/new`. Файлы `old` не используются. Исходные 17 снимков сохранены без изменений. Подготовка: `node scripts/prepare-booking-assets.cjs`. Выходные WebP quality 88 в `public/cases/sunny-booking`, размеры — `lib/booking-assets.ts`.

| Файл | Исходный файл в new | Раздел |
| --- | --- | --- |
| platform-desktop | desktop/2026-10-27_19-11-12.png | Суперадминистратор и прокаты |
| settings-desktop | desktop/2026-10-27_19-11-40.png | Приглашение владельца и оформление |
| timetable-desktop | desktop/2026-10-27_19-11-54.png | Занятость |
| request-detail-desktop | desktop/2026-10-27_19-12-36.png | Подтверждение заявки |
| requests-desktop | desktop/2026-10-27_19-12-39.png | Список заявок |
| fleet-desktop | desktop/2026-10-27_19-13-00.png | Автопарк |
| storefront-desktop | desktop/2026-10-27_19-13-23.png | Поиск на витрине |
| dates-desktop | desktop/2026-10-27_19-13-29.png | Выбор дат |
| platform-mobile | mobile/photo_2026-10-27_19-37-34.jpg | Подключение парка |
| settings-mobile | mobile/photo_2026-10-27_19-37-39.jpg | Публикация и пробный период |
| timetable-mobile | mobile/photo_2026-10-27_19-37-42.jpg | Занятость |
| handovers-mobile | mobile/photo_2026-10-27_19-37-47.jpg | Выдачи и возвраты |
| request-detail-mobile | mobile/photo_2026-10-27_19-37-52.jpg | Подтверждение заявки |
| tariffs-mobile | mobile/photo_2026-10-27_19-37-59.jpg | Редактор тарифов |
| storefront-mobile | mobile/photo_2026-10-27_19-38-05.jpg | Результаты поиска и автомобиль |
| booking-mobile | mobile/photo_2026-10-27_19-38-07.jpg | Оформление заявки |
| requests-mobile | mobile/photo_2026-10-27_19-38-10.jpg | Список заявок |

Десктоп: удалены панели браузера и ОС, область 1898 × 815 уменьшена до 1280 × 550 без искажения пропорций. Мобильные административные кадры: удалены системная и Telegram-панели, оставлен интерфейс приложения, 576 × 1072. Публичные мобильные кадры: 576 × 1154. Детали, уже вышедшие за границы исходного кадра при съёмке, не дорисовываются.

В трёх файлах размыты Telegram ID суперадминистратора, имя и контакт клиента: детали сначала уменьшаются до 3 × 1 пикселя, затем растягиваются и размываются с мягкими краями. Это обработка самих файлов, а не CSS; скачивание не раскрывает исходные данные. EXIF/XMP не переносятся. Другие снимки просмотрены на наличие контактов и секретов.

Шесть тем 3D-демонстрации дают по пять экранов на устройство: общий суперадмин, витрина, занятость, заявки; обзор автопарка есть только на компьютере, редактор тарифов — только на телефоне. Отсутствующие пары не заменяются. При совпадении темы устройство сохраняет выбор, иначе используется первый доступный кадр. Шесть функциональных модулей используют все 17 изображений; внутри разных модулей одинаковые снимки не повторяются. Состояния интерфейса, числа, названия парков и цены не выдаются за результаты внедрения или стоимость разработки.

Обложка ведёт на публичную витрину `https://sunny-rentals.online/p/ar-rentals` — адрес подтверждён переданным снимком и маршрутом `/p/:tenantId`. Это пример витрины платформы, а не переименование оригинального Sunny Rentals. Кейс ссылается на историю Sunny Rentals; данные и функциональность существующих кейсов не редактируются.
