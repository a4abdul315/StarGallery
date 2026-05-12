import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { Subject, takeUntil } from 'rxjs';
import { TranslationService, Language } from '../../core/services/translation.service';
import { ProductsService } from '../../core/services/products.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  lang: Language = 'en';
  categories: Category[] = [];

  desktopResponsive = [
    { breakpoint: '1280px', numVisible: 9, numScroll: 3 },
    { breakpoint: '1024px', numVisible: 7, numScroll: 3 },
    { breakpoint: '768px', numVisible: 5, numScroll: 2 },
    { breakpoint: '480px', numVisible: 4, numScroll: 2 },
  ];

  constructor(
    public tr: TranslationService,
    private productsSvc: ProductsService
  ) { }

  ngOnInit(): void {
    this.categories = this.productsSvc.getCategories();
    this.tr.lang$.pipe(takeUntil(this.destroy$)).subscribe(l => this.lang = l);
  }

  getCategoryName(cat: Category): string {
    return this.lang === 'ar' ? cat.nameAr : cat.name;
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
