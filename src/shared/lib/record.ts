export const arrayToRecord = <
  K extends string,
  T extends Record<K, string | number>,
>(
  key: K, // Параметр key представляет ключ, используемый для индексации элементов массива
  array: T[] // Параметр array представляет массив объектов типа T
) => {
  // Используется метод reduce для преобразования массива в объект
  return array.reduce(
    (acc, item) => {
      // Каждый элемент массива добавляется в объект с ключом, равным значению поля key этого элемента
      acc[item[key]] = item;
      return acc; // Возвращается аккумулятор для следующей итерации
    },
    {} as Record<T[K], T | undefined> // Начальное значение аккумулятора - пустой объект
  );
};
