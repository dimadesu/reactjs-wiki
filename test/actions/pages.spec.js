import expect from 'expect';
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions/pages';

describe('page actions', () => {
  it('addPage should create ADD_PAGE action', () => {
    expect(actions.addPage('Sample page')).toEqual({
      type: types.ADD_PAGE,
      text: 'Sample page'
    });
  });

  it('deletePage should create DELETE_PAGE action', () => {
    expect(actions.deletePage(1)).toEqual({
      type: types.DELETE_PAGE,
      id: 1
    });
  });

  it('editPage should create EDIT_PAGE action', () => {
    expect(actions.editPage(1, 'Sample page everywhere')).toEqual({
      type: types.EDIT_PAGE,
      id: 1,
      text: 'Sample page everywhere'
    });
  });

  it('archivePage should create ARCHIVE_PAGE action', () => {
    expect(actions.archivePage(1)).toEqual({
      type: types.ARCHIVE_PAGE,
      id: 1
    });
  });

  it('archiveAll should create ARCHIVE_ALL action', () => {
    expect(actions.archiveAll()).toEqual({
      type: types.ARCHIVE_ALL
    });
  });

  it('emptyArchive should create EMPTY_ARCHIVE action', () => {
    expect(actions.emptyArchive('Sample page')).toEqual({
      type: types.EMPTY_ARCHIVE
    });
  });
});
