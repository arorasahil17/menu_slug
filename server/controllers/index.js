const Menus = require("../models");

const addMenu = async (req, res) => {
  const { name, slugs } = req.body;
  if (!name) {
    return res
      .status(401)
      .json({ success: false, message: "Name is required" });
  }
  try {
    const newMenu = new Menus({
      name,
    });
    const savedMenu = await newMenu.save();
    res.status(201).json({
      success: true,
      message: "New Menu added successfully!",
      menu: savedMenu,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Something went wrong ${error}` });
  }
};

const getMenu = async (req, res) => {
  try {
    const menus = await Menus.find({});
    res.status(200).json({ success: true, menus });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Something went wrong ${error}` });
  }
};

const addSlugsToMenu = async (req, res) => {
  const { slug } = req.body;
  const { menuId } = req.params;
  try {
    const menu = await Menus.findById(menuId);
    menu.slugs.push(slug);
    await menu.save();
    res
      .status(200)
      .json({ success: true, message: "Slugs added Successfully!", menu });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Something went wrong ${error}` });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenu = await Menus.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted the menu" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Something went wrong ${error}` });
  }
};

const editMenu = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedMenu = await Menus.findByIdAndUpdate(
      id,
      { $set: { name } },
      { new: true }
    );
    if (!updatedMenu)
      return res.json({ success: false, message: "No Menu Found!" });
    res
      .status(200)
      .json({ success: true, message: "Updated Menu Name", updatedMenu });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Something went wrong ${error}` });
  }
};

module.exports = { addMenu, getMenu, addSlugsToMenu, deleteMenu, editMenu };
