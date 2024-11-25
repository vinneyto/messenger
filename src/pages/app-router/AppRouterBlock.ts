import { Block } from '../../core';
import { Router } from '../../core/Router';
import { styled } from '../../core';
import { ChatAreaBlock } from '../chat-area';
import { SignInBlock } from '../sign-in';
import { SignUpBlock } from '../sign-up';
import { SmthWrongBlock } from '../smth-wrong';
import { UserProfileBlock } from '../user-profile';
import { UserProfileDataBlock } from '../user-profile-data';
import { UserProfilePasswordBlock } from '../user-profile-password';
import tpl from './app-router.hbs';
import cs from './app-router.module.css';

export type AppRouterProps = {
  currentPage?: Block<any, any>;
};

export class AppRouterBlock extends Block<AppRouterProps> {
  constructor() {
    super({});

    const route = (
      path: string,
      buildBlock: (router: Router) => Block<any, any>,
    ) => ({
      path,
      action: (router: Router) => {
        this.props.currentPage = buildBlock(router);
      },
    });

    new Router(
      [
        route('/', (router) => new ChatAreaBlock(router)),
        route('/user-profile', (router) => new UserProfileBlock(router)),
        route(
          '/user-profile-data',
          (router) => new UserProfileDataBlock(router),
        ),
        route(
          '/user-profile-password',
          (router) => new UserProfilePasswordBlock(router),
        ),
        route('/sign-in', (router) => new SignInBlock(router)),
        route('/sign-up', (router) => new SignUpBlock(router)),
        route('/404', (router) => new SmthWrongBlock(router, { code: 404 })),
        route('/500', (router) => new SmthWrongBlock(router, { code: 500 })),
      ],
      { fallback: '/404' },
    );
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
