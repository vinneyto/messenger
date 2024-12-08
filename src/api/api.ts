import { API_ROOT } from '../constants';
import { HTTPTransport } from '../core';

export const api = new HTTPTransport(API_ROOT, true);
