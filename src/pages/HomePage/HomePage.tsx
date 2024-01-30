import { Banner } from '../../components/Banner/Banner';
import { Articles } from '../../components/Articles/Articles';
import { PopularTags } from '../../components/PopularTags/PopularTags';
import { FeedTab } from '../../components/FeedTab/FeedTab';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth-context';
import { GLOBAL_FEED, YOUR_FEED } from '../../shared/constants';
import cookieHelper from '../../helpers/cookie.helper';

export function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [activeFeed, setActiveFeed] = useState<string>(GLOBAL_FEED);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feeds, setFeeds] = useState<string[]>([GLOBAL_FEED]);

  const saveActiveFeed = (feed: string) => {
    setActiveFeed(feed);
    cookieHelper.set('active-feed', feed);
  };

  const saveSelectedTags = (tags: string[]) => {
    setSelectedTags(tags);
    cookieHelper.set('selected-tags', JSON.stringify(tags));
  };

  useEffect(() => {
    if (isAuthenticated && !feeds.includes(YOUR_FEED)) {
      setFeeds([YOUR_FEED, ...feeds]);
    }

    if (!isAuthenticated) {
      setFeeds((prevFeeds) => {
        return prevFeeds.filter((el) => el !== YOUR_FEED);
      });
      if (activeFeed === YOUR_FEED) {
        saveActiveFeed(GLOBAL_FEED);
      }
    }
  }, [isAuthenticated, feeds, setFeeds, activeFeed]);

  useEffect(() => {
    const activeFeed = cookieHelper.get('active-feed');
    const tagsCookie = cookieHelper.get('selected-tags');

    if (tagsCookie) {
      try {
        const tags = JSON.parse(tagsCookie);
        saveSelectedTags(tags);
      } catch (err) {
        console.error(err);
      }
    }

    if (activeFeed) {
      if (activeFeed === YOUR_FEED && !isAuthenticated) {
        // TODO: here's a problem, because on the first render isAuthenticated is false
        saveActiveFeed(GLOBAL_FEED);
      } else {
        saveActiveFeed(activeFeed);
      }
    }
  }, [isAuthenticated]);

  const handleTagOnClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => {
        return prevTags.filter((el) => el !== tag);
      });
      saveActiveFeed(GLOBAL_FEED);
    } else {
      saveSelectedTags([...selectedTags, tag]);
      saveActiveFeed(tag);
    }
  };

  const handleChangeTab = (feedTitle: string) => {
    saveActiveFeed(feedTitle);
  };

  return (
    <div className="home-page">
      <Banner title="conduit" description="A place to share your knowledge."></Banner>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {[...feeds, ...selectedTags].map((feed, idx) => {
                  return (
                    <FeedTab
                      key={idx}
                      title={feed}
                      active={activeFeed === feed && true}
                      changeTab={handleChangeTab}
                    />
                  );
                })}
              </ul>
            </div>
            <Articles feedType={activeFeed} />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <PopularTags tagClickHandler={handleTagOnClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
