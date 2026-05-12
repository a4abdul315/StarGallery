import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, Carousel } from 'primeng/carousel';
import { Subject, takeUntil } from 'rxjs';
import { TranslationService } from '../../core/services/translation.service';

interface BrandBanner {
  id: number;
  name: string;
  tagline: string;
  taglineAr: string;
  logoUrl: string;
  bannerBg: string;
  mobileImageUrl?: string;
}

interface Product {
  id: number;
  brandId: number;
  name: string;
  nameAr: string;
  images: string[];
  activeImageIndex: number;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  cashOnDelivery: boolean;
  tabby: boolean;
  tamara: boolean;
  isWishlisted: boolean;
}

type Language = 'en' | 'ar';

const translations = {
  en: {
    off: 'OFF'
  },
  ar: {
    off: 'خصم'
  }
};

@Component({
  selector: 'app-brand-showcase',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './brand-showcase.component.html',
  styleUrls: ['./brand-showcase.component.css']
})
export class BrandShowcaseComponent implements OnInit, OnDestroy {
  @ViewChild('productCarousel') productCarousel!: Carousel;

  lang: Language = 'en';
  private destroy$ = new Subject<void>();
  translations = translations;

  banners: BrandBanner[] = [
    {
      id: 1,
      name: 'PROMATE',
      tagline: 'Innovation and Excellence',
      taglineAr: 'الابتكار والتميز',
      logoUrl: 'https://promate.net/cdn/shop/files/logo_black_180x.png?v=1613715103',
      bannerBg: 'url("assets/aclr.png") center/cover no-repeat',
      mobileImageUrl: 'assets/promatemobile.png'
    },
    {
      id: 2,
      name: 'SAMSUNG',
      tagline: 'Experience the Future',
      taglineAr: 'تجربة المستقبل',
      logoUrl: 'https://promate.net/cdn/shop/files/logo_black_180x.png?v=1613715103',
      bannerBg: 'url("assets/aclr.png") center/cover no-repeat',
      mobileImageUrl: 'assets/promatemobile.png'
    },
    {
      id: 3,
      name: 'APPLE',
      tagline: 'Think Different',
      taglineAr: 'فكر بشكل مختلف',
      logoUrl: 'https://promate.net/cdn/shop/files/logo_black_180x.png?v=1613715103',
      bannerBg: 'url("assets/aclr.png") center/cover no-repeat',
      mobileImageUrl: 'assets/promatemobile.png'
    }
  ];

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  productResponsive = [
    { breakpoint: '1536px', numVisible: 6, numScroll: 2 },
    { breakpoint: '1280px', numVisible: 5, numScroll: 2 },
    { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '480px', numVisible: 2, numScroll: 1 }
  ];

  constructor(public tr: TranslationService) {
    this.generateMockProducts();
  }

  ngOnInit(): void {
    this.filterProducts(1);
    this.tr.lang$.pipe(takeUntil(this.destroy$)).subscribe(l => this.lang = l);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBannerChange(event: any): void {
    const activeBanner = this.banners[event.page];
    if (activeBanner) {
      this.filterProducts(activeBanner.id);
      // Reset product carousel to first page
      if (this.productCarousel) {
        this.productCarousel.step(-1, 0);
      }
    }
  }

  filterProducts(brandId: number): void {
    this.filteredProducts = this.allProducts.filter(p => p.brandId === brandId);
  }

  toggleWishlist(productId: number): void {
    const prod = this.allProducts.find(p => p.id === productId);
    if (prod) prod.isWishlisted = !prod.isWishlisted;
  }

  setProductImage(product: Product, index: number, container: HTMLDivElement): void {
    product.activeImageIndex = index;
    container.scrollTo({
      left: index * container.offsetWidth,
      behavior: 'smooth'
    });
  }

  onProductImageScroll(event: any, product: Product): void {
    const element = event.target;
    const index = Math.round(element.scrollLeft / element.offsetWidth);
    if (product.activeImageIndex !== index) {
      product.activeImageIndex = index;
    }
  }

  private generateMockProducts(): void {
    const brands = [1, 2, 3];
    let id = 1;
    brands.forEach(brandId => {
      for (let i = 1; i <= 8; i++) {
        this.allProducts.push({
          id: id++,
          brandId,
          name: brandId === 1 ? 'Promate MagTag-15W MagSafe' : `Premium Gadget ${id}`,
          nameAr: brandId === 1 ? 'بروميت MagTag-15W MagSafe' : `أداة متميزة ${id}`,
          images: [
            'assets/16pro.png',
            'assets/aclr.png', // Mock variation
            'assets/promatemobile.png' // Mock variation
          ],
          activeImageIndex: 0,
          price: 12 + i * 5,
          originalPrice: 20 + i * 10,
          discount: 40,
          rating: 4.5,
          reviews: 125,
          cashOnDelivery: true,
          tabby: true,
          tamara: true,
          isWishlisted: false
        });
      }
    });
  }
}
