const express = require("express");
const router = express.Router();
const product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    //this determines what will happen when you do a general get request to /products
    const products = await product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

// this submits a product
router.post("/", async (req, res) => {
  console.log(req.body);
  const post = new product({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedProduct = await post.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//this gets a specific product by ID
router.get("/:productId", async (req, res) => {
  try {
    const foundProduct = await product.findById(req.params.productId);
    res.json(foundProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a post
router.delete("/:productId", async (req, res) => {
  try {
    const removedProduct = await product.remove({ _id: req.params.productId });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});


// updates a product
router.patch("/:productId", async (req, res) => {
  try {
    const updatedProduct = await product.updateOne(
      { _id: req.params.productId },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//exporting the router
module.exports = router;
