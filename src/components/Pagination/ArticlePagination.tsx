import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { ApiClient } from '../../api/api-client';
import { Article } from '../../shared/types';
import { ArticlePreview } from '../ArticlePreview/ArticlePreview';

export function ArticlePagination() {
  const [currentPageData, setCurrentPageData] = useState<Article[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);

  const articlesPerPage = 5;

  useEffect(() => {
    const getArticles = async () => {
      let body;
      try {
        body = await ApiClient.articles();
        setPagesCount(Math.ceil(body?.articlesCount / articlesPerPage));
      } catch (err) {
        console.error(err);
      }
    };

    getArticles();
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      let body;
      try {
        body = await ApiClient.articles({
          offset: (currentPage - 1) * articlesPerPage,
          limit: articlesPerPage,
        });
        setCurrentPageData(body?.articles);
      } catch (err) {
        console.error(err);
      }
    };

    getArticles();
  }, [currentPage]);

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
