'use client';

import { useCoursesMapAbility } from '../../_vm/lib/use-courses-map-ability';
import { ActionsPanel } from './actions-panel';
import { ControlsLayout } from './controls-layout';

export function Controls() {
  const ability = useCoursesMapAbility();
  return (
    <ControlsLayout
      actionsPanel={ability?.canUpdateCoursesMap() && <ActionsPanel />}
    />
  );
}
