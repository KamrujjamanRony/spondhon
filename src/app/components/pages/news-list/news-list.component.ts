import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { CoverComponent } from "../../shared/cover/cover.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news-list',
  imports: [CoverComponent, RouterLink],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent {
  private NewsService = inject(NewsService);

  filterNews = signal<any>([]);
  selectedRole: any = '';
  toast = signal<any>("");
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.onLoadData();
  }
  onLoadData(): void {
    this.loading.set(true);
    this.NewsService.getAllNews().subscribe(data => {
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
