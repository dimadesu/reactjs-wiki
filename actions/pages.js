import superagent from 'superagent';
import superagentJsonp from 'superagent-jsonp';
import * as types from '../constants/ActionTypes';

export function returnRandomPages(data) {
  return {
    type: types.LOAD_RANDOM_PAGES,
    data
  };
}

export function loadRandomPages() {
  return (dispatch) => {
    superagent
      .get('https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnlimit=10')
      .use(superagentJsonp)
      .end((err, resp)=> {
        const result = resp.body.query.random.map((item, index) => {
          return {
            text: item.title,
            archived: false,
            id: item.id
          };
        });
        return dispatch(returnRandomPages(result));
      });
  }
}

export function addPage(text) {
  return {
    type: types.ADD_PAGE,
    text
  };
}

export function deletePage(id) {
  return {
    type: types.DELETE_PAGE,
    id
  };
}

export function editPage(id, text) {
  return {
    type: types.EDIT_PAGE,
    id,
    text
  };
}

export function archivePage(id) {
  return {
    type: types.ARCHIVE_PAGE,
    id
  };
}

export function archiveAll() {
  return {
    type: types.ARCHIVE_ALL
  };
}

export function emptyArchive() {
  return {
    type: types.EMPTY_ARCHIVE
  };
}