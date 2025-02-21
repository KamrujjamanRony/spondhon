import { Component, inject, signal } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NewsContainerComponent } from "../../shared/news-container/news-container.component";

@Component({
  selector: 'app-all-news',
  imports: [NewsContainerComponent],
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.css'
})
export class AllNewsComponent {
  private newsService = inject(NewsService);
  route = inject(ActivatedRoute);
  category: any = null;
  filterNews = signal<any[]>([]);
  paramsSubscription?: Subscription;

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.category = params.get('category');
        console.log(this.category)
        if (this.category) {
          this.newsService.getNews(this.category)
            .subscribe({
              next: (response: any) => {
                console.log(response)
                if (response) {
                  this.filterNews.set(response);
                }
              }
            });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}
