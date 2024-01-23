import { Article } from '../../shared/types';

type ArticlePreviewProps = {
  article: Article;
};

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const profileUrl = `/profile/${article.author.username}`;
  const articleUrl = `/article/${article.slug}`;

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
          <span className="date">{article.createdAt}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount ?? 0}
        </button>
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
