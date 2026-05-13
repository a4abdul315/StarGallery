import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  getCategories(): Category[] {
    return [
      { id: 1, name: 'Electronics', nameAr: 'الإلكترونيات', icon: 'pi-bolt', color: '#EFF6FF', image: 'https://picsum.photos/seed/elec/80/80' },
      { id: 2, name: 'Car Accessories', nameAr: 'إكسسوارات السيارات', icon: 'pi-car', color: '#FFF7ED', image: 'https://picsum.photos/seed/car/80/80' },
      { id: 3, name: 'Home & Kitchen', nameAr: 'المنزل والمطبخ', icon: 'pi-home', color: '#F0FDF4', image: 'https://picsum.photos/seed/home/80/80' },
      { id: 4, name: 'Smart Watches', nameAr: 'الساعات الذكية', icon: 'pi-clock', color: '#FDF4FF', image: 'https://picsum.photos/seed/watch/80/80' },
      { id: 5, name: 'For Kids', nameAr: 'للأطفال', icon: 'pi-heart', color: '#FFF1F2', image: 'https://picsum.photos/seed/kids/80/80' },
      { id: 6, name: 'Personal Care', nameAr: 'العناية الشخصية', icon: 'pi-user', color: '#FFF7ED', image: 'https://picsum.photos/seed/care/80/80' },
      { id: 7, name: 'Health Care', nameAr: 'الرعاية الصحية', icon: 'pi-heart-fill', color: '#FFF1F2', image: 'https://picsum.photos/seed/health/80/80' },
      { id: 8, name: 'Fashion', nameAr: 'الأزياء', icon: 'pi-tag', color: '#F5F3FF', image: 'https://picsum.photos/seed/fashion/80/80' },
      { id: 9, name: 'Sports', nameAr: 'الرياضة', icon: 'pi-star', color: '#F0FDF4', image: 'https://picsum.photos/seed/sport/80/80' },
      { id: 10, name: 'Computers', nameAr: 'الحاسوب', icon: 'pi-desktop', color: '#EFF6FF', image: 'https://picsum.photos/seed/comp/80/80' },
      { id: 11, name: 'Tablets', nameAr: 'الأجهزة اللوحية', icon: 'pi-tablet', color: '#FDF4FF', image: 'https://picsum.photos/seed/tablet/80/80' },
      { id: 12, name: 'TV & Monitors', nameAr: 'التلفاز', icon: 'pi-video', color: '#ECFDF5', image: 'https://picsum.photos/seed/tv/80/80' },
    ];
  }
}
