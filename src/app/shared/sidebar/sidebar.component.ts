import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ProjectService } from '../../core/project/project.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean = false;
  projectSelected: boolean = false;
  userName: string = '';
  isSidebarOpen: boolean = false;
  isMobile: boolean = false;

  constructor(private authService: AuthService, private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.userName = this.authService.getUserNameFromToken() ?? '';
      }
    });

    // this.projectService.selectedProject$.subscribe(selected => {
    //   this.projectSelected = selected;
    // });

    this.checkScreenSize();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');

    if (this.isSidebarOpen && this.isMobile && sidebar && !sidebar.contains(event.target as Node) && !hamburger?.contains(event.target as Node)) {
      this.isSidebarOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth > 768) {
      this.isSidebarOpen = true;
      this.isMobile = false;
    } else {
      this.isSidebarOpen = false;
      this.isMobile = true;
    }
  }
}
