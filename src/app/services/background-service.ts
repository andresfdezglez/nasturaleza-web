import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  // Guardamos la configuración del fondo: imagen y si debe ser verde
  backgroundConfig = signal({
    image: 'assets/images/1765627550958.webp',
    isGreen: true
  });

  // Método para cambiar el fondo
  updateBackground(image: string, isGreen: boolean = false) {
    this.backgroundConfig.set({ image, isGreen });
  }
}
