import { useContext, useEffect, useState } from 'react';
import { Pagination } from '../Pagination/Pagination';
import { Article } from '../../shared/types';
import { ArticlePreview } from '../ArticlePreview/ArticlePreview';
import { useArticlePageCount } from '../../hooks/useArticlePageCount';
import AuthContext from '../../context/auth-context';
import { ApiClient } from '../../api/api-client';
import { YOUR_FEED } from '../../shared/constants';

type ArticlesProps = {
  feedType: string;
};

export function Articles({ feedType }: ArticlesProps) {
  const { token } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesOnPage, setArticlesOnPage] = useState<Article[]>([]);

  const articlesPerPage = 5;
  const pagesCount = useArticlePageCount({ feedType, articlesPerPage });

  useEffect(() => {
    const getArticles = async () => {
      let body;
      try {
        body = await ApiClient.articles(
          {
            offset: (currentPage - 1) * articlesPerPage,
            limit: articlesPerPage,
            feedType,
          },
          token,
        );
        let articles = body?.articles;
        if (feedType === YOUR_FEED) {
          articles = articles.filter((a: Article) => a.author.following);
        }
        setArticlesOnPage(articles);
      } catch (err) {
        console.error(err);
      }
    };

    getArticles();
  }, [token, feedType, currentPage]);

  const handleFavoriteButtonClick = (article: Article) => {
    const articleIndex = articlesOnPage.findIndex((a: Article) => a.slug === article.slug);

    if (articleIndex !== -1) {
      const tempArticles = [...articlesOnPage];
      tempArticles.splice(articleIndex, 1, article);
      setArticlesOnPage(tempArticles);
    }
  };

  return (
    <>
      {articlesOnPage?.map((article) => {
        return (
          <ArticlePreview
            article={article}
            key={article.slug}
            onFavoriteButtonClick={handleFavoriteButtonClick}
          />
        );
      })}

      <Pagination
        currentPage={currentPage}
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
