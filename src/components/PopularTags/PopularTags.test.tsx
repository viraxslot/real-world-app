import { render, screen } from '@testing-library/react';
import { mockFetch } from '../../helpers/test.helper';
import { POPULAR_TAGS_LOCATORS } from './PopularTags.locators';
import { PopularTags } from './PopularTags';

const mount = () => {
  render(<PopularTags />);
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
    mount();

    const element = screen.getByTestId(POPULAR_TAGS_LOCATORS.itself);
    expect(element).toBeInTheDocument();
    const items = await screen.findAllByTestId(POPULAR_TAGS_LOCATORS.item);
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

    mount();
    const element = screen.getByTestId(POPULAR_TAGS_LOCATORS.itself);
    expect(element).toBeInTheDocument();
    expect(screen.queryByTestId(POPULAR_TAGS_LOCATORS.item)).not.toBeInTheDocument();
  });
});
