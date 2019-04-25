const express = require("express");
const router = express.Router();
const Product = require("../models/modelProduct");
//PRODUCT **Create**
router.post("/product/create", async (req, res) => {
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
router.get("/product", async (req, res) => {
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
router.post("/product/update", async (req, res) => {
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
    router.post("/product/delete", async (req, res) => {
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
module.exports = router;
