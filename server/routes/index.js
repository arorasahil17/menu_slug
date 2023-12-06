const {
  addMenu,
  getMenu,
  addSlugsToMenu,
  deleteMenu,
  editMenu,
} = require("../controllers");

const router = require("express").Router();

router
  .post("/add-menu", addMenu)
  .get("/menus", getMenu)
  .patch("/add-slugs/:menuId", addSlugsToMenu)
  .delete("/delete-menu/:id", deleteMenu)
  .patch("/edit-menu/:id", editMenu);

module.exports = router;
