import { Banner } from '../../components/Banner/Banner';
import { ArticlePagination } from '../../components/Pagination/ArticlePagination';
import { PopularTags } from '../../components/PopularTags/PopularTags';

export function HomePage() {
  return (
    <div className="home-page">
      <Banner title="conduit" description="A place to share your knowledge."></Banner>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            <ArticlePagination />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
