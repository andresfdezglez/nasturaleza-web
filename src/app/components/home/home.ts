import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AfterViewInit, Component, ElementRef, inject, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  private router = inject(Router)
  @ViewChild('seccionSobreMi') seccion!: ElementRef;
  @ViewChild('carouselTrack', { static: false }) carouselTrack?: ElementRef<HTMLElement>;

  // Signal para activar la animación
  isVisible = signal(false);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    // Solo ejecutamos si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {

      const opciones = {
        root: null, // relativo al viewport (pantalla)
        rootMargin: '0px',
        threshold: 0.05 // Se activa cuando el 20% de la sección asoma
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Log para depuración: Abre la consola (F12) para ver esto
          console.log('¿Sección visible?:', entry.isIntersecting);

          if (entry.isIntersecting) {
            this.isVisible.set(true); // Cambiamos el signal a true

            // Una vez animado, dejamos de observar para ahorrar recursos
            observer.unobserve(this.seccion.nativeElement);
          }
        });
      }, opciones);

      if (this.seccion) {
        observer.observe(this.seccion.nativeElement);
      }
    }
  }

  actividades = [
    {
      titulo: 'Avistamiento Oso Pardo',
      descripcion: 'Observación en libertad del plantígrado más emblemático de la Cordillera Cantábrica.',
      imagen: 'assets/images/DSC06499.JPG'
    },
    {
      titulo: 'Rutas del Lobo Ibérico',
      descripcion: 'Descubrimiento de rastros e indicios de presencia del gran depredador.',
      imagen: 'assets/images/DSC08315.JPG'
    },
    {
      titulo: 'Fotografía de Naturaleza',
      descripcion: 'Salidas técnicas para capturar especies autóctonas en su hábitat natural.',
      imagen: 'assets/images/DSC06499.JPG'
    }
  ];

  // Inyectamos el servicio (estilo Angular 21)
  private breakpointObserver = inject(BreakpointObserver);

  // Usamos un Signal para que la plantilla @if sea reactiva y rápida
  isMobile = signal<boolean>(false);
  listaReviews = signal<any[]>([]);

  constructor(private supabaseService: DatabaseService) { }

  ngOnInit(): void {
    // Escuchamos el cambio de tamaño de pantalla
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        // Actualizamos el valor del Signal
        this.isMobile.set(result.matches);
      });

    this.loadReviews();
  }

  toActivities() {
    this.router.navigate(['/activities'])
  }

  async loadReviews() {
    try {
      const data = await this.supabaseService.getTopReviews();
      // Forzamos la asignación en el hilo principal
      this.listaReviews.set(data);
    } catch (error) {
      console.error("Error cargando reviews:", error);
    }
  }

scroll(direction: 'left' | 'right') {
  console.log("HOLA");
  
  // Si por lo que sea no detecta el track, salimos de la función sin error
  if (!this.carouselTrack || !this.carouselTrack.nativeElement) {
    console.warn("El track aún no está disponible");
    return;
  }

  const track = this.carouselTrack.nativeElement;
  const scrollAmount = track.offsetWidth * 0.8;

  track.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
}
}