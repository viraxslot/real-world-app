import { Link } from 'react-router-dom';
import { FOOTER_LOCATORS } from './Footer.locators';

export function Footer() {
  return (
    <footer>
      <div className="container" data-testid={FOOTER_LOCATORS.itself}>
        <Link to="/" className="logo-font" data-testid={FOOTER_LOCATORS.homePage}>
          conduit
        </Link>
        <span className="attribution">
          An interactive learning project from{' '}
          <a href="https://thinkster.io" data-testid={FOOTER_LOCATORS.thinkster}>
            Thinkster
          </a>
          . Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
}
