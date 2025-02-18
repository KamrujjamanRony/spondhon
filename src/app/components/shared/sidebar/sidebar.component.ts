import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterLink]
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  aboutId!: any;
  role!: any;
  ngOnInit(): void {
    this.role = this.authService.getAdminInfo()?.admin?.role;
  }

  // Method to handle logout
  logout() {
    this.authService.deleteAdminInfo();
  }

}
