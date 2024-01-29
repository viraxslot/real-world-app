import { Banner } from '../../components/Banner/Banner';
import { Articles } from '../../components/Articles/Articles';
import { PopularTags } from '../../components/PopularTags/PopularTags';
import { FeedTab } from '../../components/FeedTab/FeedTab';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth-context';
import { GLOBAL_FEED, YOUR_FEED } from '../../shared/constants';

export function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [activeFeed, setActiveFeed] = useState<string>(GLOBAL_FEED);
  const [feeds, setFeeds] = useState<string[]>([GLOBAL_FEED]);

  useEffect(() => {
    if (isAuthenticated && !feeds.includes(YOUR_FEED)) {
      setFeeds([YOUR_FEED, ...feeds]);
    }

    if (!isAuthenticated) {
      removeFeed(YOUR_FEED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, feeds]);

  const removeFeed = (feed: string) => {
    const feedIndex = feeds.indexOf(feed);
    if (feedIndex !== -1) {
      // TODO: should I copy here?
      const tempFeeds = [...feeds];
      tempFeeds.splice(feedIndex, 1);
      setFeeds(tempFeeds);
    }
  };

  const handleTagOnClick = (tag: string) => {
    if (feeds.includes(tag)) {
      removeFeed(tag);
      setActiveFeed(GLOBAL_FEED);
    } else {
      setFeeds([...feeds, tag]);
      setActiveFeed(tag);
    }
  };

  const handleChangeTab = (feedTitle: string) => {
    setActiveFeed(feedTitle);
  };

  return (
    <div className="home-page">
      <Banner title="conduit" description="A place to share your knowledge."></Banner>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {feeds.map((feed, idx) => {
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
