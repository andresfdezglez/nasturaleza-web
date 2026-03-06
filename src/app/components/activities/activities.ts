import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject, PLATFORM_ID, ChangeDetectorRef, model, HostListener } from '@angular/core';


// Importar el DatePipe
import { DatePipe } from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';

/** @title Datepicker inline calendar example */
@Component({
  selector: 'activities',
  templateUrl: 'activities.html',
  styleUrls: ['activities.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, CommonModule, MatNativeDateModule, MatInputModule, MatButtonModule], // Asegúrate de que el módulo esté importado
})
export class Activities {    
  isCalendarOpen: boolean = false;  // Para controlar si el calendario está abierto
  selected = model<Date | null>(null);
  isBrowser: boolean;
  selectedEvents: string[] = [];
  isSmallScreen: boolean = false;   // Variable para detectar pantallas pequeñas

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdRef: ChangeDetectorRef) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Verificamos si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.updateScreenSize();
    }
  }

  // Detecta el tamaño de la pantalla y actualiza la variable isSmallScreen
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateScreenSize();
  }

  // Función para actualizar el estado del tamaño de la pantalla
  updateScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768; // Consideramos pantallas pequeñas si son menos de 768px
  }

  // Al seleccionar una fecha, cierra el calendario en pantallas pequeñas
  onDateSelected(date: Date) {
    this.selected.set(date);
    if (this.isSmallScreen) {
      this.isCalendarOpen = false;  // Cierra el calendario en pantallas pequeñas
    }
  }

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;  // Alterna la apertura del calendario
  }
  
}
