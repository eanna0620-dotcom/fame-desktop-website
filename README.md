# FAME — desktop landing

Все файлы в одной папке — заливаются на GitHub одним махом.

## Публикация на GitHub Pages
1. Создайте новый репозиторий (Public).
2. Add file -> Upload files -> выделите ВСЕ файлы (Cmd+A) и перетащите -> Commit.
3. Settings -> Pages -> Deploy from a branch -> ветка `main`, папка `/ (root)` -> Save.
4. Через ~минуту сайт будет по адресу https://<user>.github.io/<repo>/

## Что внутри (без подпапок)
- index.html — разметка, стили, логика
- *.webp — изображения
- font-0*.woff2 — шрифты
- favicon.svg — иконка
- sw.js — service worker (кэширует графику при первом визите, дальше из кэша)
- .nojekyll — отключает Jekyll на GitHub Pages
