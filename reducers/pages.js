import { ADD_PAGE, DELETE_PAGE, EDIT_PAGE, ARCHIVE_PAGE, ARCHIVE_ALL, EMPTY_ARCHIVE } from '../constants/ActionTypes';

const initialState = [{
  text: 'Sample page',
  archived: false,
  id: 0
}];

export default function pages(state = initialState, action) {
  switch (action.type) {
  case ADD_PAGE:
    return [{
      id: state.reduce(
        (maxId, page) => Math.max(page.id, maxId),
        -1
      ) + 1,
      archived: false,
      text: action.text
    }, ...state];

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

  case ARCHIVE_PAGE:
    return state.map(page =>
      page.id === action.id ?
        Object.assign({}, page, { archived: !page.archived }) :
        page
    );

  case ARCHIVE_ALL:
    const areAllMarked = state.every(page => page.archived);
    return state.map(page => Object.assign({}, page, {
      archived: !areAllMarked
    }));

  case EMPTY_ARCHIVE:
    return state.filter(page => page.archived === false);

  default:
    return state;
  }
}
