import { Component, inject, signal } from '@angular/core';
import { CoverComponent } from "../../shared/cover/cover.component";
import { AdminService } from '../../../services/admin.service';
import { DataService } from '../../../services/data.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CoverComponent, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private adminService = inject(AdminService);

  filterAdmins = signal<any>([]);
  selectedRole: any = '';
  toast = signal<any>("");
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.onLoadData();
  }
  onLoadData(): void {
    this.loading.set(true);
    this.adminService.getAllAdmins().subscribe(data => {
      this.filterAdmins.set(data);
      this.loading.set(false);
    });
  }
  onDelete(id: any) {
    if (confirm("Are you sure you want to delete?")) {
      this.adminService.deleteAdmin(id).subscribe({
        next: (data) => {
          this.toast.set(data.message);
          this.onLoadData();
          setTimeout(() => {
            this.toast.set("");
          }, 2000);
        },
        error: (error) => {
          console.error("Error deleting Admin:", error);
          this.toast.set("Error deleting Admin: " + (error.error?.message || "Unknown error"));
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
