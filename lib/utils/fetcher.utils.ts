class FetchError extends Error {
  status: number;
  info: any;

  constructor(message: string, status: number, info: any) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const info = await res.json();
    const error = new FetchError(
      "Une erreur est survenue lors de la récupération des données.",
      res.status,
      info,
    );
    throw error;
  }

  return res.json();
};
