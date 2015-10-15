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
            bookmarked: false,
            id: item.id
          };
        });
        return dispatch(returnRandomPages(result));
      });
  }
}

export function returnPageDetails(id, categories) {
  return {
    type: types.LOAD_PAGE_DETAILS,
    id,
    categories
  };
}

export function loadPageDetails(pageId) {
  return (dispatch) => {
    superagent
      .get('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&pageids=' + pageId)
      .use(superagentJsonp)
      .end((err, resp)=> {
        const categories = resp.body.query.pages[pageId].categories;
        const result = categories ?
          categories.map((item, index) => {
            return {
              title: item.title
            };
          }) :
          [];
        return dispatch(returnPageDetails(pageId, result));
      });
  }
}

export function deletePage(id) {
  return {
    type: types.DELETE_PAGE,
    id
  };
}

export function bookmarkPage(id) {
  return {
    type: types.BOOKMARK_PAGE,
    id
  };
}

export function emptyBookmarks() {
  return {
    type: types.EMPTY_BOOKMARKS
  };
}
