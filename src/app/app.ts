import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { BackgroundService } from './services/background-service';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, FormsModule, MatDatepickerModule,
    MatInputModule, MatCardModule, MatNativeDateModule, NgOptimizedImage
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nasturaleza');
  
  // Inyectamos el servicio
  bgService = inject(BackgroundService);
  
  // Creamos un acceso directo a la configuración
  config = this.bgService.backgroundConfig;

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
}
