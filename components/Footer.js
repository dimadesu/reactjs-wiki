import React, {
  PropTypes,
  Component
} from 'react';
import classnames from 'classnames';
import {
  SHOW_ALL,
  SHOW_ARCHIVED,
  SHOW_ACTIVE
} from '../constants/PageFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_ARCHIVED]: 'Archived'
};

class Footer extends Component {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="page-count">
        <strong>{activeCount || 'No'} </strong>
        {itemWord}
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
      archivedCount,
      onEmptyArchived
    } = this.props;
    if (archivedCount > 0) {
      return (
        <button
          className="clear-archived"
          onClick={onEmptyArchived} >
          Clear archived
        </button>
      );
    }
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_ARCHIVED].map(filter =>
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
  archivedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onEmptyArchived: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default Footer;
