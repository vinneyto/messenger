const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

type Methods = (typeof METHODS)[keyof typeof METHODS];

interface Options {
  method?: Methods;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
  tries?: number;
}

function queryStringify(data: Record<string, any>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  constructor(public baseUrl = '') {}

  get = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  put = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  post = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  delete = (url: string, options: Options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (
    url: string,
    options: Options,
    timeout = 5000,
  ): Promise<XMLHttpRequest> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, headers = {}, data } = options;

      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const fullUrl = `${this.baseUrl}${url}`;

      xhr.open(
        method,
        method === METHODS.GET && data
          ? `${fullUrl}${queryStringify(data)}`
          : fullUrl,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onerror = reject;
      xhr.onabort = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export async function fetchWithRetry(
  url: string,
  options: Options = {},
): Promise<any> {
  const { tries = 1 } = options;

  function onError(err: any): Promise<any> {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return new HTTPTransport()
    .request(url, options)
    .then((xhr) => xhr.response)
    .catch(onError);
}
