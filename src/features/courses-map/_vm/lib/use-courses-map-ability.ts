import { useAbility } from '@/kernel/lib/next-auth/client';
import { createCoursesMapAbility } from '../../_domain/ability';

export function useCoursesMapAbility() {
  return useAbility(createCoursesMapAbility);
}
