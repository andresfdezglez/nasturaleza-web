import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AfterViewInit, Component, DOCUMENT, ElementRef, Inject, inject, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Header } from '../header/header';
import { ButtonGroup } from '../button-group/button-group';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import reviewsData from '../../../assets/data/reviews.json';
import questionsData from '../../../assets/data/questions.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    Header,
    ButtonGroup,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit {

  @ViewChild('seccionSobreMi') seccion!: ElementRef;
  @ViewChild('carouselTrackReviews', { static: false }) carouselTrackReviews?: ElementRef<HTMLElement>;
  @ViewChild('carouselTrackQuestions', { static: false }) carouselTrackQuestions?: ElementRef<HTMLElement>;
  isVisible = signal(false);
  private platformId = inject(PLATFORM_ID);
  private breakpointObserver = inject(BreakpointObserver);
  private API_KEY = "AIzaSyDhkKtfe6q6MXkryI7XTk3DUK3xnPF1wUg"
  private PLACE_ID = "ChIJi3sI3koiKmERNByJdNvODUg"

  isMobile = signal<boolean>(false);
  listaReviews = signal<any[]>([]);
  listaQuestions = signal<any[]>(questionsData);

  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private document: Document) {

  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

          if (entry.isIntersecting) {
            this.isVisible.set(true); 
            observer.unobserve(this.seccion.nativeElement);
          }
        });
      }, options);

      if (this.seccion) {
        observer.observe(this.seccion.nativeElement);
      }
    }
  }

  async ngOnInit(): Promise<void> {
    this.title.setTitle("N'asturaleza")
    this.meta.updateTag({
      name: 'description',
      content: 'Experiencias de turismo activo en Asturias: Observación de fauna, rutas interpretativas y fotografía de naturaleza en Asturias. ¿Te animas?'
    })

    this.breakpointObserver.observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
    this.putCanonical('https://www.nasturalezaexperiencias.es/');
    await this.loadLocalReviews();
  }

  putCanonical(url: string) {
    let link: HTMLLinkElement = this.document.querySelector("link[rel='canonical']") || this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    if (!this.document.head.contains(link)) {
      this.document.head.appendChild(link);
    }
  }


  scrollReviews(direction: 'left' | 'right') {
    if (!this.carouselTrackReviews || !this.carouselTrackReviews.nativeElement) {
      return;
    }

    const track = this.carouselTrackReviews.nativeElement;
    const scrollAmount = track.offsetWidth * 0.8;

    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

    scrollQuestions(direction: 'left' | 'right') {
    if (!this.carouselTrackQuestions || !this.carouselTrackQuestions.nativeElement) {
      return;
    }

    const track = this.carouselTrackQuestions.nativeElement;
    const scrollAmount = track.offsetWidth * 0.8;

    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  async loadLocalReviews() {
    this.listaReviews.set(reviewsData);
  }
}