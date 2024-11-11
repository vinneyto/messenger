/// <reference types="vite/client" />

declare module '*.hbs' {
  const src: Handlebars.TemplateDelegate;
  export default src;
}
