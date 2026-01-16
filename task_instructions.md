## Входные данные

Файл [llm_stream_dump.jsonl](https://www.notion.so/Dump-2e9f276185b58070ad3bfd260c46cd3c?pvs=21)

Каждая строка — одно SSE-событие:

```tsx
typeStreamEvent =
  | {event:"token";data: {delta:string } }
  | {event:"done";data:any }
  | {event:"error";data: {message:string } }

```

`token.delta` — кусок ответа LLM (может содержать часть Vega JSON).

---

## Задача

### Реализовать одну страницу `AI Explore`

**UI (минимально):**

- `Load dump` (загрузка `.jsonl`)
- `Play` / `Stop`
- Блок **Streaming output** (текст появляется постепенно)
- Блок **Vega chart preview**
- Статус: `idle / streaming / done / error`

---

## Логика (обязательно)

**Эмуляция SSE**

- Проигрывать dump построчно с задержкой 50–150 мс

**Streaming output**

- Склеивать `token.delta` в текст

**Извлечение Vega spec**

- Vega JSON может:
    - быть разбит на чанки
    - быть обёрнут в ```json
- Нужно собрать и `JSON.parse`
- Ошибка парсинга ≠ падение приложения

**Валидация**

- Проверить: `mark`, `encoding`

**Рендер**

- Рендерить Vega-Lite график
- Данные можно захардкодить:

```tsx
[
  {region:"Almaty",revenue:120 },
  {region:"Astana",revenue:90 },
  {region:"Shymkent",revenue:70 }
]

```

---

## Технические требования

- React + TypeScript
- Vega-Lite (`vega-embed` или `react-vega`)
- Без backend
- Чистая структура (hooks / utils)

---

## Что сдавать

- GitHub repo
- Видео-демонстрация (можно использовать Loom)
- README:
    - как запустить
    - кратко: как обрабатывается стрим и Vega spec

---

## Критерии оценки

1. Корректная обработка LLM streaming
2. Работа с Vega spec
3. Устойчивость к ошибкам
4. Читаемость кода

---

## Бонус (по желанию)

- Copy Vega spec
- Скорость воспроизведения
- Подсветка JSON в тексте