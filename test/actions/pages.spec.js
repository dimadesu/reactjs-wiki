import expect from 'expect';
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions/pages';

describe('page actions', () => {
  it('deletePage should create DELETE_PAGE action', () => {
    expect(actions.deletePage(1)).toEqual({
      type: types.DELETE_PAGE,
      id: 1
    });
  });

  it('bookmarkPage should create BOOKMARK_PAGE action', () => {
    expect(actions.bookmarkPage(1)).toEqual({
      type: types.BOOKMARK_PAGE,
      id: 1
    });
  });

  it('bookmarkAll should create BOOKMARK_ALL action', () => {
    expect(actions.bookmarkAll()).toEqual({
      type: types.BOOKMARK_ALL
    });
  });

  it('emptyBookmarks should create EMPTY_BOOKMARKS action', () => {
    expect(actions.emptyBookmarks('Sample page')).toEqual({
      type: types.EMPTY_BOOKMARKS
    });
  });
});
