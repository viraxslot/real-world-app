export const mockFetchOnce = ({ ok, data }: { ok: boolean; data: Record<string, unknown> }) => {
  return vi.fn().mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolve({
          ok,
          json: () =>
            new Promise((resolve) => {
              resolve(data);
            }),
        });
      }),
  );
};
