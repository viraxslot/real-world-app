import { Banner } from '../../components/Banner/Banner';
import { ArticlePagination } from '../../components/ArticlePagination/ArticlePagination';
import { PopularTags } from '../../components/PopularTags/PopularTags';
import { FeedTab } from '../../components/FeedTab/FeedTab';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth-context';

export const YOUR_FEED = 'Your Feed';
export const GLOBAL_FEED = 'Global Feed';

export function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [activeFeed, setActiveFeed] = useState<string>(GLOBAL_FEED);
  const [feeds, setFeeds] = useState<string[]>([GLOBAL_FEED]);

  useEffect(() => {
    if (isAuthenticated && !feeds.includes(YOUR_FEED)) {
      setFeeds([YOUR_FEED, ...feeds]);
    }

    if (!isAuthenticated) {
      const feedIndex = feeds.indexOf(YOUR_FEED);
      if (feedIndex !== -1) {
        // TODO: should I copy here?
        let tempFeeds = [...feeds];
        tempFeeds.splice(feedIndex, 1);
        setFeeds(tempFeeds);
      }
    }
  }, [isAuthenticated]);

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
            <ArticlePagination feedType={activeFeed} />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
