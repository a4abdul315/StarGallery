import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslationService, Language } from '../../core/services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  lang: Language = 'en';
  isRtl = false;
  mobileMenuOpen = false;

  navLinks: string[] = ['electronics','homeKitchen','carAccessories','season','buyAgain','browsingHistory'];

  constructor(public tr: TranslationService) {}

  ngOnInit(): void {
    this.tr.lang$.pipe(takeUntil(this.destroy$)).subscribe(l => {
      this.lang = l;
      this.isRtl = l === 'ar';
    });
  }

  toggleLang(): void { this.tr.toggle(); }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
