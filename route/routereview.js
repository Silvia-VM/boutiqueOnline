const express = require("express");
const router = express.Router();
const Review = require("../models/modelReview");
router.post("/review/create", async (req, res) => {
  try {
    const newReviews = new Review({
      product: req.body.product,
      rating: req.body.rating,
      comment: req.body.comment,
      username: req.body.username
    });
    const product = await Product.findById(req.body.product);
    if (product.reviews === undefined) {
      product.reviews = [];
    }
    Reviews = await newReviews.find().populate("product");
    product.reviews.push(reviews); // `review` représente l'avis qui vient d'être créé
    await product.save();
    await newReviews.save();

    return res.json(newReviews);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
module.exports = router;
