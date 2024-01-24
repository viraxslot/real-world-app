import { useEffect, useState } from 'react';
import { ApiClient } from '../api/api-client';

export function useArticlePageCount(articlesPerPage: number) {
  const [pagesCount, setPagesCount] = useState<number>(1);

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

  return pagesCount;
}
