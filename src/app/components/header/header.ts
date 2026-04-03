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
    this.isVisible.set(false); 
    this.esAnimacionRapida.set(true); 
const video = this.document.querySelector('video');
  if (video) {
    video.play().catch(error => {
      console.log("Instagram bloqueó el autoplay, reintentando...");
      
      video.muted = true;
      video.play();
    });
}

    setTimeout(() => this.isVisible.set(true), 10);
  }
}
