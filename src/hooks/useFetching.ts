import { useState } from 'react';

export function useFetching(
  callback: () => Promise<void>
): [() => Promise<void>, boolean, Error | null] {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetching = async (): Promise<void> => {
    try {
      setLoading(true);
      await callback();
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  };

  return [fetching, loading, error];
}
