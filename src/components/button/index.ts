import { styled } from '../../styled';
import tpl from './button.hbs';
import cs from './button.module.css';

export default styled<{ label: string }>(tpl, cs);
