import { selectFile, validateFileSize } from '@/shared/lib/file';
import { useMutation } from '@tanstack/react-query';
import { AVATAR_FILE_KEY, AVATAR_MAX_SIZE } from '../_constants';
import { uploadAvatarAction } from '../_actions/upload-avatar';

export const useUploadAvatar = ({
  onError,
}: {
  onError?: (type?: 'big-size') => void;
}) => {
  // Используем useMutation для отправки файла на сервер
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadAvatarAction,
  });

  // Функция handleFileSelect вызывается, когда пользователь выбирает файл
  const handleFileSelect = async () => {
    // Выбираем файл с помощью диалогового окна
    const file = await selectFile('/image/*');

    // проверка допустимости размера файла
    if (!validateFileSize(file, AVATAR_MAX_SIZE)) {
      // Вызываем onError, если размер файла превышает допустимый
      return onError?.('big-size');
    }

    // создается новый объект FormData для хранения файла
    const formData = new FormData();

    // файл добавляется в объект formData
    formData.set(AVATAR_FILE_KEY, file);

    // Отправляем файл на сервер
    mutateAsync(formData);
  };

  return {
    isPending,
    handleFileSelect,
  };
};
