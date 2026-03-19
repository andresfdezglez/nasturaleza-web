import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Component, inject, OnInit, signal } from '@angular/core';
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
export class Home {

  private router = inject(Router)

  actividades = [
    {
      titulo: 'Avistamiento Oso Pardo',
      descripcion: 'Observación en libertad del plantígrado más emblemático de la Cordillera Cantábrica.',
      imagen: 'assets/images/DSC06499.JPG' // Asegúrate de tener estas fotos en /public/assets/
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

  dataSource = [
    { actividad: 'Avistamiento Oso', adulto: '50€', ninos: '25€', grupos: 'Consultar' },
    { actividad: 'Rutas Lobo', adulto: '70€', ninos: 'Consultar', grupos: 'Consultar' },
    { actividad: 'Berrea', adulto: '40€', ninos: '80€', grupos: 'Consultar' },
    { actividad: 'Salida Fotográfica', adulto: '60€', ninos: 'Consultar', grupos: 'Consultar' },
    { actividad: 'Ruta Interpret.', adulto: '35€', ninos: 'Consultar', grupos: 'Consultar' }
  ];

  displayedColumns: string[] = ['actividad', 'adulto', 'ninos', 'grupos'];

  // Inyectamos el servicio (estilo Angular 21)
  private breakpointObserver = inject(BreakpointObserver);

  // Usamos un Signal para que la plantilla @if sea reactiva y rápida
  isMobile = signal<boolean>(false);
  listaReviews = signal<any[]>([]);

  constructor(private supabaseService: DatabaseService){}

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
}