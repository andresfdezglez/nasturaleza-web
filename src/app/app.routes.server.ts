import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'activities/avistamiento', renderMode: RenderMode.Prerender },
  {
    path: 'activities/avistamiento/:animal',
    renderMode: RenderMode.Prerender,
    // Esta es la función que te pide el error:
    async getPrerenderParams() {
      // Aquí defines los parámetros que sustituirán a ':animal'
      return [
        { animal: 'oso' },
        { animal: 'lobo' },
        { animal: 'berrea' }
      ];
    }
  },
  { path: 'activities/rutas', renderMode: RenderMode.Prerender },
  { path: 'activities/fotografia', renderMode: RenderMode.Prerender },
  { path: 'aviso-legal', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender }
];
