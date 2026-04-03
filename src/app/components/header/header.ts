import { Component, inject, input, signal , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
    poster = input<string>()
    private animService = inject(AnimationService);

constructor(@Inject(DOCUMENT) private document: Document) {}

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
const video = this.document.querySelector('video');
  if (video) {
    video.play().catch(error => {
      console.log("Instagram bloqueó el autoplay, reintentando...");
      // Intentamos mutearlo de nuevo por si acaso
      video.muted = true;
      video.play();
    });
}

    setTimeout(() => this.isVisible.set(true), 10);
  }
}
