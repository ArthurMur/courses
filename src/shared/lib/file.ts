export function selectFile(
  contentType: string, // Тип контента файлов, которые пользователь может выбирать
  multiple: true // Флаг, указывающий, может ли пользователь выбирать несколько файлов
): Promise<File[]>; // Возвращает Promise с массивом файлов, если multiple установлен в true
export function selectFile(contentType: string): Promise<File>; // Возвращает Promise с одним файлом, если multiple не указан или установлен в false
export function selectFile(contentType: string, multiple?: boolean) {
  return new Promise((resolve) => {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple ?? false; // Устанавливаем значение множественного выбора файлов в зависимости от multiple или по умолчанию в false
    input.accept = contentType; // Устанавливаем допустимый тип файлов

    input.onchange = () => {
      let files = Array.from(input.files as Iterable<File>); // Получаем выбранные файлы из input
      if (multiple)
        resolve(files); // Если multiple === true, возвращаем массив файлов
      else resolve(files[0]); // Если multiple не указан или false, возвращаем первый выбранный файл
    };

    input.click(); // Имитируем клик по элементу input для открытия диалога выбора файлов
  });
}

export function validateFileSize(file: File, sizeMb: number) {
  const fileSize = file.size / 1024 / 1024; // Размер файла в мегабайтах
  if (fileSize > sizeMb) {
    return false; // Возвращаем false, если размер файла превышает заданный размер
  } else {
    return true; // Возвращаем true, если размер файла допустим
  }
}
