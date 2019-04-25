const express = require("express");
const router = express.Router();

const Department = require("../models/modelDepartment");

// DEPARTMENT// **Create**
router.post("/department/create", async (req, res) => {
  try {
    const newDepartment = new Department({
      title: req.body.title
    });
    await newDepartment.save();
    return res.json({ title: req.body.title });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// **Read-lire**
router.get("/department", async (req, res) => {
  try {
    const title = await Department.find();
    return res.json(title);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// **Update-mise a jour**
router.post("/department/update", async (req, res) => {
  try {
    if (req.body.id && req.body.title) {
      const department = await Department.findById(req.body.id);
      department.title = req.body.title;
      await department.save();
      res.json({ message: "Updated title department" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// **Delete**
router.post("/department/delete", async (req, res) => {
  try {
    if (req.body.id) {
      const department = await Department.findById(req.body.id)
        .find()
        .populate("department");
      await department.remove();
      res.json({ message: "Removed department" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
