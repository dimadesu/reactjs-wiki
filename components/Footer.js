import React, {
  PropTypes,
  Component
} from 'react';
import classnames from 'classnames';
import {
  SHOW_ALL,
  SHOW_BOOKMARKED,
  SHOW_NOT_BOOKMARKED
} from '../constants/PageFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_NOT_BOOKMARKED]: 'Not Bookmarked',
  [SHOW_BOOKMARKED]: 'Bookmarked'
};

class Footer extends Component {
  renderNotBookmarkedCount() {
    const { notBookmarkedCount } = this.props;
    const itemWord = notBookmarkedCount === 1 ? 'item' : 'items';

    return (
      <span className="page-count">
        <strong>{notBookmarkedCount || 'No'} </strong>
        {itemWord} are bookmarkable
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const {
      filter: selectedFilter,
      onShow
    } = this.props;

    return (
      <a className={classnames({ selected: filter === selectedFilter })}
         style={{ cursor: 'pointer' }}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const {
      bookmarkedCount,
      onEmptyBookmarked
    } = this.props;
    if (bookmarkedCount > 0) {
      return (
        <button
          className="clear-bookmarked"
          onClick={onEmptyBookmarked} >
          Delete all bookmarks
        </button>
      );
    }
  }

  render() {
    return (
      <footer className="footer">
        {this.renderNotBookmarkedCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_NOT_BOOKMARKED, SHOW_BOOKMARKED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

Footer.propTypes = {
  bookmarkedCount: PropTypes.number.isRequired,
  notBookmarkedCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onEmptyBookmarked: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default Footer;
