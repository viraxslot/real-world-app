import { useEffect, useState } from 'react';
import { ApiClient } from '../api/api-client';

type ArticlesPageCountProps = {
  articlesPerPage: number;
  feedType: string;
};

export function useArticlePageCount({ articlesPerPage, feedType }: ArticlesPageCountProps) {
  const [pagesCount, setPagesCount] = useState<number>(1);

  useEffect(() => {
    const getArticles = async () => {
      let body;
      try {
        body = await ApiClient.articles({ feedType });
        setPagesCount(Math.ceil(body?.articlesCount / articlesPerPage));
      } catch (err) {
        console.error(err);
      }
    };

    getArticles();
  }, [articlesPerPage, feedType]);

  return pagesCount;
}
