import React, { Component, PropTypes } from 'react';
import WikiPage from './WikiPage';
import Footer from './Footer';
import {
  SHOW_ALL,
  SHOW_BOOKMARKED,
  SHOW_NOT_BOOKMARKED
} from '../constants/PageFilters';

const PAGE_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_NOT_BOOKMARKED]: page => !page.bookmarked,
  [SHOW_BOOKMARKED]: page => page.bookmarked
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
    this.props.actions.loadRandomPages();
  }

  handleClearBookmarked() {
    const atLeastOneBookmarked = this.props.pages.some(page => page.bookmarked);
    if (atLeastOneBookmarked) {
      this.props.actions.emptyBookmarks();
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  renderToggleAll(bookmarkedCount) {
    const { pages, actions } = this.props;
    if (pages.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={bookmarkedCount === pages.length}
          onChange={actions.bookmarkAll}
          title="Bookmark All"
        />
      );
    }
  }

  renderFooter(bookmarkedCount) {
    const { pages } = this.props;
    const { filter } = this.state;
    const notBookmarkedCount = pages.length - bookmarkedCount;

    if (pages.length) {
      return (
        <Footer
          bookmarkedCount={bookmarkedCount}
          notBookmarkedCount={notBookmarkedCount}
          filter={filter}
          onEmptyBookmarked={this.handleClearBookmarked.bind(this)}
          onShow={this.handleShow.bind(this)}
        />
      );
    }
  }

  render() {
    const { pages, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = pages.filter(PAGE_FILTERS[filter]);
    const bookmarkedCount = pages.reduce((count, page) =>
      page.bookmarked ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(bookmarkedCount)}
        <ul className="page-list">
          {filteredTodos.map(page =>
            <WikiPage
              key={page.id}
              page={page}
              {...actions}
            />
          )}
        </ul>
        {this.renderFooter(bookmarkedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  pages: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
