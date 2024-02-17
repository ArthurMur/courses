import { Profile } from '../_domain/types';
import { getProfileDisplayName } from './get-profile-display-name';

// Экспорт функции getProfileLetters, которая принимает объект profile типа Profile
export const getProfileLetters = (profile: Profile) => {
  const displaName = getProfileDisplayName(profile); // Получение отображаемого имени из функции getProfileDisplayName

  const [a, b] = displaName.split('@')[0].split(/\.|\s|-|_/); // Разделение отображаемого имени по символу '@' и затем по точке, пробелу или дефису

  if (!b) {
    return `${a[0]?.toUpperCase() ?? ''}${a[1]?.toUpperCase() ?? ''}`; // Возврат первых двух букв в верхнем регистре, если вторая часть отображаемого имени отсутствует
  }

  return `${a[0]?.toUpperCase() ?? ''}${b[0]?.toUpperCase() ?? ''}`; // Возврат первых букв каждой части разделенного отображаемого имени в верхнем регистре
};
