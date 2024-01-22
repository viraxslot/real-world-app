import { render, screen } from '@testing-library/react';
import { TagsList, TagsListProps } from './TagList';
import { mockFetch } from '../../helpers/test.helper';
import { TAGS_LIST_LOCATORS } from './TagList.locators';

const mount = ({ title }: TagsListProps) => {
  render(<TagsList title={title} />);
};

describe('Tags list', () => {
  it('should render', async () => {
    const tags = ['cats', 'dogs'];

    global.fetch = mockFetch({
      ok: true,
      data: {
        tags,
      },
    });

    const title = 'Tags list title';
    mount({ title });

    const element = screen.getByTestId(TAGS_LIST_LOCATORS.itself);
    expect(element).toBeInTheDocument();
    expect(screen.getByTestId(TAGS_LIST_LOCATORS.title)).toBeInTheDocument();
    const items = await screen.findAllByTestId(TAGS_LIST_LOCATORS.item);
    expect(items).toHaveLength(tags.length);

    for (const [index, item] of items.entries()) {
      expect(item).toHaveTextContent(tags[index]);
    }
  });

  it('should render only title for empty tags list', async () => {
    global.fetch = mockFetch({
      ok: true,
      data: {
        tags: [],
      },
    });

    const title = 'Tags list title';
    mount({ title });

    const element = screen.getByTestId(TAGS_LIST_LOCATORS.itself);
    expect(element).toBeInTheDocument();
    expect(screen.getByTestId(TAGS_LIST_LOCATORS.title)).toBeInTheDocument();
    expect(screen.queryByTestId(TAGS_LIST_LOCATORS.item)).not.toBeInTheDocument();
  });
});
