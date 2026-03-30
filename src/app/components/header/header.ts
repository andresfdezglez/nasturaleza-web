import { Component, inject, input, signal } from '@angular/core';
import { AnimationService } from '../../services/animation-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    srcVideo = input.required<string>()
    title = input.required<string>()
    claseAnimacion = input.required<string>()
    isVideo = input<boolean>(true);

    private animService = inject(AnimationService);

  // Signal para la animación extra
  extraAnim = signal(false);

  isVisible = signal(true); // Controla si el h1 existe en el DOM
  esAnimacionRapida = signal(false)

  ngOnInit() {
    this.animService.trigger$.subscribe(() => {
      this.reiniciarTodo();
  });
  }

  reiniciarTodo() {
    this.isVisible.set(false); // 1. Borramos el h1 del mapa
    this.esAnimacionRapida.set(true); // 2. Preparamos la clase sin delay
    setTimeout(() => this.isVisible.set(true), 10);
     
  }
}
