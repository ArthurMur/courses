import { CoursesList } from '@/features/courses-list/courses-list';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <h1 className="text-3xl font-bold mb-10">Курсы</h1>
      <CoursesList />
    </main>
  );
}
