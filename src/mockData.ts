import { range } from './utils/range';

export const chatItems = range(100).map(() => ({
  name: 'Jose',
  lastMessage: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero
      inventore esse voluptatum in repudiandae amet eaque, odio voluptates
      veritatis aut natus officiis iusto ipsa, dolor mollitia deserunt cum
      nesciunt?`,
}));
