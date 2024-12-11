import { appRouter } from '../../appRouter';
import { authController } from '../../controllers';
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
      async () => {
        this.props.currentPage = new Ctor(...rest);
      };

    const catchFn = async (e: any) => {
      if (e instanceof XMLHttpRequest) {
        if (e.status === 401) {
          return '/sign-in';
        }
        return '/500';
      }
      return '/404';
    };

    const isPrivate = async () => {
      await authController.getUser();
    };

    appRouter
      .use('/', isPrivate, route(ChatAreaBlock))
      .use('/user-profile', isPrivate, route(UserProfileBlock))
      .use('/user-profile-data', isPrivate, route(UserProfileDataBlock))
      .use('/user-profile-password', isPrivate, route(UserProfilePasswordBlock))
      .use('/sign-in', route(SignInBlock))
      .use('/sign-up', route(SignUpBlock))
      .use('/404', route(SmthWrongBlock, { code: 404 }))
      .use('/500', route(SmthWrongBlock, { code: 500 }))
      .catch(catchFn)
      .start();
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
