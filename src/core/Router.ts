import { queryStringify } from '../utils/queryStringify';

export type Route = {
  path: string;
  action: (router: Router) => void;
};

export class Router {
  private _routes: Route[] = [];

  private _fallback: string = '';

  private _started: boolean = false;

  public start(): void {
    if (this._started) {
      return;
    }
    this._started = true;

    window.addEventListener('popstate', () =>
      this.handleRoute(window.location.pathname),
    );

    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.matches('[href]')) {
        e.preventDefault();
        const path = target.getAttribute('href');
        if (path) {
          this.go(path);
        }
      }
    });

    this.handleRoute(window.location.pathname);
  }

  use(path: string, action: (router: Router) => void) {
    this._routes.push({ path, action });
    return this;
  }

  fallback(path: string) {
    this._fallback = path;
    return this;
  }

  public go(path: string, query: Record<string, any> = {}): void {
    const queryString = queryStringify(query);
    const fullPath = queryString ? `${path}?${queryString}` : path;
    window.history.pushState({}, '', fullPath);
    this.handleRoute(fullPath);
  }

  public forward(): void {
    window.history.forward();
  }

  public back(): void {
    window.history.back();
  }

  private handleRoute(path: string): void {
    let route = this._routes.find((r) => r.path === path);

    if (!route) {
      route = this._routes.find((r) => r.path === this._fallback);
    }

    if (!route) {
      throw new Error('unable to navigate');
    }

    route.action(this);
  }
}

export const appRouter = new Router();
