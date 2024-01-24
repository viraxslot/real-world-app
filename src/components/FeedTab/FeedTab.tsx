import clsx from 'clsx';
import { Feed } from '../../pages/HomePage/HomePage';

export type FeedTabProps = {
  active: boolean;
  title: Feed;
  changeTab: (feedTitle: Feed) => void;
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
