import clsx from 'clsx';

export type FeedTabProps = {
  active: boolean;
  title: string;
  changeTab: (feedTitle: string) => void;
};

export function FeedTab({ title, active, changeTab }: FeedTabProps) {
  return (
    <li className="nav-item">
      <a
        className={clsx('nav-link', active && 'active')}
        href=""
        onClick={(e) => {
          e.preventDefault();
          changeTab(title);
        }}
      >
        {title}
      </a>
    </li>
  );
}
