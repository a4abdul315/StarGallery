import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'ar';

const EN: Record<string, string> = {
  ourLocation: 'Our Location', cashOnDelivery: 'Cash on Delivery',
  freeDelivery: 'Free Delivery', signInDelivery: 'Sign-in delivery',
  getMartApp: 'Get Star Gallery Mart App',
  installments: '4 interest-free installments of AED 3.49 with',
  deliverTo: 'Deliver to', dubai: 'Dubai',
  searchPlaceholder: 'What are you looking for?',
  account: 'Account', wishlist: 'Wishlist', cart: 'Cart',
  allCategories: 'All Categories', electronics: 'Electronics',
  homeKitchen: 'Home & Kitchen', carAccessories: 'Car Accessories',
  season: 'Season', buyAgain: 'Buy Again', browsingHistory: 'Browsing History',
  categoryName: 'Category Name', forKids: 'For Kids',
  personalCare: 'Personal Care', healthCare: 'Health Care',
  fashion: 'Fashion', smartWatches: 'Smart Watches', sports: 'Sports',
  computers: 'Computers', cashOnDeliveryBadge: 'Cash On Delivery',
  viewMore: 'View More', regularFit: 'Regular Fit Slogan Regular Fit',
  fastShipping: 'Fast Shipping', shippingMethods: 'shipping methods',
  secureTransactions: 'Secure Transactions', support247: '24/7 Support',
  connectWithUs: 'Connect With Us', phoneNumber: 'Phone Number', email: 'E-mail',
  mobileApps: 'Shopping Anytime, Anywhere!',
  followUs: 'Follow us for exclusive deals',
  contactUs: 'Contact Us', socialMediaInfluencers: 'Social Media Influencers',
  privacyPolicy: 'Privacy Policy', termsConditions: 'Terms & Conditions',
  returnsRefunds: 'Returns & Refunds', serviceWarranty: 'Service & Warranty',
  bulkQuotation: 'Bulk Quotation Policy',
  copyright: '© 2025 star gallery mart. All rights reserved.',
  mobileCategories: 'Categories', mobileBrands: 'Brands',
  mobileHome: 'Home', mobileAccount: 'Account', mobileCart: 'Cart',
  mobileAccessories: 'Mobile & Accessories', tabletsAccessories: 'Tablets & Accessories',
  computerAccessories: 'Computer & Accessories', tvMonitors: 'TV & Monitors',
  speakersMicrophones: 'Speakers and Microphones', weightScales: 'Weight and Scales',
  kitchenAppliances: 'Kitchen Appliances', homeAppliances: 'Home Appliances',
  lights: 'Lights', coffeeTea: 'Coffee & Tea', toolsEquipment: 'Tools & Equipment',
  bathroomFixtures: 'Bathroom Fixtures', jumpStarters: 'Jump Starters',
  carVideoReceivers: 'Car Video Receivers', airCompressors: 'Air Compressors',
  carElectricKettles: 'Car Electric Kettles', carMobileHolders: 'Car Mobile Holders',
  carCleaningKits: 'Car Cleaning Kits', toggleLang: 'عربي',
  off: 'off',
}

const AR: Record<string, string> = {
  ourLocation: 'موقعنا', cashOnDelivery: 'الدفع عند الاستلام',
  freeDelivery: 'توصيل مجاني', signInDelivery: 'تسجيل الدخول للتوصيل',
  getMartApp: 'احصل على تطبيق ستار غاليري مارت',
  installments: '4 أقساط بدون فوائد بقيمة 3.49 درهم مع',
  deliverTo: 'توصيل إلى', dubai: 'دبي',
  searchPlaceholder: 'ماذا تبحث عن؟',
  account: 'الحساب', wishlist: 'المفضلة', cart: 'السلة',
  allCategories: 'جميع الفئات', electronics: 'الإلكترونيات',
  homeKitchen: 'المنزل والمطبخ', carAccessories: 'إكسسوارات السيارات',
  season: 'الموسم', buyAgain: 'اشتر مجدداً', browsingHistory: 'سجل التصفح',
  categoryName: 'اسم الفئة', forKids: 'للأطفال',
  personalCare: 'العناية الشخصية', healthCare: 'الرعاية الصحية',
  fashion: 'الأزياء', smartWatches: 'الساعات الذكية', sports: 'الرياضة',
  computers: 'الحاسوب', cashOnDeliveryBadge: 'الدفع عند الاستلام',
  viewMore: 'عرض المزيد', regularFit: 'منتج قياسي مناسب',
  fastShipping: 'شحن سريع', shippingMethods: 'طرق الشحن',
  secureTransactions: 'معاملات آمنة', support247: 'دعم 24/7',
  connectWithUs: 'تواصل معنا', phoneNumber: 'رقم الهاتف', email: 'البريد الإلكتروني',
  mobileApps: 'تسوّق في أي وقت وأي مكان!',
  followUs: 'تابعنا للحصول على عروض حصرية',
  contactUs: 'اتصل بنا', socialMediaInfluencers: 'المؤثرون على وسائل التواصل',
  privacyPolicy: 'سياسة الخصوصية', termsConditions: 'الشروط والأحكام',
  returnsRefunds: 'الإرجاع والاسترداد', serviceWarranty: 'الخدمة والضمان',
  bulkQuotation: 'سياسة عروض الأسعار',
  copyright: '© 2025 ستار غاليري مارت. جميع الحقوق محفوظة.',
  mobileCategories: 'الفئات', mobileBrands: 'الماركات',
  mobileHome: 'الرئيسية', mobileAccount: 'الحساب', mobileCart: 'السلة',
  mobileAccessories: 'الجوال والإكسسوارات', tabletsAccessories: 'الأجهزة اللوحية',
  computerAccessories: 'الحاسب والإكسسوارات', tvMonitors: 'التلفاز والشاشات',
  speakersMicrophones: 'مكبرات الصوت', weightScales: 'الأوزان والموازين',
  kitchenAppliances: 'الأجهزة المطبخية', homeAppliances: 'الأجهزة المنزلية',
  lights: 'الإضاءة', coffeeTea: 'القهوة والشاي', toolsEquipment: 'الأدوات والمعدات',
  bathroomFixtures: 'تركيبات الحمام', jumpStarters: 'وصلات بدء التشغيل',
  carVideoReceivers: 'مستقبلات الفيديو', airCompressors: 'ضواغط الهواء',
  carElectricKettles: 'الغلايات الكهربائية', carMobileHolders: 'حاملات الجوال',
  carCleaningKits: 'أدوات تنظيف السيارة', toggleLang: 'English',
  off: 'خصم',
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private langSubject = new BehaviorSubject<Language>('en');
  lang$ = this.langSubject.asObservable();

  get currentLang(): Language { return this.langSubject.value; }
  get isRtl(): boolean { return this.langSubject.value === 'ar'; }

  toggle(): void {
    const next: Language = this.langSubject.value === 'en' ? 'ar' : 'en';
    this.langSubject.next(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  }

  t(key: string): string {
    const map = this.currentLang === 'ar' ? AR : EN;
    return map[key] ?? key;
  }
}
