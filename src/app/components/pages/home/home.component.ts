import { Component, inject, signal } from '@angular/core';
import { CarouselComponent } from "../../shared/carousel/carousel.component";
import { NewsContainerComponent } from "../../shared/news-container/news-container.component";
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, NewsContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private newsService = inject(NewsService);
  sportsNews = signal<any[]>([]);

  ngOnInit() {
    this.newsService.getNews("rrerere").subscribe(data => {
      this.sportsNews.set(data);
      console.log(data)
    });
  }

}
