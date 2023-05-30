const storagePrefix = 'ph__';

type Token = {
  accessToken: string;
};

const storage = {
  getToken: () => {
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
  },
};

export default storage;
