import { ProfileLayout } from '../../components/profile-layout';
import { Router, styled } from '../../core';
import tpl from './user-profile.hbs';
import cs from './user-profile.module.css';

export default styled(tpl, cs);

export class UserProfileBlock extends ProfileLayout {
  constructor(private readonly router: Router) {
    super({});
  }

  goBack() {
    this.router.navigate('/');
  }

  renderContent() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
