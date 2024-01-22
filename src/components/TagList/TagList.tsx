import { useEffect, useState } from 'react';
import { ApiClient } from '../../api/api-client';
import { TAGS_LIST_LOCATORS } from './TagList.locators';

export type TagsListProps = {
  title: string;
};
export function TagsList({ title }: TagsListProps) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const getTags = async () => {
      const body = await ApiClient.tags();
      setTags(body?.tags);
    };
    getTags();
  }, [tags]);

  return (
    <div data-testid={TAGS_LIST_LOCATORS.itself}>
      <p data-testid={TAGS_LIST_LOCATORS.title}>{title}</p>

      <div className="tag-list">
        {tags.map((el, index) => (
          <a href="" className="tag-pill tag-default" key={index}>
            <div data-testid={TAGS_LIST_LOCATORS.item}>{el}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
