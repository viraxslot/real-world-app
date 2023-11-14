import { ERROR_LIST_LOCATORS } from './ErrorList.locators';

export type ErrorListProps = { errors: string[] | { body: string[] } | null };

export function ErrorList({ errors }: ErrorListProps) {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) {
    return <></>;
  }

  let errorsList: string[] = [];
  if (Array.isArray(errors)) {
    errorsList = errors;
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
