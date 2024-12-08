import { API_ROOT } from '../constants';
import { HTTPTransport } from '../core';

export const api = new HTTPTransport({
  baseUrl: API_ROOT,
  throwUnsuccess: true,
  withCredentials: true,
});
