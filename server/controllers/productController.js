const Product = require('../models/Product');
const { Sequelize } = require('sequelize');

exports.getProducts = async (req, res) => {
  try {
    const lang = req.query.lang === 'ar' ? 'ar' : 'en';

    // Using Projection (Attributes) to only return requested language
    const products = await Product.findAll({
      attributes: [
        'id',
        [Sequelize.col(`Product.name_${lang}`), 'name'],
        [Sequelize.col(`Product.description_${lang}`), 'description'],
        'price',
        'slug',
        'images',
        'rating',
        'reviews_count',
        'created_at'
      ],
      include: [
        {
          model: require('../models/Category'),
          as: 'category',
          attributes: [
            'id',
            [Sequelize.col(`name_${lang}`), 'name'],
            'slug'
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      count: products.length,
      language: lang,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.getProductByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    const lang = req.query.lang === 'ar' ? 'ar' : 'en';

    // Check if identifier is a UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);
    const whereClause = isUuid ? { id: identifier } : { slug: identifier };

    const product = await Product.findOne({
      where: whereClause,
      attributes: [
        'id',
        [Sequelize.col(`Product.name_${lang}`), 'name'],
        [Sequelize.col(`Product.description_${lang}`), 'description'],
        'price',
        'slug',
        'images',
        'rating',
        'reviews_count'
      ],
      include: [
        {
          model: require('../models/Category'),
          as: 'category',
          attributes: [
            'id',
            [Sequelize.col(`name_${lang}`), 'name'],
            'slug'
          ]
        }
      ]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
