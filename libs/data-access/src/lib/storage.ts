const storagePrefix = "ph__";

type Token = {
  accessToken: string;
};

export const storage = {
  getToken: (): string | null => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: ({ accessToken }: Token) => {
    window.localStorage.setItem(
      `${storagePrefix}token`,
      JSON.stringify(accessToken)
    );
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  }
};
