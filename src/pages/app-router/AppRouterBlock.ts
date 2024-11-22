import { initLinkButton } from '../../components/link-button';
import { Block } from '../../core';
import { Router } from '../../core/Router';
import { styled } from '../../core';
import { initForms } from '../../utils/navigation';
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

    const route = (path: string, buildBlock: () => Block<any, any>) => ({
      path,
      action: () => {
        this.props.currentPage = buildBlock();
      },
    });

    const router = new Router(
      [
        route('/', () => new ChatAreaBlock()),
        route('/user-profile', () => new UserProfileBlock()),
        route('/user-profile-data', () => new UserProfileDataBlock()),
        route('/user-profile-password', () => new UserProfilePasswordBlock()),
        route('/sign-in', () => new SignInBlock({})),
        route('/sign-up', () => new SignUpBlock()),
        route('/404', () => new SmthWrongBlock({ code: 404 })),
        route('/500', () => new SmthWrongBlock({ code: 500 })),
      ],
      { fallback: '/404' },
    );

    initForms(router);

    // init link buttons
    initLinkButton(router);
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
