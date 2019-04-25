const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/boutiqueOnline", {
  useNewUrlParser: true
});

const Department = mongoose.model("Department", {
  title: String
});

const Category = mongoose.model("Category", {
  title: String,
  description: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }
});

const Product = mongoose.model("Product", {
  title: String,
  description: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});
// DEPARTMENT// **Create**
app.post("/department/create", async (req, res) => {
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
app.get("/department", async (req, res) => {
  try {
    const title = await Department.find();
    return res.json(title);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// **Update-mise a jour**
app.post("/department/update", async (req, res) => {
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
app.post("/department/delete", async (req, res) => {
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
//CATEGORY  **Create**
app.post("/category/create", async (req, res) => {
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
app.get("/category", async (req, res) => {
  try {
    const result = await Category.find().populate("department");
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// **Update-mise a jour**
app.post("/category/update", async (req, res) => {
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
app.post("/category/delete", async (req, res) => {
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
//PRODUCT **Create**
app.post("/product/create", async (req, res) => {
  try {
    const newproduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });
    await newproduct.save();
    return res.json({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
//**Read-lire**
app.get("/product", async (req, res) => {
  try {
    const filters = {};
    if (req.query.priceMin || req.query.priceMax) {
      filters.price = {};
    }
    if (req.query.priceMin) {
      filters.price.$gte = req.query.priceMin;
      console.log(filters);
    }
    if (req.query.priceMax) {
      filters.price.$lte = req.query.priceMax;
    }
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }
    const search = Product.find(filters).populate({
      path: "category"
    });

    if (req.query.sort === "price-asc") {
      search.sort({ price: 1 });
    } else if (req.query.sort === "price-desc") {
      search.sort({ price: -1 });
    }

    const products = await search;
    console.log(filters);
    res.json(products);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// **Update-mise a jour**
app.post("/product/update", async (req, res) => {
  try {
    if (
      req.body.title &&
      req.body.description &&
      req.body.price &&
      req.body.category
    ) {
      const product = await Product.findById(req.body.id);
      product.title = req.body.title;
      product.description = req.body.description;
      product.price = req.body.price;
      product.category = req.body.category;
      await category.save();
      res.json({ message: "Updated product" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
    // **Delete**
    app.post("/product/delete", async (req, res) => {
      try {
        if (req.body.id) {
          const product = await Product.findById(req.body.id)
            .find()
            .populate("product");
          await product.remove();
          res.json({ message: "Removed product" });
        } else {
          res.status(400).json({ message: "Missing id" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started");
});
