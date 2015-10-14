import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class WikiPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {page, bookmarkPage, deletePage} = this.props;

    const element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={page.bookmarked}
          onChange={() => bookmarkPage(page.id)}
          title="Bookmark"
          />
        <label>
          {page.text}
        </label>
        <button
          className="destroy"
          onClick={() => deletePage(page.id)}
          title="Delete"
          />
      </div>
    );

    return (
      <li className={classnames({
        bookmarked: page.bookmarked
      })}>
        {element}
      </li>
    );
  }
}

WikiPage.propTypes = {
  page: PropTypes.object.isRequired,
  deletePage: PropTypes.func.isRequired,
  bookmarkPage: PropTypes.func.isRequired
};

export default WikiPage;
