import { styled } from '../../core';
import tpl from './profile-layout.hbs';
import cs from './profile-layout.module.css';

export default styled(tpl, cs, { csName: 'csProfileLayout' });

export * from './ProfileLayout';
