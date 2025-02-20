import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news-form',
  imports: [FormsModule],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.css'
})
export class NewsFormComponent {
  NewsService = inject(NewsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: any = null;
  username = signal<any>("");
  password = signal<any>("");
  role = signal<any>("");
  roles = [
    { value: 'editor', label: 'Editor' },
    { value: 'News', label: 'News' },
  ]
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
          this.NewsService.getNews(this.id)
            .subscribe({
              next: (response: any) => {
                if (response) {
                  this.username.set(response.username);
                  this.role.set(response.role);
                }
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {
    this.loading.set(true);
    if (this.username() && this.password() && this.role()) {
      const submitData = {
        "username": this.username(),
        "password": this.password(),
        "role": this.role()
      }

      if (this.id) {
        this.newsSubscription = this.NewsService.updateNews(this.id, submitData)
          .subscribe({
            next: (response) => {
              this.success.set('News Update successfully');
              this.onReset();
              this.id = null;
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
                this.router.navigate(['News/user-list']);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Update News:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      } else {
        this.newsSubscription = this.NewsService.addNews(submitData)
          .subscribe({
            next: (response) => {
              this.success.set('News Add successfully');
              this.onReset();
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
                this.router.navigate(['News/user-list']);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Add News:', error.error);
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
    this.username.set("");
    this.password.set("");
    this.role.set("");
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.newsSubscription?.unsubscribe();
  }

}
