const express = require("express");

const router = express.Router();

const {
  getAllCategories,
} = require("../../../Controllers/category.controller");

router.get("/all", getAllCategories);

module.exports = router;