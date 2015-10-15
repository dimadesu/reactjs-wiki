import superagent from 'superagent';
import superagentJsonp from 'superagent-jsonp';
import * as types from '../constants/ActionTypes';

// TODO: Move to constants folder
const API_BASE = 'https://en.wikipedia.org/w/api.php';

export function returnRandomPages(data) {
  return {
    type: types.LOAD_RANDOM_PAGES,
    data
  };
}

export function loadRandomPages() {
  return (dispatch) => {
    superagent
      .get(API_BASE)
      .query({
        format: 'json',
        action: 'query',
        list: 'random',
        rnlimit: 10
      })
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

export function returnPageDetails(id, categories, image) {
  return {
    type: types.LOAD_PAGE_DETAILS,
    id,
    categories,
    image
  };
}

export function loadPageDetails(pageId) {
  return (dispatch) => {
    var promiseCategories = new Promise ((resolve) => {
      superagent
        .get(API_BASE)
        .query({
          format: 'json',
          action: 'query',
          prop: 'categories',
          pageids: pageId
        })
        .use(superagentJsonp)
        .end((err, resp)=> {
          const categories = resp.body.query.pages[pageId].categories;
          const categoriesReceived = categories ?
            categories.map((item, index) => {
              return {
                title: item.title
              };
            }) :
            null;
          resolve(categoriesReceived);
        });
    });

    var promiseImage = new Promise ((resolve) => {
      superagent
        .get(API_BASE)
        .query({
          format: 'json',
          action: 'query',
          prop: 'pageimages',
          piprop: 'thumbnail',
          pageids: pageId
        })
        .use(superagentJsonp)
        .end((err, resp)=> {
          const image = resp.body.query.pages[pageId].thumbnail;
          resolve(image);
        });
    });

    Promise.all([promiseCategories, promiseImage])
      .then(values => dispatch(
        returnPageDetails(pageId, values[0], values[1])
      ));
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
