import { ERROR_LIST_LOCATORS } from './ErrorList.locators';

export type ErrorListProps = { errors: string | string[] | { body: string[] } | null };

export function ErrorList({ errors }: ErrorListProps) {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) {
    return null;
  }

  let errorsList: string[] = [];
  if (Array.isArray(errors)) {
    errorsList = errors;
  } else if (typeof errors === 'string') {
    errorsList = errors.split('\n');
  } else {
    errorsList = errors?.body ? errors.body : [];
  }

  return (
    <ul className="error-messages" data-testid={ERROR_LIST_LOCATORS.itself}>
      {errorsList.map((error, idx) => (
        <li key={idx} data-testid={ERROR_LIST_LOCATORS.errorItem}>
          {error}
        </li>
      ))}
    </ul>
  );
}
