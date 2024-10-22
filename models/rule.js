const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
  ast: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("rule", ruleSchema);
