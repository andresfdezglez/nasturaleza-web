import { Component, OnInit, signal } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseService } from '../../services/database';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.css']
})
export class Reviews implements OnInit {
  listaReviews = signal<any[]>([]);
  
  // Objeto para el formulario
  newReview = {
    name: '',
    rating: 0,
    comment: ''
  };

  constructor(private supabaseService: DatabaseService, private snackBar: MatSnackBar) {}

  ngOnInit() {
      this.loadReviews();
  }

  async loadReviews() {
  try {
    const data = await this.supabaseService.getReviews();
    // Forzamos la asignación en el hilo principal
    this.listaReviews.set(data); 
  } catch (error) {
    console.error("Error cargando reviews:", error);
  }
}

  async save() {
  // 1. Validaciones previas
  if (!this.newReview.name || !this.newReview.comment) {
    alert('Por favor, rellena todos los campos');
    return;
  }
  if (this.newReview.rating === 0) {
    alert('Por favor, indica una puntuación');
    return;
  }

  // 2. CREAMOS UNA COPIA de los datos antes de limpiar el formulario
  const reviewParaEnviar = { ...this.newReview };

  // 3. ACTUALIZACIÓN VISUAL INMEDIATA (Sin esperar a la DB)
  const reviewVisual = {
    ...reviewParaEnviar,
    id: Date.now(), // ID temporal
    created_date: new Date().toISOString()
  };
  
  // Añadimos al principio de la lista para que el usuario la vea ya
  this.listaReviews.update(current => [
    { ...reviewParaEnviar, id: Date.now(), created_date: new Date().toISOString() },
    ...current
  ]);

  // 4. LIMPIEZA Y MENSAJE (Instantáneo)
  this.newReview = { name: '', rating: 0, comment: '' };
  this.snackBar.open('¡Reseña enviada! Muchas gracias', 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  });

  // 5. ENVÍO A SUPABASE (En segundo plano)
  try {
    await this.supabaseService.addReview(
      reviewParaEnviar.name,
      reviewParaEnviar.rating,
      reviewParaEnviar.comment
    );
    // Opcional: recargar para traer el ID real de la DB
    // this.loadReviews(); 
  } catch (e) {
    console.error("Error al guardar:", e);
  }
}

  setRating(rating: number) {
    this.newReview.rating = rating;
  }
}