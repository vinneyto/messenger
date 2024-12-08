/* eslint-disable no-console */
import { appRouter } from './Router';

const printHttpRequestError = (error: XMLHttpRequest) => {
  console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
  try {
    const jsonResponse = JSON.parse(error.response);
    console.error('Response:', jsonResponse);
  } catch (e) {
    console.error('Failed to parse JSON response', error.response);
  }
};

export const handleError =
  (errorHandler: (error: any) => void) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line consistent-return, func-names, no-param-reassign
    descriptor.value = async function (...args: any[]) {
      try {
        // eslint-disable-next-line @typescript-eslint/return-await
        return await originalMethod.apply(this, args);
      } catch (error) {
        console.error('Error occurred while executing method:', _propertyKey);
        errorHandler(error);
      }
    };

    return descriptor;
  };

export const networkError = (
  {
    private: redirectOn401,
  }: {
    private: boolean;
  } = { private: false },
) => {
  return (error: any) => {
    if (error instanceof XMLHttpRequest) {
      printHttpRequestError(error);
      const { status } = error;
      switch (status) {
        case 500:
          console.error('Server error occurred. Redirecting to /500.');
          appRouter.go('/500');
          break;
        case 401:
          if (redirectOn401) {
            console.error('Unauthorized access. Redirecting to /sign-in.');
            appRouter.go('/sign-in');
          }
          break;
        default:
          console.error('Unhandled HTTP error:', error);
      }
    } else {
      console.error('Non-HTTP error occurred:', error);
    }
  };
};
