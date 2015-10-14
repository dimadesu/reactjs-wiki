import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import WikiTextInput from './WikiTextInput';

class WikiPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deletePage(id);
    } else {
      this.props.editPage(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {page, bookmarkPage, deletePage} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <WikiTextInput
          text={page.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(page.id, text)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={page.bookmarked}
            onChange={() => bookmarkPage(page.id)}
            title="Bookmark"
          />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {page.text}
          </label>
          <button
            className="destroy"
            onClick={() => deletePage(page.id)}
            title="Delete"
            />
        </div>
      );
    }

    return (
      <li className={classnames({
        bookmarked: page.bookmarked,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}

WikiPage.propTypes = {
  page: PropTypes.object.isRequired,
  editPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  bookmarkPage: PropTypes.func.isRequired
};

export default WikiPage;
