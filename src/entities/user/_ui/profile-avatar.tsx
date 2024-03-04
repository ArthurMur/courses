import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Profile } from '../_domain/types';
import { cn } from '@/shared/ui/utils';
import { getProfileLetters } from '../_vm/get-profile-letters';

export const ProfileAvatar = ({
  profile,
  className,
}: {
  profile?: Profile;
  className?: string;
}) => {
  if (!profile) {
    return null;
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={profile.image ?? ''} className="object-cover" />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>{' '}
      {/* Вставка текста с помощью функции getProfileLetters из объекта profile */}
    </Avatar>
  );
};
