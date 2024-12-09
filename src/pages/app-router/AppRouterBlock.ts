import { appRouter } from '../../appRouter';
import { Block, styled } from '../../core';
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

    const route =
      <T extends Block<any, any>>(
        Ctor: new (...props: any[]) => T,
        ...rest: any[]
      ) =>
      () => {
        this.props.currentPage = new Ctor(...rest);
      };

    appRouter
      .use('/', route(ChatAreaBlock))
      .use('/user-profile', route(UserProfileBlock))
      .use('/user-profile-data', route(UserProfileDataBlock))
      .use('/user-profile-password', route(UserProfilePasswordBlock))
      .use('/sign-in', route(SignInBlock))
      .use('/sign-up', route(SignUpBlock))
      .use('/404', route(SmthWrongBlock, { code: 404 }))
      .use('/500', route(SmthWrongBlock, { code: 500 }))
      .fallback('/404')
      .start();
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
