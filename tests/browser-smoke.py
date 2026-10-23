"""Run with the host Playwright venv; read-only against local site except demo POSTs."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get("MARSELOID_BASE_URL", "http://127.0.0.1:3102")
OUT = Path("/home/marseloid/test-results")
OUT.mkdir(exist_ok=True)
ROUTES = ["/", "/services", "/services/product-configurators", "/services/manufacturer-catalogs", "/services/quote-automation", "/cases", "/cases/chimneys", "/cases/sunny-rentals", "/about", "/contact", "/privacy", "/blog", "/blog/calculator-or-system", "/blog/excel-to-quote", "/robots.txt", "/sitemap.xml"]
MISSING = ["/missing-marseloid", "/services/missing", "/cases/missing", "/blog/missing"]
report = {"base": BASE, "routes": [], "viewports": [], "errors": []}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 1000}, permissions=["clipboard-read", "clipboard-write"])
    page = context.new_page()
    page.on("pageerror", lambda error: report["errors"].append(str(error)))
    for route in ROUTES + MISSING:
        response = page.goto(BASE + route, wait_until="networkidle")
        status = response.status
        assert status == (404 if route in MISSING else 200), (route, status)
        if route in ROUTES and route not in ("/robots.txt", "/sitemap.xml"):
            assert page.locator("h1").count() == 1, route
            assert page.locator('link[rel="canonical"]').count() == 1, route
            assert page.title() and "Marseloid" in page.title(), route
            page.add_script_tag(path="/home/marseloid/node_modules/axe-core/axe.min.js")
            violations = page.evaluate("""async () => (await axe.run(document, {
                runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] }
            })).violations.map(v => ({id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target)}))""")
            assert not violations, (route, violations)
        report["routes"].append({"path": route, "status": status})
    page.goto(BASE, wait_until="networkidle")
    expect(page.get_by_role("status")).to_have_text("Формула проверена · Python API")
    page.route("**/api/demo/quote", lambda route: route.abort())
    page.locator("#depth").focus()
    page.keyboard.press("ArrowRight")
    expect(page.get_by_role("status")).to_have_text("API недоступен · показан локальный пример")
    page.unroute("**/api/demo/quote")
    price = page.locator(".demo-total strong").inner_text()
    page.locator("#width").focus()
    page.keyboard.press("ArrowRight")
    expect(page.locator("#width")).to_have_value("5")
    expect(page.locator(".demo-total strong")).not_to_have_text(price)
    page.get_by_role("button", name="Металл", exact=True).click()
    expect(page.get_by_role("button", name="Металл", exact=True)).to_have_attribute("aria-pressed", "true")
    expect(page.get_by_role("status")).to_have_text("Формула проверена · Python API")
    for width, height in [(1440, 1000), (768, 1024), (375, 812), (812, 375)]:
        page.set_viewport_size({"width": width, "height": height})
        page.goto(BASE, wait_until="networkidle")
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (width, height, "overflow")
        page.screenshot(path=str(OUT / f"home-{width}x{height}.png"), full_page=True)
        report["viewports"].append({"width": width, "height": height, "overflow": False})
    page.set_viewport_size({"width": 375, "height": 812})
    page.get_by_role("button", name="Меню", exact=True).click()
    expect(page.locator("#navigation")).to_be_visible()
    page.get_by_role("link", name="Проекты", exact=True).first.focus()
    page.keyboard.press("Escape")
    expect(page.locator("#navigation")).not_to_be_visible()
    expect(page.get_by_role("button", name="Меню", exact=True)).to_be_focused()
    page.goto(BASE + "/contact", wait_until="networkidle")
    page.get_by_label("Ваша сфера").fill("Тестовая сфера")
    page.get_by_label("Что нужно упростить?").fill("Тест только браузерной формы, сообщение не отправляется.")
    page.get_by_role("button", name="Подготовить и скопировать").click()
    expect(page.get_by_role("status")).to_contain_text("скопировано")
    assert "Тестовая сфера" in page.get_by_label("Текст сообщения").input_value()
    page.screenshot(path=str(OUT / "contact-mobile.png"), full_page=True)
    page.emulate_media(reduced_motion="reduce")
    page.goto(BASE, wait_until="networkidle")
    assert page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
    assert page.locator("h1").is_visible()
    expect(page.get_by_role("status")).to_have_text("Формула проверена · Python API")
    # Browser at a 200% zoom equivalent: a desktop viewport reduced to 720 CSS pixels.
    page.set_viewport_size({"width": 720, "height": 500})
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
    no_js = browser.new_context(java_script_enabled=False)
    server_page = no_js.new_page()
    server_page.goto(BASE)
    assert "Конфигураторы" in server_page.locator("h1").inner_text()
    assert server_page.locator(".service-row").count() == 3
    # Render the repo-native SVG as a raster preview for social crawlers.
    social = context.new_page()
    social.set_viewport_size({"width": 1200, "height": 630})
    social.goto(BASE + "/og.svg")
    social.screenshot(path="/home/marseloid/public/og.png")
    assert not report["errors"], report["errors"]
    browser.close()

(OUT / "browser-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(json.dumps(report, ensure_ascii=False, indent=2))
