const { declare } = require('@babel/helper-plugin-utils');
const importModule = require('@babel/helper-module-imports');

const autoLoggerPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);

  return {
      visitor: {
          Program: {
              enter (path, state) {
                  path.traverse({
                      ImportDeclaration (curPath) {
                          const requirePath = curPath.get('source').node.value;
                          if (requirePath === options.moduleName) { // 如果有引入配置的模块(logger) 并设置 loggerImportId
                              const specifierPath = curPath.get('specifiers.0');
                              // 几种 import 情况：
                              // isImportSpecifier => import { cc } from 'cc';
                              // isImportDefaultSpecifier => import aa from 'aa';
                              // isImportNamespaceSpecifier => import * as bb from 'bb';
                              if (specifierPath.isImportSpecifier() || specifierPath.isImportDefaultSpecifier()) {
                                  state.loggerImportId = specifierPath.toString();
                              } else if(specifierPath.isImportNamespaceSpecifier()) {
                                  state.loggerImportId = specifierPath.get('local').toString();
                              }
                              curPath.stop(); // 提前中止
                          }
                      }
                  });
                  if (!state.loggerImportId) { // 如果没有引入过 就利用 @babel/helper-module-imports 自己创建引入
                      state.loggerImportId  = importModule.addDefault(path, 'logger',{
                          nameHint: path.scope.generateUid('logger')
                      }).name;
                  }
                  state.loggerAST = api.template.statement(`${state.loggerImportId}()`)();
              }
          },
          'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'(path, state) {
              const bodyPath = path.get('body');
              if (bodyPath.isBlockStatement()) {
                  bodyPath.node.body.unshift(state.loggerAST);
              } else {
                  const ast = api.template.statement(`{${state.loggerImportId}();return PREV_BODY;}`)({PREV_BODY: bodyPath.node});
                  bodyPath.replaceWith(ast);
              }
          }
      }
  }
});

module.exports = autoLoggerPlugin;