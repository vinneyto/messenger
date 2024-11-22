import { styled } from '../../core';
import inputGroupTpl from './input-group.hbs';
import cs from './input-group.module.css';

document.addEventListener('input', (e) => {
  if (e.target instanceof HTMLInputElement && e.target.id) {
    const label = document.querySelector(`label[for="${e.target.id}"]`);
    if (!label) {
      return;
    }
    if (e.target.value) {
      label.classList.add(cs.labelVisible);
    } else {
      label.classList.remove(cs.labelVisible);
    }
  }
});

export default styled(inputGroupTpl, cs);
