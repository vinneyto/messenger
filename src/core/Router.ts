import { queryStringify } from '../utils/queryStringify';

export type Route<Path extends string = string> = {
  path: Path;
  actions: Array<() => Promise<void>>;
};

export class Router<Path extends string = string> {
  private _routes: Array<Route<Path>> = [];

  private _fallback?: (error: any) => Promise<Path>;

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
          this.go(path as Path);
        }
      }
    });

    this.handleRoute(window.location.pathname);
  }

  use(path: Path, ...actions: Array<() => Promise<void>>) {
    this._routes.push({ path, actions });
    return this;
  }

  catch(fallback: (error: any) => Promise<Path>) {
    this._fallback = fallback;
    return this;
  }

  public async go(
    path: Path,
    query: Record<string, any> = {},
    replace = false,
  ): Promise<void> {
    const queryString = queryStringify(query);
    const fullPath = queryString ? `${path}?${queryString}` : path;
    if (replace) {
      window.history.replaceState({}, '', fullPath);
    } else {
      window.history.pushState({}, '', fullPath);
    }

    if (this._started) {
      this.handleRoute(path);
    }
  }

  public forward(): void {
    window.history.forward();
  }

  public back(): void {
    window.history.back();
  }

  private async handleRoute(path: string): Promise<void> {
    const route = this._routes.find((r) => r.path === path);

    try {
      if (!route) {
        throw new Error(`Route not found: ${path}`);
      }

      for (const action of route.actions) {
        // eslint-disable-next-line no-await-in-loop
        await action();
      }
    } catch (e) {
      await this._fallback?.(e);
    }
  }
}
