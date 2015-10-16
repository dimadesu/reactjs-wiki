# reactjs-wiki

Single-page app utilizing Webpack, React.js, Redux, ES6, WikiMedia API.

10 random pages are loaded on initial load.

User can delete or bookmark page inside app.

When all pages are bookmarked or deleted new set of random pages will be loaded and rendered on top of the list.

## Features
- Facebook React.js with Redux as Flux architecture implementation
  - react-redux - glue to bind to store state and actions with React
  - react-thunk - Redux middleware to allow asynchronicity (working with AJAX requests)
  - react-bootstrap - collection of Twitter Bootstrap components conveted to React + styles
- Written in ES6 (ES2015) thanks to Babel
- HTML and styles based on TODOMVC https://github.com/tastejs/todomvc
- Webpack hot module replacement is helpful during developing. When source files are changed, rebuild and new modules replace old ones in the browser keeping the state of the app without triggering full page reload
- Data is received from live API using JSONP
- Bookmarked data is stored to browser's local storage, which allows restarting the browser without loosing data

## Starting app
- `npm i`
- `npm start`

## Running tests

### Unix

`npm run test:unix`

### Windows

`npm run test:win`

## Improvement ideas

- Technical features
  - Router
  - Support for browser history
  - Add AirBnB linter
- Features
  - Organize bookmarks in folders
  - Display loading icons while fetching data
- UI
  - Replace checkbox with a star icon
  - Support for different resolutions (responsiveness with media queries)
- Fix tests
- Optimizations
  - Don't save extra data to local storage
  - Removed unused code (style classes)
- Refactor
  - Abstract AJAX requests
  - Migrate styles to preprocessor
  - Folder structure

## Tested

- Mac OS X Yosemite v10.10.4, 64-bit, Google Chrome 45, Node.js v4.1.0
- Windows 7, 64-bit, Google Chrome

