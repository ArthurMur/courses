import { injectable } from 'inversify';
import { SessionService } from '../next-auth/_session-service';

@injectable()
export class ContextFactory {
  constructor(private sessionService: SessionService) {} // Инъекция зависимости сервиса сессии

  // создание контекста
  createContext = async () => {
    // Получаем сессию через сервис сессии
    const session = await this.sessionService.get();

    // Возвращаем контекст сессии
    return {
      session,
    };
  };
}
