// Публичное апи для работы с профилем пользователя
export { ProfileAvatar } from './_ui/profile-avatar';
export { getProfileDisplayName } from './_vm/get-profile-display-name';
export { getProfileQuery, useInvalidateProfile } from './_queries';
export type { Profile } from './_domain/types';
export { profileSchema } from './_domain/schema';
