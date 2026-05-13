const sequelize = require('./config/database');
const Product = require('./models/Product');
const Category = require('./models/Category');

const mockCategories = [
  {
    name_en: 'Electronics',
    name_ar: 'إلكترونيات',
    slug: 'electronics',
    image_url: 'assets/cat-electronics.png'
  },
  {
    name_en: 'Mobile Accessories',
    name_ar: 'ملحقات الهاتف',
    slug: 'mobile-accessories',
    image_url: 'assets/cat-mobiles.png'
  },
  {
    name_en: 'Wearables',
    name_ar: 'ساعات ذكية',
    slug: 'wearables',
    image_url: 'assets/cat-wearables.png'
  },
  {
    name_en: 'Audio',
    name_ar: 'أجهزة صوتية',
    slug: 'audio',
    image_url: 'assets/cat-audio.png'
  }
];

const mockProducts = (catMap) => [
  {
    name_en: 'Promate MagTag-15W MagSafe',
    name_ar: 'بروميت ماج تاج-15 واط ماج سيف',
    description_en: 'Fast wireless charging with MagSafe compatibility.',
    description_ar: 'شحن لاسلكي سريع متوافق مع ماج سيف.',
    price: 17.00,
    slug: 'promate-magtag-15w',
    images: ['assets/products/magtag-1.png'],
    rating: 4.5,
    reviews_count: 125,
    categoryId: catMap['mobile-accessories']
  },
  {
    name_en: 'Apple iPhone 15 Pro Max',
    name_ar: 'أبل آيفون 15 برو ماكس',
    description_en: 'The ultimate iPhone with Titanium design.',
    description_ar: 'الآيفون الأقوى بتصميم من التيتانيوم.',
    price: 4500.00,
    slug: 'iphone-15-pro-max',
    images: ['assets/products/iphone15-1.png'],
    rating: 4.9,
    reviews_count: 850,
    categoryId: catMap['electronics']
  },
  {
    name_en: 'Samsung Galaxy S24 Ultra',
    name_ar: 'سامسونج جالكسي إس 24 ألترا',
    description_en: 'Galaxy AI is here. Titanium build and 200MP camera.',
    description_ar: 'ذكاء جالكسي هنا. تصميم من التيتانيوم وكاميرا 200 ميجابكسل.',
    price: 4200.00,
    slug: 'samsung-s24-ultra',
    images: ['assets/products/s24-1.png'],
    rating: 4.8,
    reviews_count: 620,
    categoryId: catMap['electronics']
  },
  {
    name_en: 'Apple Watch Ultra 2',
    name_ar: 'أبل واتش ألترا 2',
    description_en: 'The most rugged and capable Apple Watch.',
    description_ar: 'ساعة أبل الأكثر متانة وقدرة على الإطلاق.',
    price: 3100.00,
    slug: 'apple-watch-ultra-2',
    images: ['assets/products/watch-ultra-1.png'],
    rating: 4.7,
    reviews_count: 310,
    categoryId: catMap['wearables']
  },
  {
    name_en: 'AirPods Pro (2nd Gen)',
    name_ar: 'إيربودز برو (الجيل الثاني)',
    description_en: 'Active Noise Cancellation and personalized Spatial Audio.',
    description_ar: 'إلغاء الضوضاء النشط وصوت مكاني مخصص.',
    price: 950.00,
    slug: 'airpods-pro-2',
    images: ['assets/products/airpods-1.png'],
    rating: 4.9,
    reviews_count: 1200,
    categoryId: catMap['audio']
  },
  {
    name_en: 'Sony WH-1000XM5',
    name_ar: 'سوني WH-1000XM5',
    description_en: 'Industry-leading noise cancellation headphones.',
    description_ar: 'سماعات رأس رائدة في إلغاء الضوضاء.',
    price: 1300.00,
    slug: 'sony-wh1000xm5',
    images: ['assets/products/sony-1.png'],
    rating: 4.8,
    reviews_count: 450,
    categoryId: catMap['audio']
  }
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to seed...');
    
    await sequelize.sync({ force: true });
    console.log('Database wiped and synced.');

    const createdCategories = await Category.bulkCreate(mockCategories);
    console.log('Categories seeded.');

    const catMap = {};
    createdCategories.forEach(cat => {
      catMap[cat.slug] = cat.id;
    });

    await Product.bulkCreate(mockProducts(catMap));
    console.log('Products seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
