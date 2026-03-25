import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { App } from '../../app';
import { BackgroundService } from '../../services/background-service';
// Definimos la estructura para evitar errores de tipos
interface Precio {
  option: string;
  duration: string;
  cost: string;
}

interface Animal {
  id: string;
  name: string;
  title: string;
  video: string;
  poster: string;
  desc: string;
  precios: Precio[];
}

interface Seccion {
  id: string;
  titulo: string;
  imagenes: string[]; // Array de 6 fotos
  descripcion: string;
  precios: any[];
}

@Component({
  selector: 'app-servicios-fauna',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, MatRippleModule, MatTableModule],
  templateUrl: './activities.html',
  styleUrls: ['./activities.css']
})
export class Activities implements OnInit, OnDestroy{

  // Inyectamos el padre para poder cambiar su señal
  private appRoot = inject(App);

  private bgService = inject(BackgroundService);

  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  scroll(direction: 'left' | 'right') {
    const track = this.carouselTrack.nativeElement;
    // Calculamos el desplazamiento: el ancho visible del track
    // Multiplicamos por 0.8 para que no mueva la foto entera y se vea la siguiente
    const scrollAmount = track.offsetWidth * 0.8; 
    
    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth' // Movimiento fluido de Angular
    });
  }

  ngOnInit() {
    // Al entrar: Fondo verde, sin imagen
    this.bgService.updateBackground('', true);
  }

  ngOnDestroy() {
    // Al salir: Volvemos a la foto original de Nasturaleza
    this.bgService.updateBackground('assets/images/1765627550958.webp', false);
  }

  // Definimos las columnas que se verán en la tabla
  displayedColumns: string[] = ['opcion', 'duracion', 'precio'];


readonly rutas: Seccion = {
  id: 'rutas-montaña',
  titulo: 'Senderismo Interpretativo',
  imagenes: [
    'assets/images/rutas/ruta1.webp', 'assets/images/rutas/ruta2.webp', 'assets/images/rutas/ruta3.webp',
    'assets/images/rutas/ruta4.webp', 'assets/images/rutas/ruta5.webp'
  ],
  descripcion: `Descubre Asturias a pie a través de rutas de senderismo interpretativo diseñadas para conectar con la naturaleza de una forma cercana, didáctica y enriquecedora. A lo largo del recorrido, exploraremos la diversidad del paisaje asturiano mientras interpretamos su geología, su flora y la fauna que habita estos entornos privilegiados.
Cada paso se convierte en una oportunidad para aprender: identificaremos especies, entenderemos las dinámicas del ecosistema y descubriremos las historias que esconde el territorio. Todo ello acompañado por un guía titulado que, además, es maestro de educación primaria, lo que aporta un enfoque pedagógico único, adaptado especialmente a familias y niños.
Gracias a esta experiencia, los más pequeños no solo disfrutan del entorno, sino que aprenden de forma activa y divertida, despertando su curiosidad y fomentando el respeto por la naturaleza desde edades tempranas.
Ponemos un especial énfasis en la educación ambiental como base para la conservación, promoviendo valores de respeto, sostenibilidad y conexión con el medio natural.
Una actividad perfecta para disfrutar en familia, aprender juntos y vivir la naturaleza de una manera diferente.
`,
  precios: [
    { opcion: 'Ruta Familiar', duracion: '3h', precio: '25€' },
    { opcion: 'Ascensión Cumbre', duracion: '7h', precio: '55€' }
  ]
};

readonly fotografia: Seccion = {
  id: 'foto-natura',
  titulo: 'Fotografía de Naturaleza',
  imagenes: [
    'assets/images/foto1.jpeg', 'assets/images/foto2.jpg', 'assets/images/foto3.jpg',
    'assets/images/foto4.jpg', 'assets/images/foto5.JPG', 'assets/images/foto6.jpg'
  ],
  descripcion: `Descubre Asturias a través del objetivo en una experiencia de fotografía de naturaleza diseñada para inspirar y aprender en pleno entorno natural. Durante la actividad, recorreremos distintos paisajes en busca de la mejor luz y de escenas únicas, combinando la observación de fauna y flora con la captura de rincones de gran belleza.

    Exploraremos diferentes hábitats donde podremos encontrar una amplia diversidad de especies, siempre desde el respeto y la observación responsable. Cada salida se adapta a la época del año, aprovechando los cambios del paisaje, la luz y el comportamiento de la fauna para ofrecer oportunidades fotográficas únicas en cada estación.

    El guía, con experiencia en el medio natural, te acompañará durante toda la jornada ofreciendo asesoramiento personalizado y consejos prácticos sobre técnicas de fotografía: composición, uso de la luz, configuración de cámara y cómo desenvolverse en el entorno sin alterar la naturaleza.

    Además, la actividad pone especial énfasis en la adaptación al medio natural, fomentando una fotografía ética y consciente, donde el respeto por el entorno y sus habitantes es siempre la prioridad.
Una experiencia perfecta tanto para iniciarse como para mejorar en la fotografía de naturaleza, combinando aprendizaje, creatividad y conexión con el paisaje asturiano.

`,
  precios: [
    { opcion: 'Taller Básico', duracion: '4h', precio: '40€' },
    { opcion: 'Escondite (Hide)', duracion: '8h', precio: '90€' }
  ]
};
  
  // 1. LISTA COMPLETA DE DATOS (FAUNA)
  readonly fauna: Animal[] = [
    {
      id: 'oso',
      name: 'Oso Pardo',
      title: 'Avistamiento de Oso Pardo Cantábrico',
      video: 'assets/videos/oso.mov',
      poster: 'assets/images/1765627550958.webp',
      desc: `Descubre la magia del bosque y adéntrate en el fascinante mundo del oso pardo con nuestra experiencia de avistamiento responsable. Durante esta actividad realizaremos esperas en puntos estratégicos del hábitat natural de la especie, siempre desde la máxima discreción y respeto, con el objetivo de intentar observar a este emblemático animal en libertad.

A lo largo de la jornada, nuestros guías especializados te acercarán a la etología del oso pardo: conoceremos sus hábitos, comportamiento, alimentación y su papel clave en el equilibrio del ecosistema. Esta interpretación del entorno nos permitirá comprender mejor la importancia de su conservación y el delicado equilibrio en el que vive.

La actividad pone un énfasis especial en la educación ambiental como herramienta fundamental para la protección de la biodiversidad. Creemos que solo a través del conocimiento y el respeto podemos fomentar una convivencia sostenible entre las personas y la fauna salvaje.

Una experiencia única que combina emoción, aprendizaje y compromiso con la naturaleza.`,
      precios: [
        { option: 'Salida Individual (Mañana)', duration: '4h', cost: '60€' },
        { option: 'Salida Individual (Tarde)', duration: '4h', cost: '60€' },
        { option: 'Jornada Completa', duration: '9h', cost: '110€' },
        { option: 'Pack Pareja (2 pax)', duration: '4h', cost: '110€' }
      ]
    },
    {
      id: 'lobo',
      name: 'Lobo Ibérico',
      title: 'Tras la huella del Lobo Ibérico',
      video: 'assets/videos/lobos.mov',
      poster: 'assets/images/1765627550958.webp',
      desc: `Sumérgete en el territorio del lobo ibérico y vive una experiencia única de observación en plena naturaleza. A través de esperas cuidadosamente planificadas en enclaves estratégicos, trataremos de detectar la presencia de uno de los depredadores más emblemáticos de la península, siempre desde el respeto y sin interferir en su comportamiento natural.

Durante la actividad, nuestro guía te introducirá en la etología del lobo ibérico, desvelando aspectos clave de su conducta, organización social, técnicas de caza y su papel esencial como regulador de los ecosistemas. Comprender su biología y su relación con el entorno nos permitirá derribar mitos y valorar su verdadera importancia en la naturaleza.

Esta experiencia pone especial énfasis en la educación ambiental como base para la conservación de la especie. A través del conocimiento, buscamos fomentar una mirada más consciente y respetuosa hacia la fauna salvaje, promoviendo su protección y la convivencia con el medio rural.

Una actividad emocionante y enriquecedora que te conectará con la esencia más salvaje del paisaje.`,
      precios: [
        { option: 'Espera Alba/Ocaso', duration: '5h', cost: '70€' },
        { option: 'Ruta de Rastreo', duration: '4h', cost: '45€' },
        { option: 'Experiencia Lobera (2 días)', duration: '12h', cost: '180€' }
      ]
    },
    {
      id: 'berrea',
      name: 'Berrea',
      title: 'La Berrea del Ciervo en el Paraíso',
      video: 'assets/video/berrea-ciervo.mp4',
      poster: 'assets/images/1765627550958.webp',
      desc: `Vive uno de los espectáculos naturales más sobrecogedores del otoño: la berrea del ciervo en los paisajes salvajes de Asturias. Durante esta experiencia nos adentraremos en su hábitat al amanecer o al atardecer, realizando esperas en puntos estratégicos para escuchar y, con suerte, observar a los grandes machos en pleno periodo de celo.

A lo largo de la actividad, nuestro guía interpretará este fascinante comportamiento, explicando la etología del ciervo durante la berrea: sus potentes bramidos, las disputas entre machos, la formación de harenes y la importancia de este momento clave en su ciclo vital.

Además, profundizaremos en el papel del ciervo dentro del ecosistema y en la riqueza natural de Asturias, destacando la importancia de la educación ambiental como herramienta fundamental para la conservación de la fauna y sus hábitats. Entender estos procesos naturales nos ayuda a valorar y respetar el equilibrio del entorno.

Una experiencia sensorial única, donde sonido, paisaje y emoción se combinan para acercarte a la naturaleza en estado puro.`,
      precios: [
        { option: 'Ruta Berrea Estándar', duration: '3h', cost: '35€' },
        { option: 'Salida Fotográfica Especial', duration: '5h', cost: '65€' },
        { option: 'Pack Familiar (2 adultos + 2 niños)', duration: '3h', cost: '100€' }
      ]
    }
  ];

  // 2. SIGNALS (ANGULAR 21)
  // Iniciamos con el Oso por defecto
  selectedFauna = signal<Animal>(this.fauna[0]);

  // 3. MÉTODOS
  selectAnimal(animal: Animal) {
    this.selectedFauna.set(animal);
  }
}