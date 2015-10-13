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
    const {page, archivePage, deletePage} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <WikiTextInput text={page.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(page.id, text)} />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={page.archived}
            onChange={() => archivePage(page.id)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {page.text}
          </label>
          <button className="destroy"
                  onClick={() => deletePage(page.id)} />
        </div>
      );
    }

    return (
      <li className={classnames({
        archived: page.archived,
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
  archivePage: PropTypes.func.isRequired
};

export default WikiPage;
