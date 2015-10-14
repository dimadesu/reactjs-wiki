import React, { Component, PropTypes } from 'react';
import WikiPage from './WikiPage';
import Footer from './Footer';
import {
  SHOW_ALL,
  SHOW_ARCHIVED,
  SHOW_ACTIVE
} from '../constants/PageFilters';

const PAGE_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: page => !page.archived,
  [SHOW_ARCHIVED]: page => page.archived
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
    this.props.actions.loadRandomPages();
  }

  handleClearArchived() {
    const atLeastOneArchived = this.props.pages.some(page => page.archived);
    if (atLeastOneArchived) {
      this.props.actions.emptyArchive();
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  renderToggleAll(archivedCount) {
    const { pages, actions } = this.props;
    if (pages.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={archivedCount === pages.length}
          onChange={actions.archiveAll}
        />
      );
    }
  }

  renderFooter(archivedCount) {
    const { pages } = this.props;
    const { filter } = this.state;
    const activeCount = pages.length - archivedCount;

    if (pages.length) {
      return (
        <Footer
          archivedCount={archivedCount}
          activeCount={activeCount}
          filter={filter}
          onEmptyArchived={this.handleClearArchived.bind(this)}
          onShow={this.handleShow.bind(this)}
        />
      );
    }
  }

  render() {
    const { pages, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = pages.filter(PAGE_FILTERS[filter]);
    const archivedCount = pages.reduce((count, page) =>
      page.archived ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(archivedCount)}
        <ul className="page-list">
          {filteredTodos.map(page =>
            <WikiPage
              key={page.id}
              page={page}
              {...actions}
            />
          )}
        </ul>
        {this.renderFooter(archivedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  pages: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
