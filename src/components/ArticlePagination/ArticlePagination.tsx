import { useContext, useEffect, useState } from 'react';
import { Pagination } from '../Pagination/Pagination';
import { Article } from '../../shared/types';
import { ArticlePreview } from '../ArticlePreview/ArticlePreview';
import { useArticlePageCount } from '../../hooks/useArticlePageCount';
import { ApiClient } from '../../api/api-client';
import { GLOBAL_FEED, YOUR_FEED } from '../../pages/HomePage/HomePage';
import AuthContext from '../../context/auth-context';

type ArticlePaginationProps = {
  feedType: string;
  tag?: string;
};

export function ArticlePagination({ feedType, tag }: ArticlePaginationProps) {
  const { token } = useContext(AuthContext);
  const [currentPageData, setCurrentPageData] = useState<Article[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const articlesPerPage = 5;
  const pagesCount = useArticlePageCount(articlesPerPage);

  // TODO: solve any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiMethodMap: Record<string, any> = {
    [GLOBAL_FEED]: ApiClient.articles,
    [YOUR_FEED]: ApiClient.articlesFeed,
    tag: ApiClient.articles,
  };

  useEffect(() => {
    const getArticles = async () => {
      let body;
      try {
        body = await apiMethodMap[feedType](
          {
            offset: (currentPage - 1) * articlesPerPage,
            limit: articlesPerPage,
            tag,
          },
          token,
        );
        setCurrentPageData(body?.articles);
      } catch (err) {
        console.error(err);
      }
    };

    getArticles();
  }, [currentPage, feedType]);

  return (
    <>
      {currentPageData?.map((article, idx) => {
        return <ArticlePreview article={article} key={idx} />;
      })}

      <Pagination
        currentPage={currentPage}
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
