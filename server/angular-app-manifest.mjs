
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/nasturaleza-web/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/nasturaleza-web"
  },
  {
    "renderMode": 2,
    "route": "/nasturaleza-web/events"
  },
  {
    "renderMode": 2,
    "route": "/nasturaleza-web/contact"
  },
  {
    "renderMode": 2,
    "route": "/nasturaleza-web/activities"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24620, hash: '880c498b39eb1aeee66a73484166960942eaf4bdb837a297c85a58a9f8973434', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17073, hash: 'f83d7cc2adf74346f1663667a78f48e7ad1a99aabb2758f969b234f10d4a188a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'activities/index.html': {size: 231, hash: '95b0549451393558480f08f8e0970214c70e476b9c95b697c15c37fa7d6b6dc0', text: () => import('./assets-chunks/activities_index_html.mjs').then(m => m.default)},
    'events/index.html': {size: 231, hash: '95b0549451393558480f08f8e0970214c70e476b9c95b697c15c37fa7d6b6dc0', text: () => import('./assets-chunks/events_index_html.mjs').then(m => m.default)},
    'index.html': {size: 231, hash: '95b0549451393558480f08f8e0970214c70e476b9c95b697c15c37fa7d6b6dc0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 231, hash: '95b0549451393558480f08f8e0970214c70e476b9c95b697c15c37fa7d6b6dc0', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-IZTCVFYF.css': {size: 8229, hash: 'hypgTiiRg6c', text: () => import('./assets-chunks/styles-IZTCVFYF_css.mjs').then(m => m.default)}
  },
};
