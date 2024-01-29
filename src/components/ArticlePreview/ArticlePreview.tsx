import clsx from 'clsx';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import { ApiClient } from '../../api/api-client';
import AuthContext from '../../context/auth-context';
import { Article } from '../../shared/types';

type ArticlePreviewProps = {
  favoriteClickHandler: (article: Article) => void;
  article: Article;
};

export function ArticlePreview({ article, favoriteClickHandler }: ArticlePreviewProps) {
  const { isAuthenticated, token } = useContext(AuthContext);

  const profileUrl = `/profile/${article.author.username}`;
  const articleUrl = `/article/${article.slug}`;
  const createdAt = DateTime.fromISO(article.createdAt);

  const handleOnClickFavoriteButton = async () => {
    return ApiClient.favoriteArticle(
      {
        slug: article.slug,
        like: !article.favorited,
      },
      token,
    );
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={profileUrl}>
          <img src={article.author.image ?? ''} />
        </a>
        <div className="info">
          <a href={profileUrl} className="author">
            {article.author.username}
          </a>
          <span className="date">{createdAt.toLocaleString(DateTime.DATE_FULL)}</span>
        </div>
        {isAuthenticated && (
          <button
            className={clsx(
              'btn btn-sm pull-xs-right',
              article.favorited ? 'btn-primary' : 'btn-outline-primary',
            )}
            onClick={async () => {
              const response = await handleOnClickFavoriteButton();
              favoriteClickHandler(response?.article);
            }}
          >
            <i className="ion-heart"></i> {article.favoritesCount ?? 0}
          </button>
        )}
      </div>
      <a href={articleUrl} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((el, idx) => (
            <li className="tag-default tag-pill tag-outline" key={idx}>
              <div>{el}</div>
            </li>
          ))}
        </ul>
      </a>
    </div>
  );
}
