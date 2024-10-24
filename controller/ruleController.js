const Rule = require("../models/rule");
const ruleService = require("../services/ruleService");

exports.createRule = async (req, res) => {
  console.log("create rule is called");
  const { ruleString } = req.body;
  try {
    const ast = ruleService.createRule(ruleString);
    console.log("ast is here", JSON.stringify(ast));
    const newRule = new Rule({ ast });
    await newRule.save();
    res.status(201).json({ success: true, rule: newRule });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.combineRules = async (req, res) => {
  console.log("combine rules body", req.body);
  const { ruleIds } = req.body;
  try {
    const rules = await Rule.find({ _id: { $in: ruleIds } });
    const combinedAST = ruleService.combineRules(rules.map((r) => r.ast));
    res.status(200).json({ success: true, combinedAST });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.evaluateRule = async (req, res) => {
  const { rule, data } = req.body;
  try {
    // const rule = await Rule.findById(rule);
    const result = ruleService.evaluateRule(rule, data);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
