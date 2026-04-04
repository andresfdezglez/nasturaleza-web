import { Component, inject, input, signal, Inject, ViewChild, ElementRef, OnInit, AfterViewChecked, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnimationService } from '../../services/animation-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  srcVideoMobile = input<string>()
  srcVideoDesktop = input<string>()
  srcImagen = input<string>()
  title = input.required<string>()
  claseAnimacion = input.required<string>()
  isVideo = input<boolean>(true);
  poster = input<string>()
  private animService = inject(AnimationService);
  @ViewChild('videoElem', { static: false }) videoRef!: ElementRef<HTMLVideoElement>;

  constructor() { }

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
    setTimeout(() => {
      this.isVisible.set(true), 10
    });
  }
}
