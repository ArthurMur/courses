export const allSuccess = async <T>(
  promises: Promise<T>[], // Массив промисов для выполнения
  log?: (item: PromiseSettledResult<Awaited<T>>, index: number) => void // Функция для логирования результатов промисов
) => {
  // Дожидаемся завершения всех промисов в массиве
  return await Promise.allSettled(promises).then((results) => {
    // Выполняем указанную функцию логирования для каждого промиса, если она была предоставлена
    results.forEach((result, index) => log?.(result, index));

    // Фильтруем массив результатов
    return (
      results
        .filter(
          // Оставляем только успешно завершенные промисы
          (
            promiseResult
          ): promiseResult is PromiseFulfilledResult<Awaited<T>> =>
            promiseResult.status === 'fulfilled'
        )
        // Возвращаем только значения успешно завершенных промисов
        .map((promise) => promise.value)
    );
  });
};
