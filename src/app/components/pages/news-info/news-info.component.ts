import { Component, inject, signal } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-info',
  imports: [],
  templateUrl: './news-info.component.html',
  styleUrl: './news-info.component.css'
})
export class NewsInfoComponent {
  private newsService = inject(NewsService);
  route = inject(ActivatedRoute);
  id: any = null;
  selectedNews = signal<any>(null);
  paramsSubscription?: Subscription;

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log(this.id)
        if (this.id) {
          this.newsService.getNewsById(this.id)
            .subscribe({
              next: (response: any) => {
                console.log(response)
                if (response) {
                  this.selectedNews.set(response);
                }
              }
            });
        }
      }
    });
  }


  transform(value: any, args: any = 'dd/MM/yyyy'): any {
    if (!value) return null;
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, args);
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}
