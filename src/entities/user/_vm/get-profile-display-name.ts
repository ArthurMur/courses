import { Profile } from '../_domain/types';

// Если пользователь зашел через почту, то берется его почта, если через гитхаб, то его значение name (имя и фамилия)
export const getProfileDisplayName = (profile: Profile) => {
  return profile.name ? profile.name : profile.email;
};
