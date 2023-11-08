import { ErrorObject } from '../shared/types';

export type ErrorListProps = {
  errors: ErrorObject | null;
};

export function ErrorList({ errors }: ErrorListProps) {
  if (!errors) {
    return;
  }

  return Object.keys(errors).length > 0 ? (
    <ul className="error-messages">
      {Object.keys(errors).map((idx, key) => (
        <li key={idx}>
          {key} {errors[key][0]}
        </li>
      ))}
    </ul>
  ) : null;
}
