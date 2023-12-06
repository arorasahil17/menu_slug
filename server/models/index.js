const { Schema, model } = require("mongoose");

const menuSchema = new Schema({
  name: { type: String, required: true },
  slugs: { type: Array },
});

const Menus = model("menu", menuSchema);

module.exports = Menus;
