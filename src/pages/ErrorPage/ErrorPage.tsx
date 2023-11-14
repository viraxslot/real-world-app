import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops! {error.status} error occured!</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    );
  }

  return (
    <div id="error-page">
      <h1>Oops! Unexpected Error</h1>
      <p>Something went wrong.</p>
      {error instanceof Error ? (
        <p>
          <i>{error?.message}</i>
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
