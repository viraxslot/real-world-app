import { render, screen } from '@testing-library/react';
import { Banner, BannerProps } from './Banner';
import { BANNER_LOCATORS } from './Banner.locators';

const mount = ({ title, description }: BannerProps) => {
  render(<Banner title={title} description={description} />);
};

describe('Banner', () => {
  it('should render', () => {
    const title = 'Banner title';
    const description = 'Banner description';

    mount({ title, description });
    const element = screen.queryByTestId(BANNER_LOCATORS.itself);
    expect(element).toBeInTheDocument();
    expect(screen.queryByTestId(BANNER_LOCATORS.title)).toHaveTextContent(title);
    expect(screen.queryByTestId(BANNER_LOCATORS.description)).toHaveTextContent(description);
  });

  it('should work with empty strings', () => {
    mount({ title: '', description: '' });
    const element = screen.queryByTestId(BANNER_LOCATORS.itself);
    expect(element).toBeInTheDocument();
    expect(screen.queryByTestId(BANNER_LOCATORS.title)).toHaveTextContent('');
    expect(screen.queryByTestId(BANNER_LOCATORS.description)).toHaveTextContent('');
  });
});
