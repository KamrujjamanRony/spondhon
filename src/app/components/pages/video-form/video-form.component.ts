import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-form',
  imports: [FormsModule],
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css'
})
export class VideoFormComponent {
  NewsService = inject(NewsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: any = null;
  model = signal<any>({
    title: '',
    content: '',
    category: 'videos',
    videoUrl: ''
  });
  // categories = ["sports", "education", "social", "entertainment", "politics", "health"]
  paramsSubscription?: Subscription;
  newsSubscription?: Subscription;
  error = signal<any>(null);
  success = signal<any>(null);
  loading = signal<boolean>(false);

  constructor() {
    this.onReset();
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log(this.id)
        if (this.id) {
          this.NewsService.getNewsById(this.id)
            .subscribe({
              next: (response: any) => {
                console.log(response)
                if (response) {
                  this.model.set(response);
                }
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {
    this.loading.set(true);
    const { title, content, category, videoUrl } = this.model();
    if (title && content && category && videoUrl) {

      if (this.id) {
        this.newsSubscription = this.NewsService.updateNews(this.id, this.model())
          .subscribe({
            next: (response) => {
              this.success.set('Video Update successfully');
              this.onReset();
              this.id = null;
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
                this.router.navigate(['admin/video-list']);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Update Video:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      } else {
        this.newsSubscription = this.NewsService.addNews(this.model())
          .subscribe({
            next: (response) => {
              this.success.set('Video Add successfully');
              this.onReset();
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
                this.router.navigate(['admin/video-list']);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Add Video:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      }
    } else {
      this.error.set('All Fields are required!');
      setTimeout(() => {
        this.error.set(null);
        this.loading.set(false);
      }, 1500);
    }
  };

  onReset() {
    this.model.set({
      title: '',
      content: '',
      category: 'videos',
      videoUrl: ''
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.newsSubscription?.unsubscribe();
  }

}
