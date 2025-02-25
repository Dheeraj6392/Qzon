import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchResult: string = '';
  username: string = '';
  menuType: string = 'default';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {  // ✅ Ensure it's running in the browser
      const sellerStore = localStorage.getItem('user');
      if (sellerStore) {
        try {
          const sellerData = JSON.parse(sellerStore)[0];
          this.username = sellerData.name;
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      } else {
        console.warn("User data not found in localStorage");
        this.menuType = 'default';
      }
    }
  }

  searchProduct(event: any) { }

  submitSearch(data: any) { }

  redirectToDetails(id: any) { }

  hideSearch() { }

  toggleMenu() { }

  logout() {
    if (isPlatformBrowser(this.platformId)) {  // ✅ Check before accessing localStorage
      localStorage.removeItem('user');
      this.router.navigate(['login']);  // ✅ Redirect to login or home after logout
    } else {
      console.warn("localStorage is not available in SSR.");
    }
  }
}
