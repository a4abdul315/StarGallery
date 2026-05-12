import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, Carousel } from 'primeng/carousel';

interface BrandBanner {
  id: number;
  name: string;
  tagline: string;
  logoUrl: string;
  bannerBg: string;
  mobileImageUrl?: string;
}

interface Product {
  id: number;
  brandId: number;
  name: string;
  image: string;
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

@Component({
  selector: 'app-brand-showcase',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './brand-showcase.component.html',
  styleUrls: ['./brand-showcase.component.css']
})
export class BrandShowcaseComponent implements OnInit {
  @ViewChild('productCarousel') productCarousel!: Carousel;

  banners: BrandBanner[] = [
    {
      id: 1,
      name: 'PROMATE',
      tagline: 'Innovation and Excellence',
      logoUrl: 'https://promate.net/cdn/shop/files/logo_black_180x.png?v=1613715103',
      bannerBg: 'url("assets/aclr.png") center/cover no-repeat',
      mobileImageUrl: 'assets/promatemobile.png'
    },
    {
      id: 2,
      name: 'SAMSUNG',
      tagline: 'Experience the Future',
      logoUrl: 'https://promate.net/cdn/shop/files/logo_black_180x.png?v=1613715103',
      bannerBg: 'url("assets/aclr.png") center/cover no-repeat',
      mobileImageUrl: 'assets/promatemobile.png'
    },
    {
      id: 3,
      name: 'APPLE',
      tagline: 'Think Different',
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

  constructor() {
    this.generateMockProducts();
  }

  ngOnInit(): void {
    this.filterProducts(1);
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

  private generateMockProducts(): void {
    const brands = [1, 2, 3];
    let id = 1;
    brands.forEach(brandId => {
      for (let i = 1; i <= 8; i++) {
        this.allProducts.push({
          id: id++,
          brandId,
          name: brandId === 1 ? 'Promate MagTag-15W MagSafe' : `Premium Gadget ${id}`,
          image: 'assets/16pro.png',
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
