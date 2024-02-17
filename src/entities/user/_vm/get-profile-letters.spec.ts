import { getProfileLetters } from './get-profile-letters';

describe('get profile letters', () => {
  // Тестирование функции getProfileLetters для случая, когда разделителем является '.'
  test('should split by .', () => {
    const res = getProfileLetters({
      email: 'example.example@gmail.com',
    });

    expect(res).toEqual('EE'); // Проверка, что результат соответствует ожидаемому значению 'EE'
  });

  // Тестирование функции getProfileLetters для случая, когда разделителем является '-'
  test('should split by -', () => {
    const res = getProfileLetters({
      email: 'example.example@gmail.com',
      name: 'Example-Example',
    });

    expect(res).toEqual('EE'); // Проверка, что результат соответствует ожидаемому значению 'EE'
  });

  // Тестирование функции getProfileLetters для случая, когда разделителем является '_'
  test('should split by _', () => {
    const res = getProfileLetters({
      email: 'example.example@gmail.com',
      name: 'Example_Example',
    });

    expect(res).toEqual('EE'); // Проверка, что результат соответствует ожидаемому значению 'EE'
  });

  // Тестирование функции getProfileLetters для случая, когда разделителем является пробел
  test('should split by space', () => {
    const res = getProfileLetters({
      email: 'example.example@gmail.com',
      name: 'Example Example',
    });

    expect(res).toEqual('EE'); // Проверка, что результат соответствует ожидаемому значению 'EE'
  });

  // Тестирование функции getProfileLetters для случая, когда разделитель отсутствует, и возвращаются первые 2 буквы
  test('should return first 2 letters if no separator', () => {
    const res = getProfileLetters({
      email: 'example.example@gmail.com',
      name: 'ExampleExample',
    });

    expect(res).toEqual('EX'); // Проверка, что результат соответствует ожидаемому значению 'EE'
  });

  // Тестирование функции getProfileLetters для случая, когда разделитель отсутствует в email, и возвращаются первые 2 буквы
  test('should return first 2 letters if no separator email', () => {
    const res = getProfileLetters({
      email: 'admin@gmail.com',
    });

    expect(res).toEqual('AD'); // Проверка, что результат соответствует ожидаемому значению 'AD'
  });

  // Тестирование функции getProfileLetters для случая, когда имя пользователя пустое, и возвращается email
  test('should return email if empty username', () => {
    const res = getProfileLetters({
      email: 'admin@gmail.com',
      name: '',
    });

    expect(res).toEqual('AD'); // Проверка, что результат соответствует ожидаемому значению 'AD'
  });

  // Тестирование функции getProfileLetters для случая, когда имя пользователя состоит из одной буквы
  test('should work with short names', () => {
    const res = getProfileLetters({
      email: 'admin@gmail.com',
      name: 'E',
    });

    expect(res).toEqual('E'); // Проверка, что результат соответствует ожидаемому значению 'E'
  });
});
