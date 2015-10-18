import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class WikiPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.props.loadPageDetails(this.props.page.id);
    this.setState({ showModal: true });
  }

  render() {
    const {page, bookmarkPage, deletePage} = this.props;

    const categories = this.props.page.categories ?
      this.props.page.categories.map((cat, index) => <p key={index}>{cat.title}</p>) :
      'This page has no categories';

    const image = this.props.page.image ?
      (<img src={this.props.page.image.source} />) :
      'This page has no image';

    const toggleClass = classnames(
      'toggle',
      'glyphicon',
      (page.bookmarked ? 'glyphicon-star' : 'glyphicon-star-empty')
    );

    const modal = (
      <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.page.text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Image</h4>
          {image}
          <h4>Categories</h4>
          {categories}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );

    const element = (
      <div className="view">
        <input
          className={toggleClass}
          type="checkbox"
          checked={page.bookmarked}
          onChange={() => bookmarkPage(page.id)}
          title="Bookmark"
          />
        <a onClick={this.openModal.bind(this)}>
          {page.text}
        </a>
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
        {modal}
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
