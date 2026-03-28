import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Reemplaza con tus credenciales de Settings > API en Supabase
    this.supabase = createClient(
      'https://bexuilpvmkobpwmnjxbh.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJleHVpbHB2bWtvYnB3bW5qeGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MzA3NzMsImV4cCI6MjA4OTAwNjc3M30.f4Ip9ZY1EucxptXD8bIycnrlgF4CqmNJHwbg_Ui2tDI'
    );
  }

  // Obtener todas las reviews (ordenadas por fecha)
  async getReviews() {
    const { data, error } = await this.supabase
      .from('reviews')
      .select('*')
      .order('created_date', { ascending: false });
    return data || [];
  }

  // Insertar una nueva reseña
  async addReview(name: string, rating: number, comment: string) {
    const { data, error } = await this.supabase
      .from('reviews')
      .insert([{ name, rating, comment }]);
    return { data, error };
  }

  async getTopReviews() {
    const { data, error } = await this.supabase
      .from('reviews')
      .select('*')
      // Primero ordenamos por puntuación (5 estrellas arriba)
      .order('rating', { ascending: false })
      // Segundo ordenamos por fecha (más recientes primero)
      .order('created_date', { ascending: false })
      // Limitamos el resultado a 3
      .limit(5);

    if (error) {
      console.error('Error obteniendo top reviews:', error);
      return [];
    }
    return data || [];
  }
}
