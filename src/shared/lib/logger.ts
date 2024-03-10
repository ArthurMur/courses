import Pino from 'pino';

// Создаем экземпляр логгера
export const logger = Pino();

// Декоратор для логирования вызовов метода
export const loggedMethod = <A extends any[] = any[], R = any>({
  msg, // Сообщение для логирования
  logRes, // Функция для преобразования результата перед логированием
  logArgs, // Функция для преобразования аргументов перед логированием
}: {
  msg?: string;
  logArgs?: (...args: A) => unknown;
  logRes?: (res: R, ...args: A) => unknown;
}) => {
  // Возвращаем декоратор метода
  return function loggedMethodDecorator<
    This,
    Args extends A,
    Return extends R | Promise<R>,
  >(
    target: (this: This, ...args: Args) => Return, // Оригинальный метод, который будет обернут
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    > // Контекст метода (имя метода, прототип класса и т.д.)
  ) {
    const methodName = String(context.name); // Получаем имя метода из контекста

    // Создаем обертку для оригинального метода, которая будет вызываться вместо него
    function replacementMethod(this: This, ...args: Args): Return {
      // Логгируем вызов метода с аргументами и сообщением
      logger.info({
        methodName,
        args: logArgs?.(...args),
        msg: `Call ${methodName}: ${msg ?? ''}`,
      });
      const result = target.call(this, ...args); // Вызываем оригинальный метод

      // Логгируем результат вызова метода или ошибку, если она возникла
      Promise.resolve(result)
        .then((awaited) => {
          logger.info({
            methodName,
            data: logRes?.(awaited, ...args),
            msg: `Result ${methodName}: ${msg ?? ''}`,
          });
        })
        .catch((error) => {
          logger.error({
            methodName,
            error,
            msg: `Error ${methodName}: ${msg ?? ''}`,
          });
        });

      return result; // Возвращаем результат вызова оригинального метода
    }

    return replacementMethod; // Возвращаем обертку для метода
  };
};
