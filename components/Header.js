import React, { PropTypes, Component } from 'react';
import WikiTextInput from './WikiTextInput';

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addPage(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>WikiPages</h1>
        <WikiTextInput
          newPage
          onSave={this.handleSave.bind(this)}
          placeholder="Page title"
        />
      </header>
    );
  }
}

Header.propTypes = {
  addPage: PropTypes.func.isRequired
};

export default Header;
