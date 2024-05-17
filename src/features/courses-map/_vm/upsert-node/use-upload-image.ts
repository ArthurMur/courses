import {
  fileToDataURI,
  getImageSizes,
  selectFile,
  validateFileSize,
} from '@/shared/lib/file';
import { IMAGE_MAX_SIZE } from '../../_constant';
import { coursesMapApi } from '../../_api';

// Хук для загрузки изображения
export const useUploadImage = ({
  onError, // Функция обработки ошибки загрузки изображения
  onSuccess, // Функция обработки успешной загрузки изображения
  onImageSize, // Функция обработки получения размеров изображения
}: {
  onError?: (type?: 'big-size' | 'unknown') => void; // Функция обработки ошибки
  onSuccess?: (src: string) => void; // Функция обработки успешной загрузки
  onImageSize?: (params: { width: number; height: number }) => void; // Функция обработки размеров изображения
}) => {
  // Мутация для загрузки изображения
  const uploadImageMutation =
    coursesMapApi.coursesMap.uploadImage.useMutation();

  // Обработчик выбора файла изображения
  const handleFileSelect = async () => {
    // Выбор файла изображения
    const file = await selectFile('image/*');

    // Проверка размера файла
    if (!validateFileSize(file, IMAGE_MAX_SIZE)) {
      return onError?.('big-size'); // Обработка большого размера файла
    }

    // Получение размеров изображения
    const imageSizes = getImageSizes(file);

    try {
      // Выполнение мутации загрузки изображения
      const { path } = await uploadImageMutation.mutateAsync(
        await fileToDataURI(file) // Преобразование файла в data URI
      );

      // Вызов функции обработки размеров изображения
      onImageSize?.(await imageSizes);
      // Вызов функции обработки успешной загрузки изображения
      onSuccess?.(path);
    } catch (error) {
      onError?.('unknown'); // Обработка неизвестной ошибки
    }
  };

  return {
    isPending: uploadImageMutation.isPending, // Состояние выполнения загрузки
    handleFileSelect, // Обработчик выбора файла
  };
};
