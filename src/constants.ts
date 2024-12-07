export const LOGIN_REGEX = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
export const FIRST_NAME_REGEX = /^[A-ZА-Я][a-zа-я-]*$/;
export const SECOND_NAME_REGEX = /^[A-ZА-Я][a-zа-я-]*$/;
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const PHONE_REGEX = /^\+?\d{10,15}$/;
export const MESSAGE_REGEX = /^(?!\s*$).+/;
export const NOT_EMPTY_REGEX = /^(?!\s*$).+/;

export const API_ROOT = '/api/v2';
