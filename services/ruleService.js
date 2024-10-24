const astService = require("./astService");

exports.createRule = (ruleString) => {
  console.log("create rule is called");
  return astService.parseRuleString(ruleString);
};

exports.combineRules = (asts) => {
  console.log("asts in combine rules", asts);
  return astService.combineASTs(asts);
};

exports.evaluateRule = (ast, data) => {
  return astService.evaluateAST(ast, data);
};
