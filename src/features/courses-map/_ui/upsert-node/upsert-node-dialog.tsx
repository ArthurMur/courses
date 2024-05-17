'use client';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from '@/shared/ui/dialog';
import {
  UpsertNodeForm,
  UpsertNodeFormActions,
  UpsertNodeFormFields,
} from './upsert-node-form';
import { useUpsertNodeModal } from '../../_vm/upsert-node/use-upsert-node-modal';

// Компонент для диалога добавления/обновления узла
export function UpsertNodeDialog() {
  const { isOpen, close, node } = useUpsertNodeModal(); // Получение состояния модального окна, функции закрытия и текущего узла
  const isEdit = !!node; // Определение, режим редактирования или добавления

  return (
    <Dialog onOpenChange={close} open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        {' '}
        {/* Ограничение максимальной ширины контента */}
        <UpsertNodeForm onSuccess={close} node={node}>
          {' '}
          {/* Форма для добавления/обновления узла */}
          <DialogHeader className="mb-3">
            {' '}
            {/* Заголовок диалога */}
            <DialogTitle>
              {isEdit ? 'Обновление узла' : 'Добавление узла'}{' '}
              {/* Текст заголовка в зависимости от режима */}
            </DialogTitle>
          </DialogHeader>
          <UpsertNodeFormFields node={node} /> {/* Поля формы для узла */}
          <DialogFooter className="mt-3">
            {' '}
            {/* Футер диалога */}
            <UpsertNodeFormActions /> {/* Действия формы (кнопки) */}
          </DialogFooter>
        </UpsertNodeForm>
      </DialogContent>
    </Dialog>
  );
}
