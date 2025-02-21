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
  categories = ["sports", "education", "social", "entertainment", "videos"];
  latestNews = signal<any[]>([]);
  sportsNews = signal<any[]>([]);
  educationNews = signal<any[]>([]);
  socialNews = signal<any[]>([]);
  entertainmentNews = signal<any[]>([]);
  videosNews = signal<any[]>([]);

  ngOnInit() {
    this.newsService.getAllNews().subscribe(data => {
      this.latestNews.set(data?.filter((news: any) => (news.imageUrl && !news.videoUrl))?.slice(0, 6));
    });
    this.newsService.getNews("sports").subscribe(data => {
      this.sportsNews.set(data?.filter((news: any) => (news.imageUrl && !news.videoUrl))?.slice(0, 6));
    });
    this.newsService.getNews("education").subscribe(data => {
      this.educationNews.set(data?.filter((news: any) => (news.imageUrl && !news.videoUrl))?.slice(0, 6));
    });
    this.newsService.getNews("social").subscribe(data => {
      this.socialNews.set(data?.filter((news: any) => (news.imageUrl && !news.videoUrl))?.slice(0, 6));
    });
    this.newsService.getNews("entertainment").subscribe(data => {
      this.entertainmentNews.set(data?.filter((news: any) => (news.imageUrl && !news.videoUrl))?.slice(0, 6));
    });
    this.newsService.getNews("videos").subscribe(data => {
      this.videosNews.set(data?.filter((news: any) => (!news.imageUrl && news.videoUrl))?.slice(0, 6));
    });
  }

}
