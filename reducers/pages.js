import {
  LOAD_RANDOM_PAGES,
  ADD_PAGE,
  DELETE_PAGE,
  EDIT_PAGE,
  BOOKMARK_PAGE,
  BOOKMARK_ALL,
  EMPTY_BOOKMARKS
} from '../constants/ActionTypes';

const initialState = [{
  text: 'Sample page',
  bookmarked: false,
  id: 0
}];

export default function pages(state = initialState, action) {
  switch (action.type) {
  case LOAD_RANDOM_PAGES:
    return [...action.data, ...state];

  case DELETE_PAGE:
    return state.filter(page =>
      page.id !== action.id
    );

  case EDIT_PAGE:
    return state.map(page =>
      page.id === action.id ?
        Object.assign({}, page, { text: action.text }) :
        page
    );

  case BOOKMARK_PAGE:
    return state.map(page =>
      page.id === action.id ?
        Object.assign({}, page, { bookmarked: !page.bookmarked }) :
        page
    );

  case BOOKMARK_ALL:
    const areAllMarked = state.every(page => page.bookmarked);
    return state.map(page => Object.assign({}, page, {
      bookmarked: !areAllMarked
    }));

  case EMPTY_BOOKMARKS:
    return state.filter(page => page.bookmarked === false);

  default:
    return state;
  }
}
