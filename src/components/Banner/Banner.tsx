import { BANNER_LOCATORS } from './Banner.locators';

export type BannerProps = {
  title: string;
  description: string;
};

export function Banner({ title, description }: BannerProps) {
  return (
    <div className="banner" data-testid={BANNER_LOCATORS.itself}>
      <div className="container">
        <h1 className="logo-font" data-testid={BANNER_LOCATORS.title}>
          {title}
        </h1>
        <p data-testid={BANNER_LOCATORS.description}>{description}</p>
      </div>
    </div>
  );
}
