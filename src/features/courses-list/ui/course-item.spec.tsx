import { render, screen } from '@testing-library/react'; // Импортируем необходимые функции из тестовой библиотеки React
import userEvent from '@testing-library/user-event'; // Импортируем userEvent из тестовой библиотеки для имитации пользовательских событий
import { CourseItem } from './course-item'; // Импортируем компонент CourseItem, который будет тестироваться

describe('course item', () => {
  // Начало описания блока тестов для компонента CourseItem
  it('should call delete callback', async () => {
    // Описание конкретного теста: "должен вызывать колбэк для удаления"
    const onDelete = jest.fn(); // Создаем mock функцию для onDelete, чтобы отследить, вызывается ли она
    render(
      // Рендерим компонент CourseItem с заданными параметрами
      <CourseItem
        course={{
          id: 'asdfasd ',
          description: 'fasdf',
          name: 'fas;dklfj',
        }}
        onDelete={onDelete} // Передаем onDelete в компонент в качестве пропса
      />
    );

    await userEvent.click(screen.getByText('Удалить')); // Имитируем клик пользователя на элементе с текстом 'Удалить'

    expect(onDelete).toHaveBeenCalled(); // Проверяем, была ли вызвана функция onDelete
  });
});
