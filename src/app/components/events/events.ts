import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-events',
  imports: [MatCardModule, CommonModule, MatButtonModule],
  standalone: true,
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  items = [
    {
      title: 'Actividad 1',
      date: '10 Enero 2025',
      description: 'Descripción breve de la actividad.',
      image: '/images/fondo.jpg'
    },
    {
      title: 'Actividad 2',
      date: '15 Enero 2025',
      description: 'Otra descripción breve.',
      image: '/images/fondo.jpg'
    },
    {
      title: 'Actividad 3',
      date: '20 Enero 2025',
      description: 'Más información sobre esta actividad.'
      
    }
  ];
}
