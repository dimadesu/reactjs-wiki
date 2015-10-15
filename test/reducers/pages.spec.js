import expect from 'expect';
import pages from '../../reducers/pages';
import * as types from '../../constants/ActionTypes';

describe('pages reducer', () => {
  it('should handle initial state', () => {
    expect(
      pages(undefined, {})
    ).toEqual([{
      text: 'Sample page',
      bookmarked: false,
      id: 0
    }]);
  });

  it('should handle DELETE_PAGE', () => {
    expect(
      pages([{
        text: 'Run the tests',
        bookmarked: false,
        id: 1
      }, {
        text: 'Sample page',
        bookmarked: false,
        id: 0
      }], {
        type: types.DELETE_PAGE,
        id: 1
      })
    ).toEqual([{
      text: 'Sample page',
      bookmarked: false,
      id: 0
    }]);
  });

  it('should handle BOOKMARK_PAGE', () => {
    expect(
      pages([{
        text: 'Run the tests',
        bookmarked: false,
        id: 1
      }, {
        text: 'Sample page',
        bookmarked: false,
        id: 0
      }], {
        type: types.BOOKMARK_PAGE,
        id: 1
      })
    ).toEqual([{
      text: 'Run the tests',
      bookmarked: true,
      id: 1
    }, {
      text: 'Sample page',
      bookmarked: false,
      id: 0
    }]);
  });

  it('should handle EMPTY_BOOKMARKS', () => {
    expect(
      pages([{
        text: 'Run the tests',
        bookmarked: true,
        id: 1
      }, {
        text: 'Sample page',
        bookmarked: false,
        id: 0
      }], {
        type: types.EMPTY_BOOKMARKS
      })
    ).toEqual([{
      text: 'Sample page',
      bookmarked: false,
      id: 0
    }]);
  });

  it('should not generate duplicate ids after EMPTY_BOOKMARKS', () => {
    expect(
      [{
        type: types.BOOKMARK_PAGE,
        id: 0
      }, {
        type: types.EMPTY_BOOKMARKS
      }, {
        type: types.ADD_PAGE,
        text: 'Write more tests'
      }].reduce(pages, [{
        id: 0,
        bookmarked: false,
        text: 'Sample page'
      }, {
        id: 1,
        bookmarked: false,
        text: 'Write tests'
      }])
    ).toEqual([{
      text: 'Write more tests',
      bookmarked: false,
      id: 2
    }, {
      text: 'Write tests',
      bookmarked: false,
      id: 1
    }]);
  });
});
