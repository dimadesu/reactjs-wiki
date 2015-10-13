import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/pages';

class App extends Component {
  render() {
    const { pages, dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    return (
      <div>
        <Header addPage={actions.addPage} />
        <MainSection pages={pages} actions={actions} />
      </div>
    );
  }
}

App.propTypes = {
  pages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    pages: state.pages
  };
}

export default connect(mapStateToProps)(App);
