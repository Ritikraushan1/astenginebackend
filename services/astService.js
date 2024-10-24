class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type;
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

function hasTopLevelOperator(ruleString) {
  let depth = 0;
  for (let i = 0; i < ruleString.length; i++) {
    const char = ruleString[i];

    if (char === "(") depth++;
    if (char === ")") depth--;

    if (
      depth === 0 &&
      (ruleString.slice(i, i + 3) === "AND" ||
        ruleString.slice(i, i + 2) === "OR")
    ) {
      return true;
    }
  }
  return false;
}

function parseRuleString(ruleString) {
  ruleString = ruleString.trim();

  while (
    ruleString.startsWith("(") &&
    ruleString.endsWith(")") &&
    !hasTopLevelOperator(ruleString)
  ) {
    ruleString = ruleString.slice(1, -1).trim();
  }

  let depth = 0;
  let operator = null;
  let splitIndex = -1;

  for (let i = 0; i < ruleString.length; i++) {
    const char = ruleString[i];

    if (char === "(") depth++;
    if (char === ")") depth--;

    if (
      depth === 0 &&
      (ruleString.slice(i, i + 3) === "AND" ||
        ruleString.slice(i, i + 2) === "OR")
    ) {
      operator = ruleString.slice(i, i + 3).trim();
      splitIndex = i;
      break;
    }
  }

  if (splitIndex === -1) {
    return new Node("operand", ruleString.trim());
  }

  const leftPart = ruleString.slice(0, splitIndex).trim();
  const rightPart = ruleString.slice(splitIndex + operator.length).trim();

  return new Node(
    "operator",
    parseRuleString(leftPart),
    parseRuleString(rightPart),
    operator
  );
}

exports.parseRuleString = (ruleString) => {
  console.log("Parsing rule:", ruleString);

  try {
    const ast = parseRuleString(ruleString);
    return ast;
  } catch (error) {
    console.error("Error parsing rule:", error.message);
    throw error;
  }
};

exports.evaluateAST = (rule, data) => {
  const sanitizedRule = rule.replace(/=/g, "==="); // Replace '=' with '==='

  const evaluatedRule = sanitizedRule
    .replace(/AND/g, "&&")
    .replace(/OR/g, "||")
    .replace(/experience/g, Number(data.experience))
    .replace(/age/g, Number(data.age))
    .replace(/salary/g, Number(data.salary))
    .replace(/department/g, JSON.stringify(data.department));

  try {
    const result = new Function(`return ${evaluatedRule}`)();
    return result;
  } catch (error) {
    console.error("Error evaluating rule:", error);
    return false; // Return false if there's an error in the rule
  }
};
