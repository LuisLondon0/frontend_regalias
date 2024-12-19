import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

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
  selectedProjectId: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.userName = this.authService.getUserNameFromToken() ?? '';
      }
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectProjectIdFromUrl();
      });

    this.detectProjectIdFromUrl();
  }

  private detectProjectIdFromUrl(): void {
    const url = this.router.url;
    const match = url.match(/\/project-detail\/(\d+)/);

    if (match && match[1]) {
      this.selectedProjectId = +match[1];
      this.projectSelected = true;
    } else {
      this.selectedProjectId = null;
      this.projectSelected = false;
    }
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

    if (this.isSidebarOpen && sidebar && !sidebar.contains(event.target as Node) && !hamburger?.contains(event.target as Node)) {
      this.isSidebarOpen = false;
    }
  }
}
