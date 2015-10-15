import {
  LOAD_RANDOM_PAGES,
  ADD_PAGE,
  DELETE_PAGE,
  BOOKMARK_PAGE,
  EMPTY_BOOKMARKS
} from '../constants/ActionTypes';

const storedBookmarks = window.localStorage.bookmarked != null ?
  window.JSON.parse(window.localStorage.bookmarked) :
  null;

const initialState = storedBookmarks || [];

export default function pages(state = initialState, action) {
  switch (action.type) {
  case LOAD_RANDOM_PAGES:
    return [...action.data, ...state];

  case DELETE_PAGE:
    return state.filter(page => {
      if (page.id !== action.id) {
        if (page.bookmarked) {
          window.localStorage.bookmarked = window.JSON.stringify(
            window.JSON.parse(
              window.localStorage.bookmarked
            ).filter(page => page.id !== action.id)
          );
        }
        return true;
      }
      return false;
    });

  case BOOKMARK_PAGE:
    const newState = state.map(page =>
      page.id === action.id ?
        Object.assign({}, page, { bookmarked: !page.bookmarked }) :
        page
    );
    window.localStorage.bookmarked = window.JSON.stringify(
      newState.filter(page => page.bookmarked !== false)
    );
    return newState;

  case EMPTY_BOOKMARKS:
    window.localStorage.removeItem('bookmarked');
    return state.filter(page => page.bookmarked === false);

  default:
    return state;
  }
}
