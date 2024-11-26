import { range } from './utils/range';

export const chatItems = range(100).map(() => ({
  name: 'Jose',
  lastMessage: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero
      inventore esse voluptatum in repudiandae amet eaque, odio voluptates
      veritatis aut natus officiis iusto ipsa, dolor mollitia deserunt cum
      nesciunt?`,
}));

export const chatMessages = [
  {
    text: 'Hello! How have you been? It has been a long time since we last spoke.',
    isOwn: true,
  },
  {
    text: 'Hi, how are you? I have been quite busy with work and family. What about you?',
    isOwn: false,
  },
  {
    text: 'I am good, thanks! Just got back from a vacation. It was refreshing.',
    isOwn: true,
  },
  { text: 'That sounds amazing! Where did you go for vacation?', isOwn: false },
  {
    text: 'I went to the mountains. The weather was perfect and the views were breathtaking.',
    isOwn: true,
  },
];
