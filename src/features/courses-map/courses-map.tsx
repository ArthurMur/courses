import { Flow } from './_ui/flow';
import { coursesMapHttpApi } from './_api';

export async function CoursesMap() {
  const coursesMap = await coursesMapHttpApi.coursesMap.get.query();
  return (
    <div className="grow relative">
      <Flow coursesMap={coursesMap} />
    </div>
  );
}
