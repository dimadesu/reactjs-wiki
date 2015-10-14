import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
// Allows to test DOM without browser
import jsdom from 'mocha-jsdom';

export default function jsdomReact() {
  jsdom();
  ExecutionEnvironment.canUseDOM = true;
}
