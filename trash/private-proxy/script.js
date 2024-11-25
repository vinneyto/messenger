const props = {
  name: 'Abby',
  chat: 'the last of us. Part II',
  getChat() {
    this._privateMethod();
  },
  _privateMethod() {
    console.log(this._privateProp);
  },
  __privateMethodToo() {},
  _privateProp: 'Нельзя получить просто так',
};

const proxyProps = new Proxy(props, {
  get(target, prop) {
    if (typeof prop === 'string' && prop.startsWith('_')) {
      throw new Error('Нет прав');
    }
    if (typeof target[prop] === 'function') {
      return target[prop].bind(target);
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (typeof prop === 'string' && prop.startsWith('_')) {
      throw new Error('Нет прав');
    }
    target[prop] = value;
    return true;
  },
  deleteProperty(target, prop) {
    if (typeof prop === 'string' && prop.startsWith('_')) {
      throw new Error('Нет прав');
    }
    delete target[prop];
    return true;
  },
});

proxyProps.getChat();
delete proxyProps.chat;

proxyProps.newProp = 2;
console.log(proxyProps.newProp);

try {
  proxyProps._newPrivateProp = 'Super game';
} catch (error) {
  console.log(error);
}

try {
  delete proxyProps._privateProp;
} catch (error) {
  console.log(error); // Error: Нет прав
}

/*
	* Вывод в консоль следующий:
Нельзя получить просто так
2
Error: Нет прав
Error: Нет прав
*/
