import { Component, inject, signal } from '@angular/core';
import { CoverComponent } from '../../shared/cover/cover.component';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-video-list',
  imports: [CoverComponent, RouterLink],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent {
  private NewsService = inject(NewsService);

  filterNews = signal<any>([]);
  selectedRole: any = '';
  emptyImg: any = '';
  toast = signal<any>("");
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.onLoadData();
  }
  onLoadData(): void {
    this.loading.set(true);
    this.NewsService.getNews("videos").subscribe(data => {
      this.filterNews.set(data);
      this.loading.set(false);
    });
  }
  onDelete(id: any) {
    if (confirm("Are you sure you want to delete?")) {
      this.NewsService.deleteNews(id).subscribe({
        next: (data) => {
          this.toast.set(data.message);
          this.onLoadData();
          setTimeout(() => {
            this.toast.set("");
          }, 2000);
        },
        error: (error) => {
          console.error("Error deleting News:", error);
          this.toast.set("Error deleting News: " + (error.error?.message || "Unknown error"));
          setTimeout(() => {
            this.toast.set("");
          }, 2000);
        }
      });
    }
  }


  transform(value: any, args: any = 'dd/MM/yyyy'): any {
    if (!value) return null;
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, args);
  }

}
