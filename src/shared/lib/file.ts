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

// Функция для получения размеров изображения
export function getImageSizes(file: File) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = document.createElement('img'); // Создание элемента img

    const src = URL.createObjectURL(file); // Создание URL для файла

    img.style.opacity = '0'; // Установка нулевой прозрачности
    img.style.position = 'absolute'; // Установка абсолютной позиции

    // Обработчик загрузки изображения
    img.onload = function handleLoad() {
      // Разрешение Promise с размерами изображения
      resolve({
        width: img.width, // Ширина изображения
        height: img.height, // Высота изображения
      });

      // Освобождение URL и удаление элемента img после загрузки
      URL.revokeObjectURL(src); // Освобождение URL
      img.remove(); // Удаление элемента img
    };

    img.src = src; // Установка исходного пути изображения

    document.body.appendChild(img); // Добавление элемента img в body
  });
}

// Функция для преобразования файла в data URI
export function fileToDataURI(file: File) {
  return new Promise<{ dataURI: string; name: string }>((resolve) => {
    const reader = new FileReader(); // Создание объекта FileReader

    // Обработчик загрузки файла
    reader.onload = () => {
      // Разрешение Promise с данными URI и именем файла
      resolve({
        dataURI: reader.result as string, // Данные URI
        name: file.name, // Имя файла
      });
    };

    reader.readAsDataURL(file); // Чтение файла как data URI
  });
}

// Функция для преобразования data URI в Blob
export function dataURItoBlob(dataURI: string) {
  // Декодирование строки base64
  const byteString = atob(dataURI.split(',')[1]);
  // Получение MIME-типа изображения
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // Создание массива байт из строки
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Создание Blob из массива байт с указанием MIME-типа
  return new Blob([ia], { type: mimeString });
}

// Функция для преобразования Blob в файл
export function blobToFile(blob: Blob, fileName: string) {
  // Создание нового файла из Blob с указанием имени
  return new File([blob], fileName, { type: blob.type });
}
