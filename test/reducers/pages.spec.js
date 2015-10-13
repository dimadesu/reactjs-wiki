import expect from 'expect';
import pages from '../../reducers/pages';
import * as types from '../../constants/ActionTypes';

describe('pages reducer', () => {
  it('should handle initial state', () => {
    expect(
      pages(undefined, {})
    ).toEqual([{
      text: 'Sample page',
      archived: false,
      id: 0
    }]);
  });

  it('should handle ADD_PAGE', () => {
    expect(
      pages([], {
        type: types.ADD_PAGE,
        text: 'Run the tests'
      })
    ).toEqual([{
      text: 'Run the tests',
      archived: false,
      id: 0
    }]);

    expect(
      pages([{
        text: 'Sample page',
        archived: false,
        id: 0
      }], {
        type: types.ADD_PAGE,
        text: 'Run the tests'
      })
    ).toEqual([{
      text: 'Run the tests',
      archived: false,
      id: 1
    }, {
      text: 'Sample page',
      archived: false,
      id: 0
    }]);

    expect(
      pages([{
        text: 'Run the tests',
        archived: false,
        id: 1
      }, {
        text: 'Sample page',
        archived: false,
        id: 0
      }], {
        type: types.ADD_PAGE,
        text: 'Fix the tests'
      })
    ).toEqual([{
      text: 'Fix the tests',
      archived: false,
      id: 2
    }, {
      text: 'Run the tests',
      archived: false,
      id: 1
    }, {
      text: 'Sample page',
      archived: false,
      id: 0
    }]);
  });

  it('should handle DELETE_PAGE', () => {
    expect(
      pages([{
        text: 'Run the tests',
        archived: false,
        id: 1
      }, {
        text: 'Sample page',
        archived: false,
        id: 0
      }], {
        type: types.DELETE_PAGE,
        id: 1
      })
    ).toEqual([{
      text: 'Sample page',
      archived: false,
      id: 0
    }]);
  });

  it('should handle EDIT_PAGE', () => {
    expect(
      pages([{
        text: 'Run the tests',
        archived: false,
        id: 1
      }, {
        text: 'Sample page',
        archived: false,
        id: 0
      }], {
        type: types.EDIT_PAGE,
        text: 'Fix the tests',
        id: 1
      })
    ).toEqual([{
      text: 'Fix the tests',
      archived: false,
      id: 1
    }, {
      text: 'Sample page',
      archived: false,
      id: 0
    }]);
  });

  it('should handle ARCHIVE_PAGE', () => {
    expect(
      pages([{
        text: 'Run the tests',
        archived: false,
        id: 1
      }, {
        text: 'Sample page',
        archived: false,
        id: 0
      }], {
        type: types.ARCHIVE_PAGE,
        id: 1
      })
    ).toEqual([{
      text: 'Run the tests',
      archived: true,
      id: 1
    }, {
      text: 'Sample page',
      archived: false,
      id: 0
    }]);
  });

  it('should handle ARCHIVE_ALL', () => {
    expect(
      pages([{
        text: 'Run the tests',
        archived: true,
        id: 1
      }, {
        text: 'Sample page',
        archived: false,
        id: 0
      }], {
        type: types.ARCHIVE_ALL
      })
    ).toEqual([{
      text: 'Run the tests',
      archived: true,
      id: 1
    }, {
      text: 'Sample page',
      archived: true,
      id: 0
    }]);

    // Unmark if all pages are currently archived
    expect(
      pages([{
        text: 'Run the tests',
        archived: true,
        id: 1
      }, {
        text: 'Sample page',
        archived: true,
        id: 0
      }], {
        type: types.ARCHIVE_ALL
      })
    ).toEqual([{
      text: 'Run the tests',
      archived: false,
      id: 1
    }, {
      text: 'Sample page',
      archived: false,
      id: 0
    }]);
  });

  it('should handle EMPTY_ARCHIVE', () => {
    expect(
      pages([{
        text: 'Run the tests',
        archived: true,
        id: 1
      }, {
        text: 'Sample page',
        archived: false,
        id: 0
      }], {
        type: types.EMPTY_ARCHIVE
      })
    ).toEqual([{
      text: 'Sample page',
      archived: false,
      id: 0
    }]);
  });

  it('should not generate duplicate ids after EMPTY_ARCHIVE', () => {
    expect(
      [{
        type: types.ARCHIVE_PAGE,
        id: 0
      }, {
        type: types.EMPTY_ARCHIVE
      }, {
        type: types.ADD_PAGE,
        text: 'Write more tests'
      }].reduce(pages, [{
        id: 0,
        archived: false,
        text: 'Sample page'
      }, {
        id: 1,
        archived: false,
        text: 'Write tests'
      }])
    ).toEqual([{
      text: 'Write more tests',
      archived: false,
      id: 2
    }, {
      text: 'Write tests',
      archived: false,
      id: 1
    }]);
  });
});
