import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrandShowcaseComponent } from './components/brand-showcase/brand-showcase.component';

import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CategorySliderComponent,
    FooterComponent,
    BrandShowcaseComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public tr: TranslationService) {}
}
