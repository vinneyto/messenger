type Route = {
  path: string;
  action: () => void;
};

export interface RouterParams {
  fallback: string;
}

export class Router {
  private routes: Route[];
  private fallback: string;

  constructor(routes: Route[], { fallback }: RouterParams) {
    this.routes = routes;
    this.fallback = fallback;
    this.init();
  }

  private init(): void {
    window.addEventListener('popstate', () =>
      this.handleRoute(window.location.pathname),
    );

    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.matches('[data-route]')) {
        e.preventDefault();
        const path = target.getAttribute('href');
        if (path) {
          this.navigate(path);
        }
      }
    });

    this.handleRoute(window.location.pathname);
  }

  public navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.handleRoute(path);
  }

  private handleRoute(path: string): void {
    let route = this.routes.find((route) => route.path === path);

    if (!route) {
      route = this.routes.find((route) => route.path === this.fallback);
    }

    if (!route) {
      throw new Error('unable to navigate');
    }

    route.action();
  }
}
