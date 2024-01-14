import { render, screen } from '@testing-library/react';
import { ErrorList, ErrorListProps } from './ErrorList';
import { ERROR_LIST_LOCATORS } from './ErrorList.locators';

const mount = ({ errors }: ErrorListProps) => {
  render(<ErrorList errors={errors} />);
};

describe('ErrorList', () => {
  it('with null', () => {
    mount({ errors: null });
    const element = screen.queryByTestId(ERROR_LIST_LOCATORS.itself);
    expect(element).not.toBeInTheDocument();
  });

  it('with string', () => {
    mount({ errors: 'test error' });
    const element = screen.queryByTestId(ERROR_LIST_LOCATORS.itself);
    expect(element).toBeInTheDocument();

    const items = screen.queryAllByTestId(ERROR_LIST_LOCATORS.errorItem);
    expect(items.length).toBe(1);
  });

  describe('with error object', () => {
    it('valid object, several errors', () => {
      const errors = ['first error in object', 'second error in object'];
      mount({ errors: { body: errors } });
      const list = screen.queryByTestId(ERROR_LIST_LOCATORS.itself);
      expect(list).toBeInTheDocument();

      const items = screen.queryAllByTestId(ERROR_LIST_LOCATORS.errorItem);
      expect(items.length).toBe(errors.length);
    });

    it('invalid object', () => {
      const errors = ['first error in object', 'second error in object'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mount({ errors: { test: errors } } as any);
      expect(screen.getByTestId(ERROR_LIST_LOCATORS.itself)).toBeInTheDocument();
      expect(screen.queryByTestId(ERROR_LIST_LOCATORS.errorItem)).not.toBeInTheDocument();
    });
  });

  describe('with array of errors', () => {
    it('empty array', () => {
      mount({ errors: [] });
      const element = screen.queryByTestId(ERROR_LIST_LOCATORS.itself);
      expect(element).not.toBeInTheDocument();
    });

    const testCases = [
      {
        name: 'array with one element',
        data: ['this is the error'],
      },
      {
        name: 'array with several elements',
        data: ['first error', 'second error'],
      },
    ];
    testCases.forEach((testCase) => {
      it(`${testCase.name}`, () => {
        mount({ errors: testCase.data });
        const list = screen.queryByTestId(ERROR_LIST_LOCATORS.itself);
        expect(list).toBeInTheDocument();

        const items = screen.queryAllByTestId(ERROR_LIST_LOCATORS.errorItem);
        expect(items.length).toBe(testCase.data.length);

        items.forEach((item, idx) => {
          expect(item).toHaveTextContent(testCase.data[idx]);
        });
      });
    });
  });
});
