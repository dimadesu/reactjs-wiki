import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
// Allows to test DOM without browser
import jsdom from 'mocha-jsdom';

export default function jsdomReact() {
  jsdom({
    skipWindowCheck: true
  });

  // TODO: Improve this dirty fix
  GLOBAL.window = jsdom;

  function FakeLocalStorage () {}
  FakeLocalStorage.prototype.removeItem = (key) => {
    delete FakeLocalStorage[key];
  };
  window.localStorage = new FakeLocalStorage();

  function FakeJson () {}
  FakeJson.prototype.stringify = (key) => {
    return key;
  };
  FakeJson.prototype.parse = (key) => {
    return key;
  };
  window.JSON = new FakeJson();

  ExecutionEnvironment.canUseDOM = true;
}
