// Класс, который позволяет получать содержимое файлов по URL.
export class FileFetcher {
  /**
   * @param authToken Токен для аутентификации запросов. Если не передан,
   * то авторизация не будет использоваться.
   */
  constructor(private authToken?: string) {}

  /**
   * Получает содержимое файла по URL.
   * @param url URL файла.
   * @returns Тело файла.
   */
  async fetchText(url: string) {
    return fetch(url, {
      headers: {
        // Если токен передан, то включаем авторизацию.
        ...(this.authToken
          ? {
              Authorization: `Bearer ${this.authToken}`,
            }
          : {}),
      },
    }).then((res) => res.text());
  }
}
