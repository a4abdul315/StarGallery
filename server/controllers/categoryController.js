const Category = require('../models/Category');
const { Sequelize } = require('sequelize');

exports.getCategories = async (req, res) => {
  try {
    const lang = req.query.lang === 'ar' ? 'ar' : 'en';

    // Using Projection (Attributes) for multilingual names
    const categories = await Category.findAll({
      attributes: [
        'id',
        [Sequelize.col(`name_${lang}`), 'name'],
        'slug',
        'image_url'
      ],
      order: [[`name_${lang}`, 'ASC']]
    });

    res.json({
      success: true,
      count: categories.length,
      language: lang,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
