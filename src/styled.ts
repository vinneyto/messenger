import Handlebars from 'handlebars/runtime';

export interface StyledOptions {
  csName?: string;
}

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
