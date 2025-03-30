
# Portfolio Overview Application

![Project Demo](https://via.placeholder.com/800x400.png?text=Project+Demo) <!-- Замените на реальный скриншот -->

Модуль для управления инвестиционным портфелем с real-time обновлениями цен активов.

## 🚀 Запуск проекта

1. **Клонировать репозиторий**
```bash
git clone https://github.com/yourusername/portfolio-app.git
cd portfolio-app
Установить зависимости


npm install
Запустить development сервер


npm run dev
Приложение будет доступно по адресу: http://localhost:5173

🏗️ Архитектура

├── components/       # React-компоненты
├── store/            # Redux хранилище
├── hooks/            # Кастомные хуки
├── utils/            # Вспомогательные утилиты
├── types/            # TypeScript типы
└── styles/           # Стили (CSS Modules)
Ключевые особенности архитектуры:

State Management: Redux Toolkit для управления состоянием

Реальное обновление: WebSocket через Binance API

Оптимизация: Виртуализация списков с react-window

Сохранение: Локальное хранилище (localStorage)

📚 Использованные технологии
Основные
React 18 + TypeScript

Redux Toolkit + React-Redux

Socket.IO Client (WebSocket)

React Window + react-virtualized-auto-sizer

Framer Motion (анимации)

UUID (генерация уникальных ID)

Вспомогательные
Vite (сборка)

CSS Modules (стилизация)

ESLint (линтинг)

🌟 Особенности реализации
✅ Основные требования:

Real-time обновление цен через WebSocket

Добавление/удаление активов

Виртуализация списков (>100 элементов)

Локальное сохранение состояния

Адаптивный интерфейс

✨ Дополнительно:

Анимации взаимодействия

Валидация формы

Обработка ошибок

Прогресс-бары для отображения долей

Оптимизация производительности

📦 Производственная сборка

npm run build
Собранная версия будет доступна в папке dist/

Лицензия
MIT License
