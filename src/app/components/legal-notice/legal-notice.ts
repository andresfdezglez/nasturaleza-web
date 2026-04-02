import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-legal-notice',
  imports: [],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.css',
})
export class LegalNotice implements OnInit{

    private platformId = inject(PLATFORM_ID);
    
    ngOnInit(): void {
      this.scrollToTop();
    }

    private scrollToTop() {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
        const mainContent = document.querySelector('.mat-sidenav-content');
        if (mainContent) mainContent.scrollTop = 0;
      }
    }

}
