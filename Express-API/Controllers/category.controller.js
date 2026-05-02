const {
  fetchCategories,
} = require("../Services/category.service");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await fetchCategories();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};