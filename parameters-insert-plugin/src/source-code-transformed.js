console.log("/Users/jonie/learning/babel-learning/parameters-insert-plugin/src/source-code.js: (1, 0)")
console.log(1);
function func() {
  console.log("/Users/jonie/learning/babel-learning/parameters-insert-plugin/src/source-code.js: (4, 4)")
  console.info(2);
}
export default class Clazz {
  say() {
    console.log("/Users/jonie/learning/babel-learning/parameters-insert-plugin/src/source-code.js: (9, 8)")
    console.debug(3);
  }
  render() {
    return <div>{[console.log("/Users/jonie/learning/babel-learning/parameters-insert-plugin/src/source-code.js: (12, 21)"), console.error(4)]}</div>;
  }
}