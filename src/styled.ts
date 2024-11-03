import Handlebars from 'handlebars/runtime';

export function styled<T = any>(
  template: Handlebars.TemplateDelegate<T>,
  cs: CSSModuleClasses,
): Handlebars.TemplateDelegate<T> {
  return (context: T, options?: RuntimeOptions): string => {
    const wrappedContext = { ...context, cs };
    return template(wrappedContext, options);
  };
}
