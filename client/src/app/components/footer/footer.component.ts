import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { Subject, takeUntil } from 'rxjs';
import { TranslationService, Language } from '../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  lang: Language = 'en';

  electronicsLinks = ['mobileAccessories','tabletsAccessories','computerAccessories','tvMonitors','speakersMicrophones','weightScales'];
  homeKitchenLinks = ['kitchenAppliances','homeAppliances','lights','coffeeTea','toolsEquipment','bathroomFixtures'];
  carLinks         = ['jumpStarters','carVideoReceivers','airCompressors','carElectricKettles','carMobileHolders','carCleaningKits'];

  bottomLinks = ['contactUs','socialMediaInfluencers','privacyPolicy','termsConditions','returnsRefunds','serviceWarranty','bulkQuotation'];

  socialLinks = [
    { icon: 'snapchat', color: '#FFFC00', label: 'Snapchat' },
    { icon: 'youtube',  color: '#FF0000', label: 'YouTube' },
    { icon: 'instagram',color: '#E1306C', label: 'Instagram' },
    { icon: 'facebook', color: '#1877F2', label: 'Facebook' },
    { icon: 'twitter',  color: '#000000', label: 'X (Twitter)' },
  ];

  constructor(public tr: TranslationService) {}

  ngOnInit(): void {
    this.tr.lang$.pipe(takeUntil(this.destroy$)).subscribe(l => this.lang = l);
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
