import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'activities/avistamiento', renderMode: RenderMode.Prerender },
  { path: 'activities/rutas', renderMode: RenderMode.Prerender },
  { path: 'activities/fotografia', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender }
];
