import { useEffect, useState } from 'react';
import { ApiClient } from '../../api/api-client';
import { POPULAR_TAGS_LOCATORS } from './PopularTags.locators';

type PopularTagsProps = {
  tagClickHandler: (tag: string) => void;
};

export function PopularTags({ tagClickHandler }: PopularTagsProps) {
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

  const handleTagOnClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    tagClickHandler(tag);
  };

  return (
    <>
      <p>Popular Tags</p>
      <ul className="tag-list" data-testid={POPULAR_TAGS_LOCATORS.itself}>
        {tags.map((tag) => (
          <li key={tag}>
            <a
              href=""
              className="tag-pill tag-default"
              onClick={(event) => handleTagOnClick(event, tag)}
            >
              <div data-testid={POPULAR_TAGS_LOCATORS.item}>{tag}</div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
