# blockbeagle-site

## Стек

Статический сайт без сборки: `index.html`, `privacy-policy.html`,
`terms-and-conditions.html`, `404.html`, `style.css`, ванильный `script.js`. Нет `package.json`,
нет тестов, нет линтера. `_redirects` + `CNAME` указывают на деплой через Netlify/Cloudflare
Pages — редактировать эти файлы только когда меняется реальная конфигурация хостинга.

Ветка по умолчанию — `main` (совпадает с текущей рабочей веткой); отдельного `develop` в этом
репозитории нет, в отличие от `BlockBeagle/`.

## Продуктовая граница — важно

Маркетинговый текст сайта (crypto+fiat кошелёк, PDF/Excel экспорт, cross-chain трейсинг, AI risk
scoring, 24/7 protection и т.д.) описывает более широкий продукт, чем то, что реально реализовано
в `BlockBeagle/` (read-only blockchain intelligence, см. `../CLAUDE.md` и
`../BlockBeagle/CLAUDE.md`). Последний реальный коммит (`fb0bb0b`, "P0.4: replace unverified
claims with truthful copy, mark unbuilt features as Roadmap") уже двигался в сторону честности —
не откатывать этот прогресс. Перед тем как добавлять или переформулировать описание фичи,
свериться с `BLOCKBEAGLE_PROMISES_IMPLEMENTATION_PLAN.md`/`specs/`, а не считать существующий
текст сайта образцом для расширения.

## Проверки перед сдачей работы

Автоматических тестов/линтеров нет. Проверять вручную открытием изменённых `.html` файлов в
браузере; следить, чтобы `sitemap.xml`/`robots.txt` не расходились с реальными страницами.
