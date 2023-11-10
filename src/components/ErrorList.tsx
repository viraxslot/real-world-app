import { ReactNode } from 'react';

type ErrorListProps = { errors: string[] | { body: string[] } | null };

export function ErrorList({ errors }: ErrorListProps) {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) {
    return;
  }

  let errorItems: ReactNode = '';
  if (Array.isArray(errors)) {
    errorItems = errors.map((error, idx) => <li key={idx}>{error}</li>);
  } else {
    try {
      errorItems = errors?.body.map((error, idx) => <li key={idx}>{error}</li>);
    } catch (err) {
      console.error(err);
    }
  }

  return <ul className="error-messages">{errorItems}</ul>;
}
