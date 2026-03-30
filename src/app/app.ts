import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, NgOptimizedImage, Footer, RouterModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nasturaleza');

  private router = inject(Router);
  
  // La intro empieza visible siempre al cargar/recargar
  isIntroVisible = signal(true);
  // Controla el inicio de la animación de salida
  fadeOutStarted = signal(false);

  ngOnInit() {
    // 1. Tiempo que el logo se queda quieto (2 segundos)
    setTimeout(() => {
      this.fadeOutStarted.set(true);
      
      // 2. Tiempo que dura el desvanecimiento (1 segundo)
      setTimeout(() => {
        this.isIntroVisible.set(false);
      }, 1000);

    }, 1500);
  }

  toActivities(){
    this.router.navigate(['/activities'])
  }

  toActivitiesTab(nameTab: string){

    this.router.navigate(['/activities'],
      {queryParams:{tab : nameTab}}
    )
  }
}
