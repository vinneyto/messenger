# Проект Messenger

Одностраничное приложение для обмена сообщениями с навигацией с помощью History API.

проект доступен по [ссылке](https://vinneyto-messenger.netlify.app)

### Дизайн проекта

Дизайн проекта доступен в Figma: [Messenger Design](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=1-2&node-type=frame&t=3BpyEcngQiIQeE4d-0)

### Установка зависимостей

Для установки зависимостей выполните команду:

    npm install

### Запуск

Для сборки и отдачи собранной статики используйте команду

    npm run start

Для запуска dev сервера используйте команду

    npm run dev

### Доступные страницы

  - [Список чатов](https://vinneyto-messenger.netlify.app)
  - [Авторизация](https://vinneyto-messenger.netlify.app/sign-in)
  - [Регистрация](https://vinneyto-messenger.netlify.app/sign-up)
  - [Профиль пользователя](https://vinneyto-messenger.netlify.app/user-profile)
  - [Данные пользователя](https://vinneyto-messenger.netlify.app/user-profile-data)
  - [Сброс пароля](https://vinneyto-messenger.netlify.app/user-profile-password)
  - [Ошибка 404](https://vinneyto-messenger.netlify.app/404)
  - [Ошибка 500](https://vinneyto-messenger.netlify.app/500)

### Структура проекта

Проект построен на компонентах, каждый из которых представляет собой шаблон Handlebars и CSS-модуль.

Переиспользуемые компоненты находятся в папке **components**, а компоненты для страниц - в папке **pages**.

Для переключения между страницами используется миниатюрный роутер на основе History API.

### Функция для стилизации

Для удобства объединения шаблонов и стилей была создана функция styled, которая оборачивает шаблон Handlebars и добавляет CSS-классы для упрощенной стилизации:

```typescript
export function styled<T = any>(
  template: Handlebars.TemplateDelegate<T>,
  cs: CSSModuleClasses,
  styledOptions?: StyledOptions,
): Handlebars.TemplateDelegate<T> {
  return (context: T, options?: RuntimeOptions): string => {
    const csName = styledOptions?.csName || 'cs';
    const wrappedContext = { ...context, [csName]: cs };
    return template(wrappedContext, options);
  };
}
```
