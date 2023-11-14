import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';
import { FOOTER_LOCATORS } from './Footer.locators';

const mount = () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
};

describe('Footer', () => {
  it('have text', () => {
    mount();
    const footer = screen.getByTestId(FOOTER_LOCATORS.itself);
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(
      'conduitAn interactive learning project from Thinkster. Code & design licensed under MIT.',
    );
  });
  it('contains home link', () => {
    mount();
    const homeLink = screen.getByTestId(FOOTER_LOCATORS.homePage);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('contains thinkster link', () => {
    mount();
    const thinksterLink = screen.getByTestId(FOOTER_LOCATORS.thinkster);
    expect(thinksterLink).toBeInTheDocument();
    expect(thinksterLink).toHaveAttribute('href', 'https://thinkster.io');
    expect(thinksterLink).toHaveTextContent('Thinkster');
  });
});
