import * as types from '../constants/ActionTypes';

export function addPage(text) {
  return { type: types.ADD_PAGE, text };
}

export function deletePage(id) {
  return { type: types.DELETE_PAGE, id };
}

export function editPage(id, text) {
  return { type: types.EDIT_PAGE, id, text };
}

export function archivePage(id) {
  return { type: types.ARCHIVE_PAGE, id };
}

export function archiveAll() {
  return { type: types.ARCHIVE_ALL };
}

export function emptyArchive() {
  return { type: types.EMPTY_ARCHIVE };
}
