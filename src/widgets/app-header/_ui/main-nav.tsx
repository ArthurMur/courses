import Link from 'next/link';

export function MainNav() {
  return (
    // Навигационное меню, представленное в виде списка ссылок
    <nav className="flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row ">
      {/* Ссылка на страницу "Карта" */}
      <Link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/map"
      >
        Карта
      </Link>
      {/* Ссылка на страницу "Обучение" */}
      <Link
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        href="/learn"
      >
        Обучение
      </Link>
    </nav>
  );
}
