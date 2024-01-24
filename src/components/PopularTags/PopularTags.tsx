import { useEffect, useState } from 'react';
import { ApiClient } from '../../api/api-client';
import { POPULAR_TAGS_LOCATORS } from './PopularTags.locators';

export function PopularTags() {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const getTags = async () => {
      let body;
      try {
        body = await ApiClient.tags();
        setTags(body?.tags);
      } catch (err) {
        console.error(err);
      }
    };
    getTags();
  }, []);

  return (
    <>
      <p>Popular Tags</p>
      <ul className="tag-list" data-testid={POPULAR_TAGS_LOCATORS.itself}>
        {tags.map((el, index) => (
          <li key={index}>
            <a href="" className="tag-pill tag-default">
              <div data-testid={POPULAR_TAGS_LOCATORS.item}>{el}</div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
