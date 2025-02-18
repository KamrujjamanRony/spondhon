import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { InputsComponent } from '../../shared/inputs/inputs.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [InputsComponent, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  private adminService = inject(AdminService);
  private authService = inject(AuthService);
  router = inject(Router);
  model: any;
  error: any;
  success: any;

  constructor() {
    this.model = {
      username: '',
      password: ''
    };
  }

  ngOnInit() { }

  onFormSubmit() {
    const {
      username,
      password
    } = this.model;
    if (username && password) {
      this.adminService.loginAdmin({ username, password })
        .subscribe({
          next: (response: any) => {
            console.log(response)
            if (response) {
              this.authService.setAdminInfo(response);
              this.success = 'Admin login successfully';
              setTimeout(() => {
                this.router.navigateByUrl('admin/news');
                this.success = null;
              }, 1500);
            } else {
              this.error = 'Please Fill username and password correctly';
              setTimeout(() => {
                this.error = null;
              }, 3000);
            }

          },
          error: (error) => {
            console.error('Error login:', error);
          }
        });
    } else {
      this.error = 'Please Fill username and password field';
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }

}
