import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  adminService = inject(AdminService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: any = null;
  username = signal<any>("");
  password = signal<any>("");
  role = signal<any>("");
  roles = [
    { value: 'editor', label: 'Editor' },
    { value: 'admin', label: 'Admin' },
  ]
  paramsSubscription?: Subscription;
  adminSubscription?: Subscription;
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
          this.adminService.getAdmin(this.id)
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
        this.adminSubscription = this.adminService.updateAdmin(this.id, submitData)
          .subscribe({
            next: (response) => {
              this.success.set('Admin Update successfully');
              this.onReset();
              this.id = null;
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
                this.router.navigate(['admin/user-list']);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Update Admin:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      } else {
        this.adminSubscription = this.adminService.registerAdmin(submitData)
          .subscribe({
            next: (response) => {
              this.success.set('Admin Add successfully');
              this.onReset();
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
                this.router.navigate(['admin/user-list']);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Add Admin:', error.error);
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
    this.adminSubscription?.unsubscribe();
  }

}
