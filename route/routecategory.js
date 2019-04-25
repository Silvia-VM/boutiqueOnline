const express = require("express");
const router = express.Router();
const Category = require("../models/modelCategory");

//CATEGORY  **Create**
router.post("/category/create", async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.body.title,
      description: req.body.description,
      department: req.body.department
    });
    await newCategory.save();
    return res.json({
      title: req.body.title,
      description: req.body.description,
      department: req.body.department
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
//**Read-lire**
router.get("/category", async (req, res) => {
  try {
    const result = await Category.find().populate("department");
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// **Update-mise a jour**
router.post("/category/update", async (req, res) => {
  try {
    if (req.query.id && req.body.title && req.body.description && req.body.id) {
      const category = await Category.findById(req.query.id);
      category.title = req.body.title;
      category.description = req.body.description;
      category.department = req.body.id;
      await category.save();
      res.json({ message: "Updated category" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// **Delete**
router.post("/category/delete", async (req, res) => {
  try {
    if (req.body.id) {
      const category = await Category.findById(req.body.id);
      await category.remove();
      res.json({ message: "Removed category" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
