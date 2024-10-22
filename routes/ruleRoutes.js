const express = require("express");
const router = express.Router();
const ruleController = require("../controller/ruleController");

router.post("/create-rule", ruleController.createRule);
router.get("/all-rule", ruleController.getRules);

router.post("/combine-rules", ruleController.combineRules);

router.post("/evaluate-rule", ruleController.evaluateRule);

module.exports = router;
